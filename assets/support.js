(()=>{
  "use strict";
  const $=(s,r=document)=>r.querySelector(s);
  const lang=(navigator.language||document.documentElement.lang||"es").toLowerCase().startsWith("en")?"en":"es";
  const isTracking=()=>/^\/order\//.test(location.pathname);
  let currentOrder=null;
  window.addEventListener("donbex:tracking-loaded",e=>{currentOrder=e.detail?.order||currentOrder;});

  const T={
    es:{
      title:"Asistente DONBEX Radio App",online:"Soporte disponible",helloMain:"Hola. Soy el asistente virtual de DONBEX Radio App. Puedo ayudarte a conocer el servicio, precios, instalación, QR, streaming y pagos. ¿Qué necesitas saber?",helloTrack:"Hola. Estoy aquí para ayudarte con tu Radio App activa: enlace, QR, edición, instalación, cambios y soporte técnico. ¿Qué necesitas?",placeholder:"Escribe tu pregunta…",unknown:"No encontré una respuesta exacta para eso. Prueba una de estas opciones o envíame tu consulta directamente.",more:"También puedes consultar",contact:"Contactar soporte",send:"Enviar consulta",sending:"Enviando…",sent:"Consulta enviada. Te responderemos al correo registrado.",sendErr:"No se pudo enviar ahora. Inténtalo nuevamente.",purchaseData:"Usaremos los datos de tu compra para identificar tu Radio App.",name:"Nombre y apellido",email:"Correo",phone:"Teléfono",message:"Escribe tu consulta",copyOk:"Enlace copiado ✓",notReady:"Tu enlace público estará disponible cuando la Radio App esté activa."},
    en:{
      title:"DONBEX Radio App Assistant",online:"Support available",helloMain:"Hi. I’m the DONBEX Radio App virtual assistant. I can help with the service, pricing, installation, QR, streaming and payments. What would you like to know?",helloTrack:"Hi. I’m here to help with your active Radio App: public link, QR, editing, installation, updates and technical support. What do you need?",placeholder:"Type your question…",unknown:"I couldn't find an exact answer. Try one of these options or send your question directly to support.",more:"You may also ask",contact:"Contact support",send:"Send request",sending:"Sending…",sent:"Request sent. We’ll reply to the registered email.",sendErr:"We couldn't send it right now. Please try again.",purchaseData:"We’ll use your purchase details to identify your Radio App.",name:"Full name",email:"Email",phone:"Phone",message:"Write your question",copyOk:"Link copied ✓",notReady:"Your public link will be available once the Radio App is active."}
  }[lang];

  const KB={
    main:{
      es:[
        {id:"how",label:"¿Cómo funciona?",keywords:["como funciona","funciona","crear","probar","prueba"],answer:"Configuras tu radio directamente en la plataforma: eliges una plantilla, escribes el nombre, agregas tu URL de streaming HTTPS, logo y redes sociales. Puedes probar el reproductor antes de comprar. Cuando publicas y el pago se confirma, recibes tu enlace público, QR y acceso privado de seguimiento.",related:["stream","devices","price"]},
        {id:"price",label:"Precio y planes",keywords:["precio","cuesta","planes","plan","mensual","11.99","5.99","24.99","39.99"],answer:"La Radio App cuesta $11.99 USD en pago único. No tiene mensualidad obligatoria para permanecer publicada. Si después necesitas hacer cambios, puedes activar edición por 1 mes ($5.99), 6 meses ($24.99) o 12 meses ($39.99).",related:["edit","payments"]},
        {id:"stream",label:"Streaming HTTPS",keywords:["stream","streaming","https","url","zeno","enlace de audio"],answer:"Para probar y publicar la radio necesitas una URL directa de streaming que funcione mediante HTTPS. La plataforma verifica el stream antes de habilitar la publicación.",related:["how","devices"]},
        {id:"devices",label:"iPhone, Android y PWA",keywords:["iphone","android","dispositivo","pwa","instalar","compatible","computadora","tablet"],answer:"Sí. La Radio App funciona como PWA y está preparada para iPhone, Android, tablets y computadoras mediante navegadores compatibles. También puede abrirse directamente desde su enlace público sin instalarla.",related:["install","qr"]},
        {id:"install",label:"¿Cómo se instala?",keywords:["instala","instalar","descargar","pantalla de inicio","home screen"],answer:"El usuario abre el enlace público de la radio y utiliza la opción de instalación disponible en su navegador. En iPhone se agrega a la pantalla de inicio desde Compartir; en Android puede aparecer la opción Instalar app o Añadir a pantalla de inicio.",related:["devices","qr"]},
        {id:"qr",label:"QR y enlace público",keywords:["qr","codigo","código","enlace","link","compartir"],answer:"Al activarse la Radio App recibes un enlace público y un QR. Si configuraste un logo, el QR se genera personalizado con ese logo. Puedes compartir el enlace o el QR para que otras personas abran e instalen la radio.",related:["devices","edit"]},
        {id:"edit",label:"Cambios y edición",keywords:["editar","edicion","edición","cambiar","logo","nombre","redes","actualizar"],answer:"La radio permanece publicada sin una mensualidad obligatoria. Cuando necesites modificar nombre, logo, streaming, redes o diseño, activas un período de edición. Los cambios guardados se reflejan en la Radio App y en los dispositivos que la estén utilizando.",related:["price","qr"]},
        {id:"payments",label:"Pagos",keywords:["pago","paypal","tarjeta","transferencia","banco","guayaquil"],answer:"Puedes pagar en línea con PayPal o tarjeta mediante el módulo seguro de PayPal. El pago en línea se confirma automáticamente. También existe transferencia bancaria, que requiere adjuntar el comprobante y esperar verificación.",related:["price","contact"]},
        {id:"contact",label:"Hablar con soporte",keywords:["soporte","ayuda","contacto","correo","persona","problema"],answer:"Si tu consulta necesita revisión humana, puedes enviarla directamente a soporte DONBEX desde aquí. No necesitas abrir WhatsApp ni otra aplicación.",related:[]}
      ],
      en:[
        {id:"how",label:"How does it work?",keywords:["how","works","create","try","test"],answer:"Configure your radio directly in the platform: choose a template, enter the station name, add your HTTPS streaming URL, logo and social links. You can test the player before buying. Once you publish and payment is confirmed, you receive the public link, QR and private tracking access.",related:["stream","devices","price"]},
        {id:"price",label:"Pricing & plans",keywords:["price","cost","plans","monthly","11.99","5.99","24.99","39.99"],answer:"The Radio App is $11.99 USD as a one-time payment. There is no required monthly fee to keep it published. If you need changes later, activate editing for 1 month ($5.99), 6 months ($24.99) or 12 months ($39.99).",related:["edit","payments"]},
        {id:"stream",label:"HTTPS streaming",keywords:["stream","streaming","https","url","audio link"],answer:"To test and publish the radio you need a direct streaming URL that works over HTTPS. The platform verifies the stream before publication is enabled.",related:["how","devices"]},
        {id:"devices",label:"iPhone, Android & PWA",keywords:["iphone","android","device","pwa","install","compatible","computer","tablet"],answer:"Yes. The Radio App works as a PWA and is designed for iPhone, Android, tablets and computers through compatible browsers. It can also be opened directly from its public link without installing it.",related:["install","qr"]},
        {id:"install",label:"How do I install it?",keywords:["install","download","home screen"],answer:"Open the radio's public link and use the installation option provided by the browser. On iPhone, add it to the Home Screen from Share; on Android, use Install app or Add to Home screen when available.",related:["devices","qr"]},
        {id:"qr",label:"QR & public link",keywords:["qr","code","link","share"],answer:"When the Radio App is activated you receive a public link and QR. If a logo was configured, the QR is generated with that logo. Share either one so listeners can open and install the radio.",related:["devices","edit"]},
        {id:"edit",label:"Changes & editing",keywords:["edit","change","logo","name","social","update"],answer:"The radio stays published without a mandatory monthly fee. When you need to change the name, logo, stream, social links or design, activate an editing period. Saved changes are reflected in the Radio App and on devices using it.",related:["price","qr"]},
        {id:"payments",label:"Payments",keywords:["payment","paypal","card","transfer","bank"],answer:"You can pay online with PayPal or card through PayPal's secure module. Online payments are confirmed automatically. Bank transfer is also available and requires uploading proof of payment for review.",related:["price","contact"]},
        {id:"contact",label:"Contact support",keywords:["support","help","contact","email","problem"],answer:"If your question needs human review, you can send it directly to DONBEX support from here without opening WhatsApp or another app.",related:[]}
      ]
    },
    tracking:{
      es:[
        {id:"link",label:"Mi enlace público",keywords:["mi link","mi enlace","enlace publico","link publico","copiar"],answer:"Tu enlace público aparece en este mismo panel cuando la Radio App está activa. Puedes copiarlo y compartirlo con tus oyentes.",related:["qr","install"],action:"copyLink"},
        {id:"qr",label:"Recuperar / descargar mi QR",keywords:["qr","descargar qr","recuperar qr","codigo"],answer:"Puedes descargar nuevamente el QR de tu Radio App desde este panel. El QR apunta a tu enlace público y utiliza el logo disponible cuando corresponde.",related:["link","install"],action:"downloadQr"},
        {id:"edit",label:"Quiero hacer cambios",keywords:["editar","cambiar","cambios","logo","nombre","stream","redes","diseño"],answer:"Si necesitas modificar tu Radio App, revisa la sección de edición de este panel. Cuando la edición está activa, los cambios guardados se reflejan en la radio sin tener que crear otra PWA.",related:["live","plans"],action:"edit"},
        {id:"plans",label:"Activar período de edición",keywords:["activar edicion","plan","1 mes","6 meses","12 meses","renovar"],answer:"Puedes activar edición por 1 mes ($5.99), 6 meses ($24.99) o 12 meses ($39.99) desde este panel. El pago en línea activa la edición automáticamente al confirmarse.",related:["edit","payment"],action:"renew"},
        {id:"live",label:"¿Cuándo se ven mis cambios?",keywords:["cambios reflejan","inmediato","actualiza","actualizacion","tiempo real"],answer:"Los cambios guardados se reflejan en la Radio App prácticamente en tiempo real. Una radio que ya está abierta puede recibir la actualización sin que el cliente tenga que reinstalarla.",related:["edit","install"]},
        {id:"install",label:"Instalar de nuevo",keywords:["instalar","reinstalar","nuevo telefono","otro teléfono","iphone","android"],answer:"Puedes abrir tu enlace público en el nuevo dispositivo y volver a instalar la PWA desde el navegador. No necesitas comprar otra Radio App por cambiar de teléfono.",related:["link","qr"]},
        {id:"payment",label:"Estado de pago / edición",keywords:["pago","paypal","transferencia","estado","aprobacion","aprobación"],answer:"Los pagos en línea se confirman automáticamente. Las transferencias requieren verificación del comprobante. El estado actual de tu Radio App y de la edición aparece en este panel.",related:["plans","contact"]},
        {id:"contact",label:"Necesito soporte",keywords:["soporte","ayuda","problema","contacto","correo"],answer:"Puedes enviar una consulta directamente a soporte DONBEX desde este chat. Usaremos los datos asociados a tu compra para identificar tu Radio App.",related:[]}
      ],
      en:[
        {id:"link",label:"My public link",keywords:["my link","public link","copy"],answer:"Your public link appears in this dashboard once the Radio App is active. You can copy and share it with your listeners.",related:["qr","install"],action:"copyLink"},
        {id:"qr",label:"Recover / download my QR",keywords:["qr","download qr","recover qr","code"],answer:"You can download your Radio App QR again from this dashboard. It points to your public link and uses the available logo when applicable.",related:["link","install"],action:"downloadQr"},
        {id:"edit",label:"I need to make changes",keywords:["edit","change","logo","name","stream","social","design"],answer:"If you need to modify your Radio App, use the editing section in this dashboard. When editing is active, saved changes are reflected without creating a new PWA.",related:["live","plans"],action:"edit"},
        {id:"plans",label:"Activate an editing period",keywords:["editing plan","1 month","6 months","12 months","renew"],answer:"You can activate editing for 1 month ($5.99), 6 months ($24.99) or 12 months ($39.99) from this dashboard. Online payment activates editing automatically once confirmed.",related:["edit","payment"],action:"renew"},
        {id:"live",label:"When do my changes appear?",keywords:["changes","live","update","real time"],answer:"Saved changes are reflected in the Radio App almost in real time. An already-open radio can receive the update without requiring the listener to reinstall it.",related:["edit","install"]},
        {id:"install",label:"Install again",keywords:["install","reinstall","new phone","iphone","android"],answer:"Open your public link on the new device and install the PWA again from the browser. You do not need to buy another Radio App just because you changed phones.",related:["link","qr"]},
        {id:"payment",label:"Payment / editing status",keywords:["payment","paypal","transfer","status","approval"],answer:"Online payments are confirmed automatically. Bank transfers require proof-of-payment review. Your current Radio App and editing status appears in this dashboard.",related:["plans","contact"]},
        {id:"contact",label:"I need support",keywords:["support","help","problem","contact","email"],answer:"You can send a request directly to DONBEX support from this chat. We’ll use the details associated with your purchase to identify your Radio App.",related:[]}
      ]
    }
  };

  const panel=$("#donbexSupportPanel"), launcher=$("#donbexSupportLauncher"), feed=$("#supportFeed"), input=$("#supportInput"), send=$("#supportSend"), close=$("#supportClose");
  if(!panel||!launcher||!feed||!input||!send||!close)return;
  const scope=()=>isTracking()?"tracking":"main";
  const items=()=>KB[scope()][lang];
  let greeted=false;

  function msg(text,who="bot"){
    const el=document.createElement("div");el.className=`support-msg ${who}`;el.textContent=text;feed.appendChild(el);scroll();return el;
  }
  function scroll(){requestAnimationFrame(()=>{feed.scrollTop=feed.scrollHeight;});}
  function chips(list,actionClass=""){
    const wrap=document.createElement("div");wrap.className="support-quick-wrap";
    list.forEach(item=>{const b=document.createElement("button");b.type="button";b.className=`support-chip ${actionClass}`.trim();b.textContent=item.label;b.dataset.topic=item.id;wrap.appendChild(b);});
    feed.appendChild(wrap);scroll();return wrap;
  }
  function showHome(){
    const all=items();
    const label=document.createElement("div");label.className="support-section-title";label.textContent=T.more;feed.appendChild(label);
    chips(all.slice(0,scope()==="main"?8:7));
    const contact=all.find(x=>x.id==="contact");if(contact)chips([contact],"action");
  }
  function topicById(id){return items().find(x=>x.id===id)}
  function showTopic(t,userText=null){
    if(!t)return;
    if(userText)msg(userText,"user");else msg(t.label,"user");
    msg(t.answer);
    if(t.action)showAction(t.action);
    if(t.id==="contact")showContactForm();
    if(t.related?.length){chips(t.related.map(topicById).filter(Boolean));}
  }
  function normalize(v){return String(v||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9ñáéíóúü$\.\s]/gi," ");}
  function match(text){
    const q=normalize(text);let best=null,bestScore=0;
    for(const t of items()){
      let score=0;
      for(const k of t.keywords||[]){const kk=normalize(k);if(q.includes(kk))score+=kk.includes(" ")?4:2;else{const words=kk.split(/\s+/);score+=words.filter(w=>w.length>2&&q.includes(w)).length*.7;}}
      if(score>bestScore){best=t;bestScore=score;}
    }
    return bestScore>=1.4?best:null;
  }
  function showAction(action){
    const labels=lang==="en"?{copyLink:"Copy my public link",downloadQr:"Download my QR",edit:"Open editor",renew:"View editing plans"}:{copyLink:"Copiar mi enlace",downloadQr:"Descargar mi QR",edit:"Abrir editor",renew:"Ver planes de edición"};
    const b=document.createElement("button");b.type="button";b.className="support-chip action";b.textContent=labels[action];b.dataset.supportAction=action;
    const w=document.createElement("div");w.className="support-quick-wrap";w.appendChild(b);feed.appendChild(w);scroll();
  }
  async function runAction(action){
    const order=currentOrder;
    if(action==="copyLink"){
      const url=order?.publicUrl||($("#trackingPublicUrl")?.textContent||"").trim();
      if(!/^https?:\/\//.test(url)){msg(T.notReady);return;}
      try{await navigator.clipboard.writeText(url);msg(T.copyOk);}catch{msg(url);}
    }else if(action==="downloadQr"){
      const btn=$("#trackingDownloadQr");if(btn&&!btn.disabled){btn.click();msg(lang==="en"?"QR download started.":"Inicié la descarga de tu QR.");}else msg(T.notReady);
    }else if(action==="edit"){
      const btn=$("#trackingEditRadio");if(btn&&!btn.classList.contains("hidden")){closePanel();btn.click();}else{const block=$("#trackingRenewBlock");closePanel();block?.scrollIntoView({behavior:"smooth",block:"center"});}
    }else if(action==="renew"){
      closePanel();$("#trackingRenewBlock")?.scrollIntoView({behavior:"smooth",block:"center"});
    }
  }
  function contactData(){
    const o=currentOrder||{};return {name:o.customer?.name||o.customerName||"",email:o.customer?.email||o.customerEmail||"",phone:o.customer?.whatsapp||o.customerWhatsapp||"",station:o.stationName||"",orderId:o.id||o.trackingToken||location.pathname.split("/").filter(Boolean).pop()||""};
  }
  function showContactForm(){
    if($(".support-contact-card",feed))return;
    const d=contactData(), tracked=isTracking()&&(d.name||d.email||d.phone);
    const card=document.createElement("form");card.className="support-contact-card";card.innerHTML=`
      <p>${tracked?T.purchaseData:(lang==="en"?"Enter your details and question. The message will be sent directly to DONBEX support.":"Completa tus datos y tu consulta. El mensaje se enviará directamente a soporte DONBEX.")}</p>
      <div class="support-contact-grid">
        <input class="${tracked?'support-prefilled':''}" name="fullName" placeholder="${T.name}" value="${escAttr(d.name)}" ${tracked&&d.name?'readonly':''} required>
        <input name="email" type="email" placeholder="${T.email}" value="${escAttr(d.email)}" ${tracked&&d.email?'readonly':''} required>
        <input class="full" name="phone" type="tel" placeholder="${T.phone}" value="${escAttr(d.phone)}" ${tracked&&d.phone?'readonly':''} required>
        <textarea class="full" name="request" rows="4" placeholder="${T.message}" required></textarea>
      </div>
      <input name="company" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true">
      <button class="support-contact-submit" type="submit">${T.send}</button>
      <small class="support-contact-status"></small>`;
    card.addEventListener("submit",submitContact);feed.appendChild(card);scroll();setTimeout(()=>card.querySelector("textarea")?.focus(),100);
  }
  function escAttr(v){return String(v||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");}
  async function submitContact(e){
    e.preventDefault();const form=e.currentTarget,status=$(".support-contact-status",form),button=$(".support-contact-submit",form),fd=new FormData(form),d=contactData();
    button.disabled=true;button.textContent=T.sending;status.className="support-contact-status";status.textContent="";
    try{
      const r=await fetch("/api/radio-support",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({fullName:fd.get("fullName"),email:fd.get("email"),phone:fd.get("phone"),request:fd.get("request"),company:fd.get("company"),context:scope(),stationName:d.station,orderId:d.orderId,page:location.href,language:lang})});
      const data=await r.json().catch(()=>({}));if(!r.ok||!data.ok)throw new Error(data.error||"SEND_FAILED");
      status.classList.add("ok");status.textContent=T.sent;button.textContent=lang==="en"?"Sent ✓":"Enviado ✓";form.querySelector("textarea").value="";
    }catch(err){status.classList.add("err");status.textContent=T.sendErr;button.disabled=false;button.textContent=T.send;}
  }
  function submitFree(){
    const text=input.value.trim();if(!text)return;input.value="";const found=match(text);if(found)showTopic(found,text);else{msg(text,"user");msg(T.unknown);showHome();}
  }
  function openPanel(){
    panel.classList.add("open");panel.setAttribute("aria-hidden","false");launcher.classList.add("is-open");launcher.setAttribute("aria-expanded","true");
    if(!greeted){greeted=true;msg(scope()==="tracking"?T.helloTrack:T.helloMain);showHome();}
    setTimeout(()=>input.focus({preventScroll:true}),180);
  }
  function closePanel(){panel.classList.remove("open");panel.setAttribute("aria-hidden","true");launcher.classList.remove("is-open");launcher.setAttribute("aria-expanded","false");}
  launcher.addEventListener("click",()=>panel.classList.contains("open")?closePanel():openPanel());close.addEventListener("click",closePanel);send.addEventListener("click",submitFree);input.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();submitFree();}});
  feed.addEventListener("click",e=>{const t=e.target.closest("[data-topic]");if(t)showTopic(topicById(t.dataset.topic));const a=e.target.closest("[data-support-action]");if(a)runAction(a.dataset.supportAction);});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&panel.classList.contains("open"))closePanel();});
  $("#supportTitle").textContent=T.title;$("#supportOnline").textContent=T.online;input.placeholder=T.placeholder;
})();
