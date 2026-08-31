const DESTINATION="soporte@dombex.com";
function clean(v,max=3000){return String(v??"").replace(/[<>]/g,"").trim().slice(0,max)}
function validEmail(v){return /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(String(v||""))}
export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).json({error:"Method not allowed"});
  const key=process.env.RESEND_API_KEY;if(!key) return res.status(503).json({error:"Email service not configured"});
  const b=req.body||{}, type=b.type==="support"?"support":"project", email=clean(b.email,320);
  if(!validEmail(email)) return res.status(400).json({error:"Invalid email"});
  let subject,html;
  if(type==="support"){
    const name=clean(b.name,160),phone=clean(b.phone,80),business=clean(b.business,180),category=clean(b.category,120),message=clean(b.message,5000);if(!name||!message)return res.status(400).json({error:"Missing fields"});
    subject=`DONBEX | Nueva consulta de soporte — ${name}`;
    html=`<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#0e1a26"><h2 style="color:#0b68ff">Nueva consulta de soporte DONBEX</h2><table style="border-collapse:collapse;width:100%"><tr><td style="padding:6px 0"><b>Cliente</b></td><td>${name}</td></tr><tr><td style="padding:6px 0"><b>Correo</b></td><td>${email}</td></tr><tr><td style="padding:6px 0"><b>Teléfono / WhatsApp</b></td><td>${phone||"—"}</td></tr><tr><td style="padding:6px 0"><b>Negocio / empresa</b></td><td>${business||"—"}</td></tr><tr><td style="padding:6px 0"><b>Categoría</b></td><td>${category||"Soporte general"}</td></tr><tr><td style="padding:6px 0"><b>Idioma</b></td><td>${clean(b.language,10)}</td></tr></table><hr><h3>Consulta</h3><p style="white-space:pre-wrap">${message}</p></div>`;
  }else{
    const first=clean(b.firstName,100),last=clean(b.lastName,100),business=clean(b.business,180),businessType=clean(b.businessType,180),category=clean(b.category,100),message=clean(b.message,7000);
    if(!first||!last||!business||!businessType||!category||!message)return res.status(400).json({error:"Missing fields"});
    subject=`DONBEX | Nueva solicitud de proyecto — ${business}`;
    html=`<div style="font-family:Arial,sans-serif;max-width:720px;margin:auto;color:#0e1a26"><h2 style="color:#0b68ff">Nueva solicitud de proyecto DONBEX</h2><table style="border-collapse:collapse;width:100%"><tr><td><b>Nombre</b></td><td>${first} ${last}</td></tr><tr><td><b>Negocio</b></td><td>${business}</td></tr><tr><td><b>Tipo</b></td><td>${businessType}</td></tr><tr><td><b>Categoría</b></td><td>${category}</td></tr><tr><td><b>Correo</b></td><td>${email}</td></tr></table><h3>Proyecto / necesidad / idea</h3><p style="white-space:pre-wrap">${message}</p></div>`;
  }
  try{
    const r=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${key}`,"Content-Type":"application/json"},body:JSON.stringify({from:process.env.DONBEX_FROM_EMAIL||"DONBEX <soporte@dombex.com>",to:[DESTINATION],reply_to:email,subject,html})});
    const data=await r.json().catch(()=>({}));if(!r.ok) return res.status(502).json({error:data?.message||"Email delivery failed"});
    return res.status(200).json({ok:true,id:data.id||null});
  }catch(e){return res.status(500).json({error:"Email delivery failed"})}
}
