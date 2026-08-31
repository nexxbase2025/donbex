const BASE="https://api-m.sandbox.paypal.com";
export function paypalBase(){return (process.env.PAYPAL_ENV||"sandbox").toLowerCase()==="live"?"https://api-m.paypal.com":BASE}
export async function paypalToken(){
  const id=process.env.PAYPAL_CLIENT_ID, secret=process.env.PAYPAL_CLIENT_SECRET;
  if(!id||!secret)throw new Error("Missing PAYPAL_CLIENT_ID/PAYPAL_CLIENT_SECRET");
  const auth=Buffer.from(`${id}:${secret}`).toString("base64");
  const r=await fetch(`${paypalBase()}/v1/oauth2/token`,{method:"POST",headers:{Authorization:`Basic ${auth}`,"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=client_credentials"});
  const j=await r.json();if(!r.ok)throw new Error(j.error_description||"PayPal auth failed");return j.access_token;
}
