import QRCode from "qrcode";
import sharp from "sharp";

function escXml(s=""){
  return String(s).replace(/[<>&'"]/g,c=>({"<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':"&quot;"}[c]));
}

export default async function handler(req,res){
  try{
    const target=String(req.query?.url||"");
    const logoUrl=String(req.query?.logo||"");
    if(!/^https:\/\/radio\.donbex\.com\//.test(target)){
      return res.status(400).send("Invalid radio URL");
    }

    const qrSvg=await QRCode.toString(target,{
      type:"svg",
      width:900,
      margin:3,
      errorCorrectionLevel:"H",
      color:{dark:"#000000",light:"#ffffff"}
    });

    let logoDataUri="";
    if(logoUrl){
      try{
        const u=new URL(logoUrl);
        const allowed=new Set(["firebasestorage.googleapis.com","storage.googleapis.com"]);
        if(allowed.has(u.hostname)){
          const r=await fetch(u.toString(),{redirect:"follow"});
          if(r.ok){
            const type=r.headers.get("content-type")||"image/png";
            const buf=Buffer.from(await r.arrayBuffer());
            logoDataUri=`data:${type};base64,${buf.toString("base64")}`;
          }
        }
      }catch{}
    }

    let composed=qrSvg;
    if(logoDataUri){
      const overlay=`<svg width="900" height="900" xmlns="http://www.w3.org/2000/svg">
        <rect x="350" y="350" width="200" height="200" rx="30" fill="#fff"/>
        <clipPath id="c"><circle cx="450" cy="450" r="82"/></clipPath>
        <image href="${escXml(logoDataUri)}" x="368" y="368" width="164" height="164" preserveAspectRatio="xMidYMid slice" clip-path="url(#c)"/>
      </svg>`;
      const base=Buffer.from(qrSvg);
      const png=await sharp(base)
        .composite([{input:Buffer.from(overlay),top:0,left:0}])
        .png()
        .toBuffer();
      res.setHeader("Content-Type","image/png");
      {
      const safeName=String(req.query?.name||"radio")
        .replace(/[^a-zA-Z0-9_-]+/g,"-")
        .replace(/^-+|-+$/g,"") || "radio";
      const disposition=req.query?.download==="1" ? "attachment" : "inline";
      res.setHeader("Content-Disposition",`${disposition}; filename="${safeName}-QR.png"`);
    }
      res.setHeader("Cache-Control","no-store");
      return res.status(200).send(png);
    }

    const png=await sharp(Buffer.from(qrSvg)).png().toBuffer();
    res.setHeader("Content-Type","image/png");
    res.setHeader("Content-Disposition",req.query?.download==="1" ? 'attachment; filename="radio-qr.png"' : 'inline; filename="radio-qr.png"');
    res.setHeader("Cache-Control","no-store");
    return res.status(200).send(png);
  }catch(err){
    console.error("QR endpoint error",err);
    return res.status(500).send("QR generation failed");
  }
}