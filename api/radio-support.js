const clean=(v,max=800)=>String(v??"").replace(/[<>]/g,"").trim().slice(0,max);
const esc=(v)=>clean(v,4000).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const emailOk=(v)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export default async function handler(req,res){
  if(req.method!=="POST")return res.status(405).json({ok:false,error:"Método no permitido."});
  const apiKey=process.env.RESEND_API_KEY;if(!apiKey)return res.status(503).json({ok:false,error:"El envío de soporte no está habilitado."});
  const b=req.body||{};if(clean(b.company,120))return res.status(200).json({ok:true});
  const fullName=clean(b.fullName,120),email=clean(b.email,180),phone=clean(b.phone,70),request=clean(b.request,1800);
  const context=clean(b.context,30),station=clean(b.stationName,140),orderId=clean(b.orderId,150),page=clean(b.page,500),language=clean(b.language,10);
  if(fullName.length<2||!emailOk(email)||phone.length<5||request.length<3)return res.status(400).json({ok:false,error:"Revisa los datos enviados."});
  const to=process.env.SUPPORT_DESTINATION_EMAIL||"radio@donbex.com";
  const from=process.env.SUPPORT_FROM_EMAIL||"DONBEX Radio App <radio@donbex.com>";
  const subject=context==="tracking"?`Soporte de cliente — ${station||"Radio App"}`:"Consulta desde DONBEX Radio App";
  const html=`<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#102033"><div style="padding:18px 20px;background:#071522;color:#fff;border-radius:14px 14px 0 0"><div style="color:#55dfff;font-size:12px;letter-spacing:2px;font-weight:700">DONBEX RADIO APP</div><h2 style="margin:7px 0 0">Nueva consulta de soporte</h2></div><div style="padding:22px;border:1px solid #dfe9f1;border-top:0;border-radius:0 0 14px 14px"><table style="width:100%;border-collapse:collapse;font-size:14px"><tr><td style="padding:6px 0;color:#66788a">Nombre</td><td style="padding:6px 0"><b>${esc(fullName)}</b></td></tr><tr><td style="padding:6px 0;color:#66788a">Correo</td><td style="padding:6px 0">${esc(email)}</td></tr><tr><td style="padding:6px 0;color:#66788a">Teléfono</td><td style="padding:6px 0">${esc(phone)}</td></tr>${station?`<tr><td style="padding:6px 0;color:#66788a">Radio</td><td style="padding:6px 0">${esc(station)}</td></tr>`:""}${orderId?`<tr><td style="padding:6px 0;color:#66788a">Referencia</td><td style="padding:6px 0">${esc(orderId)}</td></tr>`:""}<tr><td style="padding:6px 0;color:#66788a">Origen</td><td style="padding:6px 0">${context==="tracking"?"Panel privado del cliente":"Página principal"} · ${esc(language||"es")}</td></tr></table><div style="margin-top:18px;padding:16px;background:#f4f8fb;border-radius:12px;white-space:pre-wrap"><b>Consulta</b><br><br>${esc(request)}</div>${page?`<p style="margin:16px 0 0;font-size:11px;color:#8190a0">Página: ${esc(page)}</p>`:""}</div></div>`;
  try{
    const r=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json","User-Agent":"DONBEX-Radio-App-Support/1.0"},body:JSON.stringify({from,to:[to],reply_to:email,subject,html})});
    const data=await r.json().catch(()=>({}));if(!r.ok){console.error("Resend radio-support error",r.status,data);return res.status(502).json({ok:false,error:"No se pudo enviar la consulta."});}
    return res.status(200).json({ok:true,id:data.id||null});
  }catch(e){console.error("Radio support error",e);return res.status(502).json({ok:false,error:"No se pudo conectar con soporte."});}
}
