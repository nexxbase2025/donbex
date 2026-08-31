const DESTINATION_DEFAULT="soporte@donbex.com";
const clean=(v,max=3000)=>String(v??"").replace(/[<>]/g,"").trim().slice(0,max);
const esc=(v,max=6000)=>clean(v,max).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const emailOk=(v)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v||""));
async function resend(apiKey,payload){const r=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json","User-Agent":"DONBEX-Web-Support/1.2"},body:JSON.stringify(payload)});const data=await r.json().catch(()=>({}));return {ok:r.ok,status:r.status,data}}
export default async function handler(req,res){
  if(req.method!=="POST")return res.status(405).json({ok:false,error:"method_not_allowed"});
  const apiKey=process.env.RESEND_API_KEY||process.env.RESEND_KEY;
  if(!apiKey){console.error("DONBEX support: RESEND_API_KEY missing");return res.status(503).json({ok:false,error:"email_not_configured"})}
  const b=req.body||{};if(clean(b.company,120))return res.status(200).json({ok:true});
  const type=b.type==="support"?"support":"project",email=clean(b.email,220);if(!emailOk(email))return res.status(400).json({ok:false,error:"invalid_email"});
  const to=DESTINATION_DEFAULT;
  const preferredFrom=process.env.SUPPORT_FROM_EMAIL||process.env.DONBEX_FROM_EMAIL||"DONBEX <radio@donbex.com>";
  const fallbackFrom="DONBEX <radio@donbex.com>";
  let subject="",html="";
  if(type==="support"){
    const name=clean(b.name,140),phone=clean(b.phone,80),message=clean(b.message,5000),language=clean(b.language,10),page=clean(b.page,500);if(name.length<2||message.length<3)return res.status(400).json({ok:false,error:"missing_fields"});
    subject=`DONBEX | Nueva consulta de soporte — ${name}`;
    html=`<div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;color:#102033"><div style="padding:20px 22px;background:#071522;color:#fff;border-radius:15px 15px 0 0"><div style="color:#55dfff;font-size:12px;letter-spacing:2px;font-weight:700">DONBEX</div><h2 style="margin:7px 0 0">Nueva consulta de soporte</h2></div><div style="padding:22px;border:1px solid #dfe9f1;border-top:0;border-radius:0 0 15px 15px"><p><b>Nombre:</b> ${esc(name)}</p><p><b>Correo:</b> ${esc(email)}</p><p><b>Teléfono / WhatsApp:</b> ${esc(phone)||"—"}</p><p><b>Idioma:</b> ${esc(language)||"es"}</p><div style="margin-top:18px;padding:16px;background:#f4f8fb;border-radius:12px;white-space:pre-wrap"><b>Consulta</b><br><br>${esc(message)}</div>${page?`<p style="margin-top:16px;font-size:11px;color:#8190a0">Página: ${esc(page)}</p>`:""}</div></div>`;
  }else{
    const first=clean(b.firstName,100),last=clean(b.lastName,100),business=clean(b.business,180),businessType=clean(b.businessType,180),category=clean(b.category,120),message=clean(b.message,7000),language=clean(b.language,10),page=clean(b.page,500);if(!first||!last||!business||!businessType||!category||message.length<3)return res.status(400).json({ok:false,error:"missing_fields"});
    subject=`DONBEX | Nueva solicitud de proyecto — ${business}`;
    html=`<div style="font-family:Arial,sans-serif;max-width:720px;margin:auto;color:#102033"><div style="padding:20px 22px;background:#071522;color:#fff;border-radius:15px 15px 0 0"><div style="color:#55dfff;font-size:12px;letter-spacing:2px;font-weight:700">DONBEX</div><h2 style="margin:7px 0 0">Nueva solicitud de proyecto</h2></div><div style="padding:22px;border:1px solid #dfe9f1;border-top:0;border-radius:0 0 15px 15px"><p><b>Cliente:</b> ${esc(first)} ${esc(last)}</p><p><b>Negocio:</b> ${esc(business)}</p><p><b>Tipo:</b> ${esc(businessType)}</p><p><b>Necesidad:</b> ${esc(category)}</p><p><b>Correo:</b> ${esc(email)}</p><p><b>Idioma:</b> ${esc(language)||"es"}</p><div style="margin-top:18px;padding:16px;background:#f4f8fb;border-radius:12px;white-space:pre-wrap"><b>Proyecto / necesidad / idea</b><br><br>${esc(message)}</div>${page?`<p style="margin-top:16px;font-size:11px;color:#8190a0">Página: ${esc(page)}</p>`:""}</div></div>`;
  }
  try{
    let result=await resend(apiKey,{from:preferredFrom,to:[to],reply_to:email,subject,html});
    if(!result.ok&&preferredFrom!==fallbackFrom){console.error("Resend primary sender failed",result.status,result.data);result=await resend(apiKey,{from:fallbackFrom,to:[to],reply_to:email,subject,html})}
    if(!result.ok){console.error("Resend DONBEX support error",result.status,result.data);return res.status(502).json({ok:false,error:"delivery_failed",provider_status:result.status})}
    return res.status(200).json({ok:true,id:result.data.id||null});
  }catch(e){console.error("DONBEX support error",e);return res.status(502).json({ok:false,error:"delivery_unavailable"})}
}
