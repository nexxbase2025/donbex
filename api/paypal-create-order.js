import {paypalBase,paypalToken} from "./_paypal.js";
import {getAdmin,sanitizePaypalSession,totalFor} from "./_radio-admin.js";

export default async function handler(req,res){
  if(req.method!=="POST")return res.status(405).json({error:"Method not allowed"});
  try{
    const raw=req.body?.order;
    if(!raw || raw.payment?.method!=="paypal")return res.status(400).json({error:"Invalid PayPal order"});

    const order=sanitizePaypalSession(raw);
    const trackingToken=order.trackingToken;
    const amount=totalFor(order);
    if(amount<=0)return res.status(400).json({error:"Invalid amount"});

    const app=getAdmin();
    const db=app.firestore();
    const sessionRef=db.collection("paypalSessions").doc(trackingToken);
    const existing=await sessionRef.get();

    // Reuse only when the stored PayPal session still matches the customer's current selection.
    // If the customer changed/removed an editing plan before paying, create a fresh PayPal order
    // so the amount shown by PayPal always matches the checkout total.
    if(existing.exists && existing.data()?.paypalOrderId){
      const previous=existing.data();
      const previousAmount=totalFor(previous);
      const samePlan=(previous?.payment?.editPlan||null)===(order?.payment?.editPlan||null);
      if(Math.abs(previousAmount-amount)<.001 && samePlan){
        return res.status(200).json({id:previous.paypalOrderId,amount:amount.toFixed(2)});
      }
    }

    const access=await paypalToken();
    const paypalResponse=await fetch(`${paypalBase()}/v2/checkout/orders`,{
      method:"POST",
      headers:{
        Authorization:`Bearer ${access}`,
        "Content-Type":"application/json",
        "PayPal-Request-Id":`donbex-${trackingToken}`
      },
      body:JSON.stringify({
        intent:"CAPTURE",
        purchase_units:[{
          reference_id:trackingToken,
          custom_id:trackingToken,
          description:order.requestType==="edition"?"DONBEX Radio App — Edición":"DONBEX Radio App — Activación",
          amount:{currency_code:"USD",value:amount.toFixed(2)}
        }],
        application_context:{
          shipping_preference:"NO_SHIPPING",
          user_action:"PAY_NOW"
        }
      })
    });

    const paypalOrder=await paypalResponse.json();
    if(!paypalResponse.ok)throw new Error(paypalOrder.message||"PayPal create failed");

    await sessionRef.set({
      ...order,
      paypalOrderId:paypalOrder.id,
      paypalStatus:"CREATED",
      createdAt:new Date().toISOString(),
      updatedAt:new Date().toISOString()
    },{merge:true});

    return res.status(200).json({id:paypalOrder.id,amount:amount.toFixed(2)});
  }catch(e){
    console.error(e);
    return res.status(500).json({error:e.message||"PayPal error"});
  }
}
