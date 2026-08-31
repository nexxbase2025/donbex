const clean=(v,max=1800)=>String(v??"").replace(/[<>]/g,"").trim().slice(0,max);
const esc=(v)=>clean(v,7000).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const emailOk=(v)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v||""));
export default async function handler(req,res){
 if(req.method!=="POST")return res.status(405).json({ok:false,error:"method_not_allowed"});
 const apiKey=process.env.RESEND_API_KEY;
 if(!apiKey){console.error("DONBEX support: RESEND_API_KEY missing in this Vercel project");return res.status(503).json({ok:false,error:"email_not_configured"});}
 const b=req.body||{}; if(clean(b.company,120))return res.status(200).json({ok:true});
 const type=b.type==="project"?"project":"support"; const email=clean(b.email,180);
 if(!emailOk(email))return res.status(400).json({ok:false,error:"invalid_email"});
 let subject,html;
 if(type==="support"){
  const name=clean(b.name,120),phone=clean(b.phone,70),message=clean(b.message,4000);
  if(name.length<2||message.length<3)return res.status(400).json({ok:false,error:"missing_fields"});
  subject=`Consulta desde DONBEX — ${name}`;
  html=`<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#102033"><div style="padding:18px 20px;background:#071522;color:#fff;border-radius:14px 14px 0 0"><div style="color:#55dfff;font-size:12px;letter-spacing:2px;font-weight:700">DONBEX</div><h2 style="margin:7px 0 0">Nueva consulta de soporte</h2></div><div style="padding:22px;border:1px solid #dfe9f1;border-top:0;border-radius:0 0 14px 14px"><p><b>Nombre:</b> ${esc(name)}</p><p><b>Correo:</b> ${esc(email)}</p><p><b>Teléfono / WhatsApp:</b> ${esc(phone)||"—"}</p><div style="margin-top:18px;padding:16px;background:#f4f8fb;border-radius:12px;white-space:pre-wrap"><b>Consulta</b><br><br>${esc(message)}</div></div></div>`;
 }else{
  const first=clean(b.firstName,100),last=clean(b.lastName,100),business=clean(b.business,180),businessType=clean(b.businessType,180),category=clean(b.category,120),message=clean(b.message,6000);
  if(!first||!last||!business||!businessType||!category||message.length<3)return res.status(400).json({ok:false,error:"missing_fields"});
  subject=`Solicitud de proyecto DONBEX — ${business}`;
  html=`<div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;color:#102033"><div style="padding:18px 20px;background:#071522;color:#fff;border-radius:14px 14px 0 0"><div style="color:#55dfff;font-size:12px;letter-spacing:2px;font-weight:700">DONBEX</div><h2 style="margin:7px 0 0">Nueva solicitud de proyecto</h2></div><div style="padding:22px;border:1px solid #dfe9f1;border-top:0;border-radius:0 0 14px 14px"><p><b>Cliente:</b> ${esc(first)} ${esc(last)}</p><p><b>Negocio:</b> ${esc(business)}</p><p><b>Tipo:</b> ${esc(businessType)}</p><p><b>Necesidad:</b> ${esc(category)}</p><p><b>Correo:</b> ${esc(email)}</p><div style="margin-top:18px;padding:16px;background:#f4f8fb;border-radius:12px;white-space:pre-wrap"><b>Proyecto / idea</b><br><br>${esc(message)}</div></div></div>`;
 }
 const to="soporte@donbex.com";
 const from=process.env.SUPPORT_FROM_EMAIL||"DONBEX <radio@donbex.com>";
 try{
  const r=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json","User-Agent":"DONBEX-Web-Support/1.0"},body:JSON.stringify({from,to:[to],reply_to:email,subject,html})});
  const data=await r.json().catch(()=>({}));
  if(!r.ok){console.error("Resend DONBEX support error",r.status,data);return res.status(502).json({ok:false,error:"delivery_failed",provider_status:r.status,provider_message:data?.message||null});}
  return res.status(200).json({ok:true,id:data.id||null});
 }catch(e){console.error("DONBEX support connection error",e);return res.status(502).json({ok:false,error:"delivery_unavailable"});}
}
