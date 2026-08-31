const DESTINATION_DEFAULT="soporte@donbex.com";
const clean=(v,max=3000)=>String(v??"").replace(/[<>]/g,"").trim().slice(0,max);
const esc=(v,max=6000)=>clean(v,max).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const emailOk=(v)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v||""));

export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).json({ok:false,error:"method_not_allowed"});

  const apiKey=process.env.RESEND_API_KEY;
  if(!apiKey){
    console.error("DONBEX support: RESEND_API_KEY missing");
    return res.status(503).json({ok:false,error:"email_not_configured"});
  }

  const b=req.body||{};
  const type=b.type==="support"?"support":"project";
  const email=clean(b.email,220);
  if(!emailOk(email)) return res.status(400).json({ok:false,error:"invalid_email"});

  const to=DESTINATION_DEFAULT;
  const from=process.env.DONBEX_FROM_EMAIL||"DONBEX <soporte@donbex.com>";
  let subject="", html="";

  if(type==="support"){
    const name=clean(b.name,140), phone=clean(b.phone,80), business=clean(b.business,180), category=clean(b.category,120), message=clean(b.message,5000), language=clean(b.language,10);
    if(name.length<2||message.length<3) return res.status(400).json({ok:false,error:"missing_fields"});
    subject=`DONBEX | Nueva consulta de soporte — ${name}`;
    html=`<div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;color:#102033"><div style="padding:20px 22px;background:#071522;color:#fff;border-radius:15px 15px 0 0"><div style="color:#55dfff;font-size:12px;letter-spacing:2px;font-weight:700">DONBEX</div><h2 style="margin:7px 0 0">Nueva consulta de soporte</h2></div><div style="padding:22px;border:1px solid #dfe9f1;border-top:0;border-radius:0 0 15px 15px"><table style="width:100%;border-collapse:collapse;font-size:14px"><tr><td style="padding:6px 0;color:#66788a">Nombre</td><td><b>${esc(name)}</b></td></tr><tr><td style="padding:6px 0;color:#66788a">Correo</td><td>${esc(email)}</td></tr><tr><td style="padding:6px 0;color:#66788a">Teléfono / WhatsApp</td><td>${esc(phone)||"—"}</td></tr><tr><td style="padding:6px 0;color:#66788a">Negocio</td><td>${esc(business)||"—"}</td></tr><tr><td style="padding:6px 0;color:#66788a">Categoría</td><td>${esc(category)||"Soporte general"}</td></tr><tr><td style="padding:6px 0;color:#66788a">Idioma</td><td>${esc(language)||"es"}</td></tr></table><div style="margin-top:18px;padding:16px;background:#f4f8fb;border-radius:12px;white-space:pre-wrap"><b>Consulta</b><br><br>${esc(message)}</div></div></div>`;
  }else{
    const first=clean(b.firstName,100), last=clean(b.lastName,100), business=clean(b.business,180), businessType=clean(b.businessType,180), category=clean(b.category,120), message=clean(b.message,7000), language=clean(b.language,10);
    if(!first||!last||!business||!businessType||!category||message.length<3) return res.status(400).json({ok:false,error:"missing_fields"});
    subject=`DONBEX | Nueva solicitud de proyecto — ${business}`;
    html=`<div style="font-family:Arial,sans-serif;max-width:720px;margin:auto;color:#102033"><div style="padding:20px 22px;background:#071522;color:#fff;border-radius:15px 15px 0 0"><div style="color:#55dfff;font-size:12px;letter-spacing:2px;font-weight:700">DONBEX</div><h2 style="margin:7px 0 0">Nueva solicitud de proyecto</h2></div><div style="padding:22px;border:1px solid #dfe9f1;border-top:0;border-radius:0 0 15px 15px"><table style="width:100%;border-collapse:collapse;font-size:14px"><tr><td style="padding:6px 0;color:#66788a">Cliente</td><td><b>${esc(first)} ${esc(last)}</b></td></tr><tr><td style="padding:6px 0;color:#66788a">Negocio</td><td>${esc(business)}</td></tr><tr><td style="padding:6px 0;color:#66788a">Tipo</td><td>${esc(businessType)}</td></tr><tr><td style="padding:6px 0;color:#66788a">Necesidad</td><td>${esc(category)}</td></tr><tr><td style="padding:6px 0;color:#66788a">Correo</td><td>${esc(email)}</td></tr><tr><td style="padding:6px 0;color:#66788a">Idioma</td><td>${esc(language)||"es"}</td></tr></table><div style="margin-top:18px;padding:16px;background:#f4f8fb;border-radius:12px;white-space:pre-wrap"><b>Proyecto / necesidad / idea</b><br><br>${esc(message)}</div></div></div>`;
  }

  try{
    const r=await fetch("https://api.resend.com/emails",{
      method:"POST",
      headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json","User-Agent":"DONBEX-Web-Support/1.0"},
      body:JSON.stringify({from,to:[to],reply_to:email,subject,html})
    });
    const data=await r.json().catch(()=>({}));
    if(!r.ok){
      console.error("Resend DONBEX support error",r.status,data);
      return res.status(502).json({ok:false,error:"delivery_failed"});
    }
    return res.status(200).json({ok:true,id:data.id||null});
  }catch(e){
    console.error("DONBEX support error",e);
    return res.status(502).json({ok:false,error:"delivery_unavailable"});
  }
}
