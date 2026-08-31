import QRCode from "qrcode";
import sharp from "sharp";

const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const planLabel=p=>p==="monthly"?"Edición · 1 mes":p==="six"?"Edición · 6 meses":p==="year"?"Edición · 12 meses":"";
const safeFileName=v=>String(v||"radio").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9_-]+/g,"-").replace(/^-+|-+$/g,"").slice(0,70)||"radio";

function xmlEsc(s=""){
  return String(s).replace(/[<>&'\"]/g,c=>({"<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':"&quot;"}[c]));
}

async function logoDataUri(logoUrl){
  if(!logoUrl)return "";
  try{
    const u=new URL(logoUrl);
    const allowed=new Set(["firebasestorage.googleapis.com","storage.googleapis.com"]);
    if(!allowed.has(u.hostname))return "";
    const r=await fetch(u.toString(),{redirect:"follow"});
    if(!r.ok)return "";
    const type=r.headers.get("content-type")||"image/png";
    const buf=Buffer.from(await r.arrayBuffer());
    return `data:${type};base64,${buf.toString("base64")}`;
  }catch{return "";}
}

export async function buildReceiptQr(order){
  const publicUrl=String(order?.publicUrl||`https://radio.donbex.com/${order?.slug||""}`);
  const qrSvg=await QRCode.toString(publicUrl,{type:"svg",width:900,margin:3,errorCorrectionLevel:"H",color:{dark:"#000000",light:"#ffffff"}});
  const logo=await logoDataUri(order?.logoUrl||"");
  if(!logo)return sharp(Buffer.from(qrSvg)).png().toBuffer();
  const overlay=`<svg width="900" height="900" xmlns="http://www.w3.org/2000/svg"><rect x="350" y="350" width="200" height="200" rx="30" fill="#fff"/><clipPath id="c"><circle cx="450" cy="450" r="82"/></clipPath><image href="${xmlEsc(logo)}" x="368" y="368" width="164" height="164" preserveAspectRatio="xMidYMid slice" clip-path="url(#c)"/></svg>`;
  return sharp(Buffer.from(qrSvg)).composite([{input:Buffer.from(overlay),top:0,left:0}]).png().toBuffer();
}

function latin(v=""){
  return String(v)
    .replace(/[–—]/g,"-")
    .replace(/[“”]/g,'"')
    .replace(/[‘’]/g,"'")
    .replace(/·/g,"-")
    .replace(/…/g,"...")
    .replace(/[^\x20-\x7E\xA0-\xFF]/g,"");
}
function pdfEsc(v=""){return latin(v).replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)");}
function money(n){return `$${Number(n||0).toFixed(2)} USD`;}

export function buildReceiptPdf(order,{amount}={}){
  const isEdition=order?.requestType==="edition";
  const plan=planLabel(order?.payment?.editPlan);
  const concept=isEdition?(plan||"Activación de edición"):`Radio App${plan?` + ${plan}`:""}`;
  const total=Number(amount??((Number(order?.payment?.basePrice||0)+Number(order?.payment?.editPrice||0)).toFixed(2)));
  const station=order?.stationName||"Radio Online";
  const customer=order?.customer?.name||"Cliente";
  const email=order?.customer?.email||"";
  const ref=order?.id||order?.trackingToken||"DONBEX";
  const publicUrl=order?.publicUrl||`https://radio.donbex.com/${order?.slug||""}`;
  const tracking=order?.trackingUrl||`https://radio.donbex.com/order/${order?.trackingToken||""}`;
  const issued=new Intl.DateTimeFormat("es-EC",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:false,timeZone:"America/Guayaquil"}).format(new Date());

  const lines=[];
  const text=(font,size,x,y,value,color="0.08 0.12 0.18")=>lines.push(`BT /${font} ${size} Tf ${color} rg ${x} ${y} Td (${pdfEsc(value)}) Tj ET`);
  lines.push("q 0.035 0.071 0.102 rg 0 680 612 112 re f Q");
  text("F2",11,48,752,"DONBEX RADIO APP","0.30 0.85 0.95");
  text("F2",25,48,716,"RECIBO DE PAGO DIGITAL","1 1 1");
  text("F1",10,48,694,"Comprobante informativo de servicio digital","0.70 0.80 0.87");

  lines.push("q 0.965 0.976 0.986 rg 42 478 528 170 re f Q");
  lines.push("q 0.82 0.88 0.92 RG 42 478 528 170 re S Q");
  text("F2",12,60,622,"DATOS DEL CLIENTE","0.05 0.45 0.58");
  text("F1",10,60,600,"Nombre"); text("F2",12,160,600,customer);
  text("F1",10,60,578,"Correo"); text("F2",11,160,578,email);
  text("F1",10,60,556,"Radio App"); text("F2",11,160,556,station);
  text("F1",10,60,534,"Concepto"); text("F2",11,160,534,concept);
  text("F1",10,60,512,"Referencia"); text("F2",10,160,512,ref);
  text("F1",10,60,490,"Fecha"); text("F2",10,160,490,issued);

  lines.push("q 0.035 0.071 0.102 rg 42 382 528 70 re f Q");
  text("F1",12,60,424,"TOTAL PAGADO","0.72 0.82 0.88");
  text("F2",24,398,410,money(total),"1 1 1");

  text("F2",12,48,344,"ENLACES DE TU RADIO APP","0.05 0.45 0.58");
  text("F1",10,48,320,"Enlace público:");
  text("F2",9,48,302,publicUrl,"0.03 0.35 0.75");
  text("F1",10,48,272,"Acceso privado de seguimiento y edición:");
  text("F2",9,48,254,tracking,"0.03 0.35 0.75");

  lines.push("q 0.93 0.97 0.98 rg 42 145 528 72 re f Q");
  text("F2",11,60,190,"PAGO CONFIRMADO","0.04 0.50 0.58");
  text("F1",10,60,169,"Este documento es un comprobante informativo emitido por DONBEX Radio App.");
  text("F1",10,60,153,"Conserva también el correo, el QR y tu enlace privado de seguimiento.");

  lines.push("q 0.82 0.88 0.92 RG 42 112 528 0 re S Q");
  text("F2",10,48,82,"DONBEX - Tecnología que impulsa negocios.","0.20 0.28 0.35");
  text("F1",9,48,64,"radio@donbex.com  |  radio.donbex.com","0.40 0.48 0.55");

  const stream=Buffer.from(lines.join("\n")+"\n","latin1");
  const objs=[];
  objs[1]=Buffer.from("<< /Type /Catalog /Pages 2 0 R >>","latin1");
  objs[2]=Buffer.from("<< /Type /Pages /Kids [3 0 R] /Count 1 >>","latin1");
  objs[3]=Buffer.from("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>","latin1");
  objs[4]=Buffer.concat([Buffer.from(`<< /Length ${stream.length} >>\nstream\n`,`latin1`),stream,Buffer.from("endstream","latin1")]);
  objs[5]=Buffer.from("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>","latin1");
  objs[6]=Buffer.from("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>","latin1");

  const chunks=[Buffer.from("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n","latin1")];
  const offsets=[0];
  let offset=chunks[0].length;
  for(let i=1;i<=6;i++){
    offsets[i]=offset;
    const b=Buffer.concat([Buffer.from(`${i} 0 obj\n`,`latin1`),objs[i],Buffer.from("\nendobj\n","latin1")]);
    chunks.push(b); offset+=b.length;
  }
  const xrefOffset=offset;
  let xref="xref\n0 7\n0000000000 65535 f \n";
  for(let i=1;i<=6;i++)xref+=String(offsets[i]).padStart(10,"0")+" 00000 n \n";
  xref+=`trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  chunks.push(Buffer.from(xref,"latin1"));
  return Buffer.concat(chunks);
}

export async function sendDonbexReceipt(order,{paypalOrderId,amount}={}){
  const apiKey=process.env.RESEND_API_KEY;
  const email=String(order?.customer?.email||"").trim();
  if(!apiKey||!email)return {ok:false,skipped:true,reason:!apiKey?"missing_api_key":"missing_customer_email"};

  const total=Number(amount??((Number(order?.payment?.basePrice||0)+Number(order?.payment?.editPrice||0)).toFixed(2)));
  const isEdition=order?.requestType==="edition";
  const plan=planLabel(order?.payment?.editPlan);
  const concept=isEdition?(plan||"Activación de edición"):`DONBEX Radio App${plan?` + ${plan}`:""}`;
  const station=String(order?.stationName||"Radio Online");
  const tracking=String(order?.trackingUrl||`https://radio.donbex.com/order/${order?.trackingToken||""}`);
  const publicUrl=String(order?.publicUrl||`https://radio.donbex.com/${order?.slug||""}`);
  const title=isEdition?"Edición aprobada":"Radio App activada";
  const intro=isEdition?`La edición de <b>${esc(station)}</b> fue activada correctamente.`:`Tu Radio App <b>${esc(station)}</b> quedó activada correctamente.`;
  const qr=await buildReceiptQr(order);
  const pdf=buildReceiptPdf(order,{amount:total,paypalOrderId});
  const base=safeFileName(station);

  const html=`<!doctype html><html><body style="margin:0;background:#eef3f7;font-family:Arial,sans-serif;color:#182231"><div style="max-width:720px;margin:0 auto;padding:32px 14px"><div style="overflow:hidden;background:#fff;border:1px solid #dfe7ee;border-radius:20px"><div style="background:#071019;padding:28px 32px"><div style="font-size:11px;letter-spacing:3px;color:#68ddf7;font-weight:800">DONBEX RADIO APP</div><h1 style="font-size:28px;line-height:1.15;margin:10px 0 0;color:#fff">${title}</h1></div><div style="padding:30px 32px"><p style="font-size:16px;margin:0 0 18px">Hola ${esc(order?.customer?.name||"cliente")},</p><p style="font-size:15px;line-height:1.65;margin:0 0 24px;color:#445366">${intro}</p><a href="${esc(publicUrl)}" style="display:inline-block;background:#071423;color:#fff;text-decoration:none;padding:14px 20px;border-radius:10px;font-weight:800">Abrir mi Radio App</a><div style="margin-top:18px;font-size:12px;font-weight:800;color:#637386">URL pública</div><a href="${esc(publicUrl)}" style="display:block;margin-top:6px;color:#0868ce;word-break:break-all">${esc(publicUrl)}</a><a href="${esc(tracking)}" style="display:inline-block;margin-top:26px;background:#eaf4ff;border:1px solid #b9dafb;color:#0759a8;text-decoration:none;padding:13px 18px;border-radius:10px;font-weight:800">Administrar mi Radio App</a><div style="margin-top:18px;font-size:12px;font-weight:800;color:#637386">Acceso privado de seguimiento y edición</div><a href="${esc(tracking)}" style="display:block;margin-top:6px;color:#0868ce;word-break:break-all">${esc(tracking)}</a><div style="margin-top:24px;background:#f4f7fa;border-radius:12px;padding:17px 18px;color:#4b5b6d;font-size:13px;line-height:1.65">Guarda tu acceso privado. Desde este panel podrás revisar tu Radio App, descargar tu QR y administrar la edición cuando esté activa.</div><div style="margin-top:24px;border-top:1px solid #e5ebf0;padding-top:20px"><div style="font-size:14px;font-weight:800;color:#182231">Archivos adjuntos</div><p style="margin:8px 0 0;color:#5b6b7c;font-size:13px;line-height:1.6">Tu QR personalizado se adjunta en formato PNG${order?.logoUrl?", incluyendo el logo configurado en tu Radio App":""}. También encontrarás tu comprobante de pago DONBEX en formato PDF.</p></div></div><div style="border-top:1px solid #e5ebf0;padding:20px 32px;color:#758494;font-size:12px">DONBEX · Tecnología que impulsa negocios.</div></div></div></body></html>`;

  const payload={
    from:"DONBEX Radio App <radio@donbex.com>",
    to:[email],
    reply_to:"radio@donbex.com",
    subject:`DONBEX · ${title} · ${station}`,
    html,
    attachments:[
      {filename:`${base}-QR.png`,content:qr.toString("base64"),content_type:"image/png"},
      {filename:`Recibo-DONBEX-${safeFileName(order?.id||order?.trackingToken||Date.now())}.pdf`,content:pdf.toString("base64"),content_type:"application/pdf"}
    ]
  };
  const r=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json","User-Agent":"DONBEX-Radio-App/1.0"},body:JSON.stringify(payload)});
  const data=await r.json().catch(()=>({}));
  if(!r.ok)throw new Error(`Resend receipt ${r.status}: ${data?.message||"send failed"}`);
  return {ok:true,id:data?.id||null,attachments:2};
}
