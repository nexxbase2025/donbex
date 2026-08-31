import admin from "firebase-admin";

function getRadioAdmin(){
  const projectId=process.env.RADIO_FIREBASE_PROJECT_ID;
  const clientEmail=process.env.RADIO_FIREBASE_CLIENT_EMAIL;
  const privateKey=(process.env.RADIO_FIREBASE_PRIVATE_KEY||"").replace(/^["\']|["\']$/g,"").replace(/\\n/g,"\n");
  if(!projectId||!clientEmail||!privateKey)throw new Error("Missing RADIO Firebase env vars in Radio App Vercel project");

  const name="radio-edit-app";
  let app=admin.apps.find(a=>a.name===name);
  if(!app){
    app=admin.initializeApp({
      credential:admin.credential.cert({projectId,clientEmail,privateKey}),
      storageBucket:`${projectId}.firebasestorage.app`
    },name);
  }
  return app;
}

export default async function handler(req,res){
  if(req.method!=="POST")return res.status(405).json({error:"Method not allowed"});
  try{
    const {editToken,changes}=req.body||{};
    if(!editToken||!changes)return res.status(400).json({error:"Missing data"});

    const app=getRadioAdmin();
    const db=app.firestore();
    const accessSnap=await db.collection("radioEdits").doc(editToken).get();
    if(!accessSnap.exists)return res.status(404).json({error:"Edit access not found"});

    const access=accessSnap.data();
    let active=!!access.editActive;
    if(access.editExpiresAt){
      const exp=access.editExpiresAt.toDate ? access.editExpiresAt.toDate() : new Date(access.editExpiresAt);
      if(exp.getTime()<=Date.now())active=false;
    }
    if(!active)return res.status(403).json({error:"Edit access expired"});

    const slug=access.slug;
    if(!slug)return res.status(400).json({error:"Missing slug"});

    const allowed={
      stationName:String(changes.stationName||"").slice(0,100),
      streamUrl:String(changes.streamUrl||"").slice(0,1000),
      instagram:String(changes.instagram||"").slice(0,500),
      facebook:String(changes.facebook||"").slice(0,500),
      tiktok:String(changes.tiktok||"").slice(0,500),
      template:["orbit","glass","stage","pulse"].includes(changes.template)?changes.template:"orbit",
      updatedAt:admin.firestore.FieldValue.serverTimestamp()
    };
    if(changes.logoUrl)allowed.logoUrl=String(changes.logoUrl).slice(0,2000);

    await db.collection("radios").doc(slug).set(allowed,{merge:true});
    return res.status(200).json({ok:true,slug,publicUrl:`https://radio.donbex.com/${slug}`});
  }catch(err){
    console.error(err);
    return res.status(500).json({error:"Edit failed"});
  }
}