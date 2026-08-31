import admin from "firebase-admin";
export function getAdmin(){
  const projectId=process.env.RADIO_FIREBASE_PROJECT_ID;
  const clientEmail=process.env.RADIO_FIREBASE_CLIENT_EMAIL;
  const privateKey=(process.env.RADIO_FIREBASE_PRIVATE_KEY||"").replace(/^["']|["']$/g,"").replace(/\\n/g,"\n");
  if(!projectId||!clientEmail||!privateKey)throw new Error("Missing RADIO Firebase env vars");
  const name="radio-paypal-app"; let app=admin.apps.find(a=>a.name===name);
  if(!app)app=admin.initializeApp({credential:admin.credential.cert({projectId,clientEmail,privateKey}),storageBucket:`${projectId}.firebasestorage.app`},name);
  return app;
}
export function expiry(plan){const d=new Date();if(plan==="monthly")d.setMonth(d.getMonth()+1);if(plan==="six")d.setMonth(d.getMonth()+6);if(plan==="year")d.setFullYear(d.getFullYear()+1);return plan?d:null}
export function totalFor(req){const p=req.payment||{};return Number((Number(p.basePrice||0)+Number(p.editPrice||0)).toFixed(2))}
export async function activateRequest(db,token,paypalOrderId){
  const ref=db.collection("radioRequests").doc(token); const snap=await ref.get(); if(!snap.exists)throw new Error("Request not found"); const o=snap.data();
  if(o.status==="approved")return o;
  const now=admin.firestore.FieldValue.serverTimestamp();
  if(o.requestType==="edition"){
    const exp=expiry(o.payment?.editPlan); if(!o.editToken)throw new Error("Missing edit token");
    await db.collection("radioEdits").doc(o.editToken).set({slug:o.slug,stationName:o.stationName||"Radio Online",editActive:true,editPlan:o.payment?.editPlan||null,editExpiresAt:exp?admin.firestore.Timestamp.fromDate(exp):null,updatedAt:now},{merge:true});
    await ref.set({status:"approved",payment:{...(o.payment||{}),status:"approved",paypalOrderId},approvedAt:now,updatedAt:now},{merge:true});
    return {...o,status:"approved"};
  }
  const radio={stationName:o.stationName||"Radio Online",template:o.radio?.template||"orbit",streamUrl:o.radio?.streamUrl||"",instagram:o.radio?.instagram||"",facebook:o.radio?.facebook||"",tiktok:o.radio?.tiktok||"",logoUrl:o.logoUrl||null,status:"active",updatedAt:now,createdAt:now};
  await db.collection("radios").doc(o.slug).set(radio,{merge:true});
  const exp=expiry(o.payment?.editPlan);
  if(o.editToken)await db.collection("radioEdits").doc(o.editToken).set({slug:o.slug,stationName:o.stationName||"Radio Online",editActive:!!o.payment?.editPlan,editPlan:o.payment?.editPlan||null,editExpiresAt:exp?admin.firestore.Timestamp.fromDate(exp):null,updatedAt:now,createdAt:now},{merge:true});
  await ref.set({status:"approved",payment:{...(o.payment||{}),status:"approved",paypalOrderId},editActive:!!o.payment?.editPlan,editExpiresAt:exp?exp.toISOString():null,approvedAt:now,updatedAt:now},{merge:true});
  return {...o,status:"approved"};
}


const PLAN_PRICES={monthly:5.99,six:24.99,year:39.99};
export function sanitizePaypalSession(raw){
  const token=String(raw?.trackingToken||"").trim();
  const slug=String(raw?.slug||"").trim().toLowerCase();
  const stationName=String(raw?.stationName||"").trim();
  if(!token||!slug||!stationName)throw new Error("Invalid purchase data");
  if(!/^[a-z0-9-]{1,100}$/.test(slug))throw new Error("Invalid radio slug");

  const editPlan=raw?.payment?.editPlan||raw?.checkoutEditPlan||null;
  if(editPlan && !(editPlan in PLAN_PRICES))throw new Error("Invalid edit plan");
  const editPrice=editPlan?PLAN_PRICES[editPlan]:0;

  const requestType=raw?.requestType==="edition"?"edition":"new_radio";
  if(requestType==="edition" && !raw?.editToken)throw new Error("Missing edit token");

  return {
    id:String(raw?.id||`RAD-${Date.now()}`),
    requestType,
    trackingToken:token,
    trackingUrl:`https://radio.donbex.com/order/${token}`,
    stationName:stationName.slice(0,120),
    slug,
    publicUrl:`https://radio.donbex.com/${slug}`,
    privateEditUrl:raw?.privateEditUrl||null,
    editToken:raw?.editToken||null,
    customer:{
      name:String(raw?.customer?.name||"").slice(0,120),
      email:String(raw?.customer?.email||"").slice(0,200),
      whatsapp:String(raw?.customer?.whatsapp||"").slice(0,50)
    },
    payment:{method:"paypal",basePrice:requestType==="edition"?0:11.99,editPlan,editPrice,status:"pending"},
    radio:{
      template:["orbit","glass","stage","pulse"].includes(raw?.radio?.template)?raw.radio.template:"orbit",
      streamUrl:String(raw?.radio?.streamUrl||"").slice(0,1000),
      instagram:String(raw?.radio?.instagram||"").slice(0,500),
      facebook:String(raw?.radio?.facebook||"").slice(0,500),
      tiktok:String(raw?.radio?.tiktok||"").slice(0,500)
    },
    logoPath:raw?.logoPath||null,
    logoUrl:raw?.logoUrl||null
  };
}

export async function activatePaidSession(db,o,paypalOrderId){
  const existing=await db.collection("radioRequests").doc(o.trackingToken).get();
  if(existing.exists && existing.data()?.status==="approved")return existing.data();

  const now=admin.firestore.FieldValue.serverTimestamp();
  const exp=expiry(o.payment?.editPlan);

  if(o.requestType==="edition"){
    if(!o.editToken)throw new Error("Missing edit token");
    await db.collection("radioEdits").doc(o.editToken).set({
      slug:o.slug,stationName:o.stationName||"Radio Online",editActive:true,
      editPlan:o.payment?.editPlan||null,
      editExpiresAt:exp?admin.firestore.Timestamp.fromDate(exp):null,
      updatedAt:now
    },{merge:true});
  }else{
    const radio={
      stationName:o.stationName||"Radio Online",
      template:o.radio?.template||"orbit",
      streamUrl:o.radio?.streamUrl||"",
      instagram:o.radio?.instagram||"",
      facebook:o.radio?.facebook||"",
      tiktok:o.radio?.tiktok||"",
      logoUrl:o.logoUrl||null,
      status:"active",updatedAt:now,createdAt:now
    };
    await db.collection("radios").doc(o.slug).set(radio,{merge:true});
    if(o.editToken)await db.collection("radioEdits").doc(o.editToken).set({
      slug:o.slug,stationName:o.stationName||"Radio Online",
      editActive:!!o.payment?.editPlan,
      editPlan:o.payment?.editPlan||null,
      editExpiresAt:exp?admin.firestore.Timestamp.fromDate(exp):null,
      updatedAt:now,createdAt:now
    },{merge:true});
  }

  const request={
    ...o,
    status:"approved",
    payment:{...(o.payment||{}),method:"paypal",status:"approved",paypalOrderId},
    editActive:o.requestType==="edition"?true:!!o.payment?.editPlan,
    editExpiresAt:exp?exp.toISOString():null,
    approvedAt:now,
    createdAt:now,
    updatedAt:now
  };
  await db.collection("radioRequests").doc(o.trackingToken).set(request,{merge:true});
  return request;
}
