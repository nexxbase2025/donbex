const clean=(v,max=500)=>String(v??"").replace(/[<>]/g,"").trim().slice(0,max);
const esc=(v)=>clean(v,3000).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const emailOk=(v)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).json({ok:false,error:"Método no permitido."});
  const apiKey=process.env.RESEND_API_KEY;
  if(!apiKey) return res.status(503).json({ok:false,error:"El envío directo todavía no está habilitado en el servidor."});
  const b=req.body||{};
  if(clean(b.company,100)) return res.status(200).json({ok:true});
  const fullName=clean(b.fullName,120), email=clean(b.email,180), phone=clean(b.phone,60), request=clean(b.request,1200);
  if(fullName.length<3||!emailOk(email)||phone.length<6||request.length<3) return res.status(400).json({ok:false,error:"Revisa los datos del formulario e intenta nuevamente."});
  const to=process.env.SUPPORT_DESTINATION_EMAIL||"radio@donbex.com";
  const from=process.env.SUPPORT_FROM_EMAIL||"DONBEX Radio App <radio@donbex.com>";
  const html=`<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#101828"><h2>Solicitud de datos para transferencia</h2><p>Nueva solicitud enviada desde DONBEX Radio App.</p><table style="width:100%;border-collapse:collapse"><tr><td><b>Nombre</b></td><td>${esc(fullName)}</td></tr><tr><td><b>Correo</b></td><td>${esc(email)}</td></tr><tr><td><b>Teléfono</b></td><td>${esc(phone)}</td></tr><tr><td><b>Solicitud</b></td><td>${esc(request)}</td></tr></table></div>`;
  try{
    const r=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json","User-Agent":"DONBEX-Radio-App/1.0"},body:JSON.stringify({from,to:[to],reply_to:email,subject:"Solicitud de datos para transferencia — DONBEX Radio App",html})});
    const data=await r.json().catch(()=>({}));
    if(!r.ok){ console.error("Resend bank-support error",r.status,data); return res.status(502).json({ok:false,error:"No se pudo enviar la solicitud en este momento."}); }
    return res.status(200).json({ok:true,id:data.id||null});
  }catch(e){return res.status(502).json({ok:false,error:"No se pudo conectar con el servicio de correo."});}
}
