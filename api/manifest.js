export default function handler(req,res){
  const q=req.query||{};
  const name=String(q.name||"Radio App").slice(0,80);
  const shortName=String(q.short_name||name).slice(0,30);
  const startUrl=String(q.start_url||"/");
  const icon=String(q.icon||"");

  const icons=icon ? [
    {src:icon,sizes:"192x192",type:"image/png",purpose:"any"},
    {src:icon,sizes:"512x512",type:"image/png",purpose:"any maskable"}
  ] : [];

  res.setHeader("Content-Type","application/manifest+json; charset=utf-8");
  res.setHeader("Cache-Control","no-store");
  res.status(200).send(JSON.stringify({
    name,
    short_name:shortName,
    start_url:startUrl,
    scope:"/",
    display:"standalone",
    background_color:"#070b12",
    theme_color:"#070b12",
    icons
  }));
}