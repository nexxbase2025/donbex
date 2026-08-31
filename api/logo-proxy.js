export default async function handler(req,res){
  try{
    const raw=String(req.query?.url||"");
    if(!raw)return res.status(400).send("Missing url");
    const u=new URL(raw);
    const allowed=new Set(["firebasestorage.googleapis.com","storage.googleapis.com"]);
    if(!allowed.has(u.hostname))return res.status(403).send("Forbidden");

    const r=await fetch(u.toString(),{redirect:"follow"});
    if(!r.ok)return res.status(502).send("Image fetch failed");
    const type=r.headers.get("content-type")||"";
    if(!type.startsWith("image/"))return res.status(415).send("Not an image");

    const buf=Buffer.from(await r.arrayBuffer());
    res.setHeader("Content-Type",type);
    res.setHeader("Cache-Control","public, max-age=3600, s-maxage=3600");
    res.status(200).send(buf);
  }catch(err){
    console.error(err);
    res.status(500).send("Proxy error");
  }
}