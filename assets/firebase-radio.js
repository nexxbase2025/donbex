import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import {
  getFirestore, doc, setDoc, getDoc, onSnapshot, serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
import {
  getStorage, ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";

const firebaseConfig = {
  "apiKey": "AIzaSyCYx9YQ5tz5QWSedBEGplE2j6T8vk54LrQ",
  "authDomain": "donbex-radio-app.firebaseapp.com",
  "projectId": "donbex-radio-app",
  "storageBucket": "donbex-radio-app.firebasestorage.app",
  "messagingSenderId": "1001447941178",
  "appId": "1:1001447941178:web:cef82e65d46cd4727b4103"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

function safeExt(file){
  const name=(file?.name||"file").toLowerCase();
  const ext=name.includes(".")?name.split(".").pop().replace(/[^a-z0-9]/g,""):"bin";
  return ext.slice(0,8)||"bin";
}

async function uploadIfPresent(pathBase,file,{publicUrl=false}={}){
  if(!file)return {path:null,url:null};
  const fullPath=`${pathBase}.${safeExt(file)}`;
  const fileRef=ref(storage,fullPath);
  await uploadBytes(fileRef,file,{contentType:file.type||"application/octet-stream"});
  let url=null;
  if(publicUrl){
    url=await getDownloadURL(fileRef);
  }
  return {path:fullPath,url};
}

function calcEditExpiry(plan){
  if(!plan)return null;
  const d=new Date();
  if(plan==="monthly")d.setMonth(d.getMonth()+1);
  if(plan==="six")d.setMonth(d.getMonth()+6);
  if(plan==="year")d.setFullYear(d.getFullYear()+1);
  return d.toISOString();
}

window.addEventListener("donbex:submit-order",async e=>{
  const {order,receiptFile,logoFile}=e.detail;
  try{
    const base=`requests/${order.trackingToken}`;
    const [receiptUpload,logoUpload]=await Promise.all([
      uploadIfPresent(`${base}/receipt`,receiptFile,{publicUrl:false}),
      uploadIfPresent(`${base}/logo`,logoFile,{publicUrl:true})
    ]);

    const payload={
      ...order,
      receiptPath:receiptUpload.path,
      receiptUrl:null,
      logoPath:logoUpload.path,
      logoUrl:logoUpload.url,
      editActive:false,
      editExpiresAt:null,
      createdAt:serverTimestamp(),
      updatedAt:serverTimestamp()
    };

    await setDoc(doc(db,"radioRequests",order.trackingToken),payload);

    // Keep the same post-payment screen synchronized with Admin approval.
    if(window.__DONBEX_CURRENT_REQUEST_UNSUB){
      try{window.__DONBEX_CURRENT_REQUEST_UNSUB();}catch{}
    }
    window.__DONBEX_CURRENT_REQUEST_UNSUB=onSnapshot(
      doc(db,"radioRequests",order.trackingToken),
      async snap=>{
        if(!snap.exists())return;
        const data=snap.data();

        let liveOrder={
          ...order,
          ...data,
          trackingToken:order.trackingToken,
          trackingUrl:`https://radio.donbex.com/order/${order.trackingToken}`
        };

        if(liveOrder.status==="approved" && liveOrder.slug){
          try{
            const radioSnap=await getDoc(doc(db,"radios",liveOrder.slug));
            if(radioSnap.exists()){
              const live=radioSnap.data();
              liveOrder={
                ...liveOrder,
                publicUrl:`https://radio.donbex.com/${liveOrder.slug}`,
                logoUrl:live.logoUrl||liveOrder.logoUrl||null,
                radio:{...(liveOrder.radio||{}),...live}
              };
            }
          }catch(err){
            console.warn("Approval live radio merge skipped",err);
          }
        }

        window.dispatchEvent(
          new CustomEvent("donbex:tracking-loaded",{detail:{order:liveOrder}})
        );
      },
      err=>console.error("Current request listener error",err)
    );

    window.dispatchEvent(new CustomEvent("donbex:order-saved",{detail:{order:{...order,receiptPath:receiptUpload.path,logoPath:logoUpload.path,logoUrl:logoUpload.url}}}));
  }catch(err){
    console.error("Firebase submit error",err);
    window.dispatchEvent(new CustomEvent("donbex:order-error",{detail:{message:err?.message||String(err)}}));
  }
});


// ===== V26.4 PAYPAL PREPARATION (NO ADMIN-PENDING REQUEST) =====
// Uploads customer assets needed for a PayPal purchase without creating a
// radioRequests document. The actual radio request is written server-side
// only after PayPal confirms/captures the payment.
window.addEventListener("donbex:prepare-paypal-order",async e=>{
  const {order,logoFile}=e.detail||{};
  try{
    if(!order?.trackingToken)throw new Error("Solicitud de pago inválida");
    const base=`requests/${order.trackingToken}`;
    const logoUpload=await uploadIfPresent(`${base}/logo`,logoFile,{publicUrl:true});
    const prepared={...order,logoPath:logoUpload.path,logoUrl:logoUpload.url};
    window.dispatchEvent(new CustomEvent("donbex:paypal-order-prepared",{detail:{order:prepared}}));
  }catch(err){
    console.error("PayPal preparation error",err);
    window.dispatchEvent(new CustomEvent("donbex:paypal-order-prepare-error",{detail:{message:err?.message||String(err)}}));
  }
});

function tokenFromPath(){
  const m=location.pathname.match(/^\/order\/([^/?#]+)/);
  return m?decodeURIComponent(m[1]):null;
}

const trackingToken=tokenFromPath();

// Exposed helper for the future admin panel.
// The admin panel will call equivalent protected logic after authentication.
window.DONBEX_FIREBASE_HELPERS={
  calcEditExpiry
};


function publicSlugFromPath(){
  const path=location.pathname.replace(/^\/+|\/+$/g,"");
  if(!path || path.startsWith("order/") || path.startsWith("edit/") || path==="index.html") return null;
  return decodeURIComponent(path.split("/")[0]);
}

const publicSlug=publicSlugFromPath();
if(publicSlug){
  const publicRef=doc(db,"radios",publicSlug);
  // Keep an open public Radio App synchronized with owner edits (logo/name/template/stream).
  // This is read-only and does not touch checkout, payments or approval logic.
  onSnapshot(publicRef,snap=>{
    if(!snap.exists()){
      window.dispatchEvent(new CustomEvent("donbex:public-radio-missing"));
      return;
    }
    const data=snap.data();
    if(data.status!=="active"){
      window.dispatchEvent(new CustomEvent("donbex:public-radio-missing"));
      return;
    }
    window.dispatchEvent(new CustomEvent("donbex:public-radio-loaded",{detail:{radio:{slug:publicSlug,...data}}}));
  },err=>{
    console.error("Public radio live sync error",err);
  });
}

// ===== V16 PRIVATE EDIT ACCESS + EDITION REQUESTS =====
function editTokenFromPath(){
  const m=location.pathname.match(/^\/edit\/([^/?#]+)/);
  return m?decodeURIComponent(m[1]):null;
}
const privateEditToken=editTokenFromPath();
if(privateEditToken){
  getDoc(doc(db,"radioEdits",privateEditToken)).then(snap=>{
    if(!snap.exists()){
      window.dispatchEvent(new CustomEvent("donbex:edit-access-missing"));
      return;
    }
    window.dispatchEvent(new CustomEvent("donbex:edit-access-loaded",{detail:{access:{editToken:privateEditToken,...snap.data()}}}));
  }).catch(err=>console.error("Edit access load error",err));
}

window.DONBEX_CREATE_EDITION_REQUEST=async function({radio,customer,plan,price,method,receiptFile}){
  const token=(crypto.randomUUID?crypto.randomUUID():Math.random().toString(36).slice(2)+Date.now());
  const receipt=await uploadIfPresent(`requests/${token}/receipt`,receiptFile,{publicUrl:false});
  const payload={
    id:"EDT-"+Date.now(),
    requestType:"edition",
    trackingToken:token,
    trackingUrl:`https://radio.donbex.com/order/${token}`,
    stationName:radio.stationName||"Radio Online",
    slug:radio.slug,
    publicUrl:`https://radio.donbex.com/${radio.slug}`,
    privateEditUrl:radio.privateEditUrl||null,
    editToken:radio.editToken||null,
    customer:customer||{},
    payment:{method,basePrice:0,editPlan:plan,editPrice:Number(price)||0,status:"pending"},
    status:"pending_approval",
    receiptPath:receipt.path,
    receiptUrl:null,
    createdAt:serverTimestamp(),
    updatedAt:serverTimestamp()
  };
  await setDoc(doc(db,"radioRequests",token),payload);
  return payload;
};


// ===== V19 TRACKING EDIT STATE SYNC =====
async function enrichOrderWithEditAccess(order){
  if(!order?.editToken)return order;
  try{
    const editSnap=await getDoc(doc(db,"radioEdits",order.editToken));
    if(editSnap.exists()){
      const edit=editSnap.data();
      order.editActive=!!edit.editActive;
      order.editExpiresAt=edit.editExpiresAt||order.editExpiresAt||null;
      order.editPlan=edit.editPlan||order.payment?.editPlan||null;
    }
  }catch(err){console.warn("Edit access sync failed",err)}
  return order;
}

// Replace the tracking listener dispatch with synchronized edition state.
if(trackingToken){
  const requestRef=doc(db,"radioRequests",trackingToken);

  onSnapshot(requestRef,async snap=>{
    if(!snap.exists())return;
    const data=snap.data();
    let order={
      ...data,
      trackingToken,
      trackingUrl:`https://radio.donbex.com/order/${trackingToken}`
    };

    order=await enrichOrderWithEditAccess(order);

    if(order.slug){
      try{
        const radioSnap=await getDoc(doc(db,"radios",order.slug));
        if(radioSnap.exists()){
          const live=radioSnap.data();
          order.radio={
            ...(order.radio||{}),
            template:live.template||order.radio?.template||"orbit",
            streamUrl:live.streamUrl||order.radio?.streamUrl||"",
            instagram:live.instagram||order.radio?.instagram||"",
            facebook:live.facebook||order.radio?.facebook||"",
            tiktok:live.tiktok||order.radio?.tiktok||""
          };
          order.logoUrl=live.logoUrl||order.logoUrl||null;
        }
      }catch{}
    }

    window.dispatchEvent(new CustomEvent("donbex:tracking-loaded",{detail:{order}}));
  },err=>console.error("Tracking listener error",err));
}

// Current radio config for private edit route.
window.addEventListener("donbex:load-edit-radio",async e=>{
  const {slug}=e.detail;
  try{
    const snap=await getDoc(doc(db,"radios",slug));
    if(!snap.exists())return;
    window.dispatchEvent(new CustomEvent("donbex:edit-radio-loaded",{detail:{radio:{slug,...snap.data()}}}));
  }catch(err){console.error("Edit radio load error",err)}
});


// ===== V19 EDIT CHANGE REQUEST =====
window.addEventListener("donbex:save-edit-radio",async e=>{
  const data=e.detail;
  try{
    const token=(crypto.randomUUID?crypto.randomUUID():Math.random().toString(36).slice(2)+Date.now());
    let logoUrl=data.currentLogoUrl||null;
    let logoPath=null;
    if(data.logoFile){
      const upload=await uploadIfPresent(`requests/${token}/logo`,data.logoFile,{publicUrl:true});
      logoUrl=upload.url;
      logoPath=upload.path;
    }

    const payload={
      id:"CHG-"+Date.now(),
      requestType:"edit_change",
      trackingToken:token,
      trackingUrl:`https://radio.donbex.com/order/${token}`,
      stationName:data.stationName||"Radio Online",
      slug:data.slug,
      publicUrl:`https://radio.donbex.com/${data.slug}`,
      payment:{method:"included",basePrice:0,editPlan:null,editPrice:0,status:"pending"},
      radio:{
        template:data.template||"orbit",
        streamUrl:data.streamUrl||"",
        instagram:data.instagram||"",
        facebook:data.facebook||"",
        tiktok:data.tiktok||""
      },
      logoUrl,
      logoPath,
      status:"pending_approval",
      createdAt:serverTimestamp(),
      updatedAt:serverTimestamp()
    };

    await setDoc(doc(db,"radioRequests",token),payload);
    window.dispatchEvent(new CustomEvent("donbex:edit-radio-saved",{detail:{trackingUrl:payload.trackingUrl}}));
  }catch(err){
    console.error(err);
    alert("No se pudieron guardar los cambios.");
  }
});


// ===== V22 DIRECT IN-PLACE EDIT SAVE =====
window.addEventListener("donbex:save-edit-radio",async e=>{
  e.stopImmediatePropagation();
  const data=e.detail||{};
  try{
    const editToken=(location.pathname.match(/^\/edit\/([^/]+)/)||[])[1];
    if(!editToken)throw new Error("Missing edit token");

    let logoUrl=data.currentLogoUrl||null;
    if(data.logoFile){
      const token=crypto.randomUUID?crypto.randomUUID():Math.random().toString(36).slice(2)+Date.now();
      const upload=await uploadIfPresent(`requests/${token}/logo`,data.logoFile,{publicUrl:true});
      logoUrl=upload.url;
    }

    const r=await fetch("/api/radio-edit",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        editToken,
        changes:{
          stationName:data.stationName,
          streamUrl:data.streamUrl,
          instagram:data.instagram,
          facebook:data.facebook,
          tiktok:data.tiktok,
          template:data.template,
          logoUrl
        }
      })
    });
    const result=await r.json();
    if(!r.ok)throw new Error(result.error||"Edit failed");

    window.dispatchEvent(new CustomEvent("donbex:edit-radio-updated",{detail:result}));
  }catch(err){
    console.error(err);
    window.dispatchEvent(new CustomEvent("donbex:edit-radio-update-error",{detail:{error:err}}));
  }
},true);


// ===== V23 INLINE EDIT SAVE =====
window.addEventListener("donbex:inline-edit-save",async e=>{
  const {editToken,currentLogoUrl,logoFile,changes}=e.detail||{};
  try{
    let logoUrl=currentLogoUrl||null;

    if(logoFile){
      const token=crypto.randomUUID?crypto.randomUUID():Math.random().toString(36).slice(2)+Date.now();
      const upload=await uploadIfPresent(`requests/${token}/logo`,logoFile,{publicUrl:true});
      logoUrl=upload.url;
    }

    const r=await fetch("/api/radio-edit",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        editToken,
        changes:{...changes,logoUrl}
      })
    });

    const result=await r.json();
    if(!r.ok)throw new Error(result.error||"Edit failed");

    window.dispatchEvent(new CustomEvent("donbex:inline-edit-saved",{
      detail:{...result,...changes,logoUrl}
    }));
  }catch(err){
    console.error(err);
    window.dispatchEvent(new CustomEvent("donbex:inline-edit-error",{detail:{error:err}}));
  }
});
