import {paypalBase,paypalToken} from "./_paypal.js";
import {getAdmin,totalFor,activatePaidSession} from "./_radio-admin.js";
import {sendDonbexReceipt} from "./_receipt-email.js";

export default async function handler(req,res){
  if(req.method!=="POST")return res.status(405).json({error:"Method not allowed"});
  try{
    const token=String(req.body?.trackingToken||"");
    const orderId=String(req.body?.paypalOrderId||"");
    if(!token||!orderId)return res.status(400).json({error:"Missing data"});

    const app=getAdmin();
    const db=app.firestore();
    const sessionRef=db.collection("paypalSessions").doc(token);
    const snap=await sessionRef.get();
    if(!snap.exists)return res.status(404).json({error:"PayPal session not found"});
    const order=snap.data();
    if(order.paypalOrderId!==orderId)return res.status(400).json({error:"PayPal order mismatch"});

    const access=await paypalToken();
    const r=await fetch(`${paypalBase()}/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`,{
      method:"POST",
      headers:{
        Authorization:`Bearer ${access}`,
        "Content-Type":"application/json",
        "PayPal-Request-Id":`capture-${token}`
      }
    });
    const j=await r.json();
    if(!r.ok && j.name!=="ORDER_ALREADY_CAPTURED")throw new Error(j.message||"PayPal capture failed");

    let verified=j;
    if(j.name==="ORDER_ALREADY_CAPTURED"){
      const g=await fetch(`${paypalBase()}/v2/checkout/orders/${encodeURIComponent(orderId)}`,{headers:{Authorization:`Bearer ${access}`}});
      verified=await g.json();
    }

    const unit=verified.purchase_units?.[0];
    const captured=unit?.payments?.captures?.[0];
    const paid=Number(captured?.amount?.value||unit?.amount?.value||0);
    const expected=totalFor(order);
    if(verified.status!=="COMPLETED"||Math.abs(paid-expected)>.001){
      return res.status(400).json({error:"Payment not completed or amount mismatch"});
    }

    await activatePaidSession(db,order,orderId);
    let receiptEmail={ok:false,skipped:true};
    const latestSession=(await sessionRef.get()).data()||{};
    if(!latestSession.receiptEmailSent){
      try{
        let emailOrder=order;
        if(!order?.logoUrl && order?.slug){
          try{
            const radioSnap=await db.collection("radios").doc(order.slug).get();
            if(radioSnap.exists && radioSnap.data()?.logoUrl)emailOrder={...order,logoUrl:radioSnap.data().logoUrl};
          }catch(logoLookupError){console.warn("DONBEX receipt logo lookup skipped",logoLookupError?.message||logoLookupError)}
        }
        receiptEmail=await sendDonbexReceipt(emailOrder,{paypalOrderId:orderId,amount:paid});
      }catch(mailError){
        console.error("DONBEX receipt email error",mailError);
        receiptEmail={ok:false,error:mailError?.message||"email_failed"};
      }
    }
    await sessionRef.set({paypalStatus:"COMPLETED",capturedAt:new Date().toISOString(),updatedAt:new Date().toISOString(),...(receiptEmail.ok?{receiptEmailSent:true,receiptEmailSentAt:new Date().toISOString(),receiptEmailId:receiptEmail.id||null}:{})},{merge:true});

    return res.status(200).json({ok:true,status:"approved",trackingUrl:`https://radio.donbex.com/order/${token}`});
  }catch(e){
    console.error(e);
    return res.status(500).json({error:e.message||"PayPal error"});
  }
}
