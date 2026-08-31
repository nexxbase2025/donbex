(()=>{
  "use strict";
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const panels=$$('[data-view-panel]'), brand=$('#brandHome'), back=$('#backHome'), menuBtn=$('#menuBtn'), drawer=$('#drawer'), overlay=$('#overlay'), closeMenu=$('#closeMenu');
  const chatPeek=$('#chatPeek'), chatPanel=$('#chatPanel'), chatClose=$('#chatClose'), chatForm=$('#chatForm'), chatInput=$('#chatInput'), msgs=$('#msgs'), supportView=$('#supportView'), projectForm=$('#projectForm'), projectStatus=$('#projectStatus');
  const lang=(navigator.language||navigator.userLanguage||'es').toLowerCase().startsWith('en')?'en':'es'; document.documentElement.lang=lang;
  const en={
    homeKicker:'DIGITAL SYSTEMS FOR BUSINESS',homeTitle1:'Technology that',homeTitle2:'moves business forward.',homeIntro:'We build platforms, automation, PWA, websites and intelligent systems that simplify operations and turn complex workflows into easy-to-use experiences.',
    buildProject:'Build your project',ourProducts:'Our products',exploreSolutions:'Explore solutions',menuSolutions:'Solutions',menuProducts:'Products',menuAbout:'About us',menuPrivacy:'Privacy policy',backHome:'Back home',coreOnline:'● ONLINE',
    solAutomationLabel:'AUTOMATION',solAiLabel:'AI ASSISTANTS',solWebLabel:'SMART WEB',solPlatformLabel:'CUSTOM SYSTEMS',solPwaLabel:'MOBILE / PWA',solSalesLabel:'ONLINE SALES',solIntegrationsLabel:'INTEGRATIONS',
    solutionsKicker:'SOLUTIONS',solutionsTitleAccent:'DONBEX builds the solution.',solutionsIntro:'Choose the need that best matches yours. If it does not fit exactly, tell us your idea and we will design it with you.',
    sol1Title:'Process automation',sol1Text:'Reduce repetitive tasks and connect actions you currently perform manually.',sol1Cta:'I want to automate ↗',
    sol2Title:'Chatbots & AI assistants',sol2Text:'Answer questions, guide customers and capture information even when your team is unavailable.',sol2Cta:'I want an assistant ↗',
    sol3Title:'Automated websites',sol3Text:'Turn your website into a tool that captures requests, organizes data and triggers workflows.',sol3Cta:'I want a website ↗',
    sol4Title:'Business platforms',sol4Text:'Centralize customers, orders, bookings, roles and operations in a system built around your business.',sol4Cta:'I want a platform ↗',
    sol5Title:'Apps & PWA',sol5Text:'Create a fast, installable mobile experience without depending on an app store.',sol5Cta:'I want a PWA ↗',
    sol6Title:'Online sales & services',sol6Text:'Organize catalogs, orders, bookings, payments and follow-up in a simpler flow.',sol6Cta:'I want to sell online ↗',
    sol7Title:'CRM & internal management',sol7Text:'Organize customers, statuses, history and tasks so your team works with greater clarity.',sol7Cta:'I want to organize my business ↗',
    sol8Title:'Integrations',sol8Text:'Connect email, forms, APIs and tools that currently work separately.',sol8Cta:'I want to connect systems ↗',
    productWebName:'Web Platform',productRadioName:'PWA Radio Player',productTaxiSubtitle:'PLATFORM FOR DRIVERS AND TRANSPORTATION OPERATIONS',productWebSubtitle:'PLATFORM TO CREATE AND MANAGE BUSINESS WEB EXPERIENCES',productRadioSubtitle:'PWA PLAYER GENERATOR FOR ONLINE RADIO STATIONS',productTaxiText:'Requests, passenger experience, driver management and operational tools.',productWebText:'A manageable, scalable digital presence prepared to grow with the business.',productRadioText:'Add a streaming URL, logo and branding to generate an installable experience ready to share.',openPlatform:'Open platform',comingSoon:'COMING SOON',productsKicker:'DONBEX PRODUCTS',productsIntro:'Ready-to-use DONBEX products. New launches will appear here as they become available.',
    projectKicker:'YOUR IDEA, TURNED INTO A SYSTEM',projectTitleAccent:'We design how to make it happen.',projectIntro:'You do not need to know technology. Tell us about your business, the problem or the idea and we will guide you toward a clear solution.',
    projectStep1Label:'01 · UNDERSTAND',projectStep1Title:'Your business',projectStep1Text:'What you do, what you need to improve and the result you want to achieve.',
    projectStep2Label:'02 · DEFINE',projectStep2Title:'The solution',projectStep2Text:'We translate your need into clear features without complicating it with technical terms.',
    projectStep3Label:'03 · DESIGN',projectStep3Title:'The experience',projectStep3Text:'We organize the flow, interface and connections your project needs.',
    projectStep4Label:'04 · CONTINUE',projectStep4Title:'The next step',projectStep4Text:'We review your request and contact you to move forward with a concrete proposal.',
    firstName:'First name',lastName:'Last name',businessName:'Business / company name',businessType:'Business / company type',whatNeed:'What do you need?',email:'Email',describeProject:'Describe your project, need or idea',selectCategory:'Select a category',optAutomation:'Automation',optChatbot:'Chatbot / AI',optWebsite:'Website',optPlatform:'Platform',optPwa:'App / PWA',optCrm:'CRM',optIntegrations:'Integrations',optOther:'Other',sendRequest:'Send request',personalAttention:'PERSONAL ATTENTION',specialistTitle:'Would you rather talk to a DONBEX specialist?',specialistText:'Leave us your details. If your project needs it, we can coordinate a call.',
    aboutThinkLabel:'HOW WE THINK',aboutBuildLabel:'WHAT WE BUILD',aboutWhoLabel:'WHO IT IS FOR',drawerTagline:'Technology that moves business forward.',virtualAssistant:'Virtual Assistant',supportAvailable:'Support available',chatWelcome:'Hi. I am the DONBEX virtual assistant. I can guide you through our products, solutions and how to start your project. What would you like to know?',chipStart:'How do I start my project?',chipSolutions:'What can DONBEX do?',chipProducts:'Our products',chipRadio:'Radio App',chipSupport:'Talk to support'
  };
  if(lang==='en') $$('[data-i18n]').forEach(el=>{const t=en[el.dataset.i18n]; if(t) el.textContent=t;});
  if(lang==='en'){
    const exact={
      'Volver al inicio':'Back home','Soluciones':'Solutions','Productos':'Products','Construye tu proyecto':'Build your project','MÁS':'MORE','Sobre nosotros':'About us','Política de privacidad':'Privacy policy','Tecnología que impulsa negocios.':'Technology that moves business forward.','● EN LÍNEA':'● ONLINE',
      '¿Tu necesidad no encaja en una categoría?':'Does your need not fit a category?','Estas categorías son una guía. También diseñamos sistemas totalmente personalizados.':'These categories are a guide. We also design fully custom systems.','Explícanos tu idea':'Tell us your idea',
      'propios.':'of our own.','Cada uno con una experiencia distinta.':'Each one with a distinct experience.','Taxi Ride':'Taxi Ride','PRÓXIMAMENTE':'COMING SOON','Plataforma Web':'Web Platform','Reproductor PWA para Radio':'PWA Radio Player','Abrir plataforma':'Open platform',
      'SOBRE DONBEX':'ABOUT DONBEX','Convertimos necesidades de negocio':'We turn business needs','en sistemas digitales útiles.':'into useful digital systems.','Diseñamos tecnología alrededor de clientes, procesos, equipos y objetivos de crecimiento reales.':'We design technology around real customers, workflows, teams and growth goals.',
      'CÓMO PENSAMOS':'HOW WE THINK','La tecnología empieza por el negocio':'Technology starts with the business','Primero entendemos la operación, el cliente y el resultado. Después elegimos la tecnología.':'We first understand the operation, the customer and the desired outcome. Then we choose the technology.',
      'QUÉ CONSTRUIMOS':'WHAT WE BUILD','Infraestructura digital que puede crecer':'Digital infrastructure built to grow','Plataformas web, PWA, automatización, CRM, asistentes inteligentes, reservas y ventas online.':'Web platforms, PWA, automation, CRM, intelligent assistants, bookings and online sales.',
      'PARA QUIÉN':'WHO IT IS FOR','Diseñado alrededor de negocios reales':'Designed around real businesses','Para negocios y emprendedores que quieren simplificar operaciones o convertir una idea en una plataforma funcional.':'For businesses and entrepreneurs who want to simplify operations or turn an idea into a functional platform.',
      'POLÍTICA DE PRIVACIDAD':'PRIVACY POLICY','Tu información debe tratarse':'Your information should be handled','con claridad.':'with clarity.','Esta política explica qué información puede recopilar DONBEX y cómo puede utilizarse.':'This policy explains what information DONBEX may collect and how it may be used.',
      '1. Información que podemos recopilar':'1. Information we may collect','Nombre, negocio, correo, tipo de negocio, servicio seleccionado y detalles proporcionados voluntariamente.':'Name, business, email, business type, selected service and details you provide voluntarily.',
      '2. Cómo utilizamos la información':'2. How we use information','Para responder consultas, evaluar proyectos, preparar propuestas, brindar soporte y mejorar nuestros servicios.':'To answer inquiries, evaluate projects, prepare proposals, provide support and improve our services.',
      '3. Asistentes automáticos':'3. Automated assistants','DONBEX puede usar IA para orientación inicial. No envíes contraseñas, credenciales de pago ni información altamente sensible.':'DONBEX may use AI for initial guidance. Do not send passwords, payment credentials or highly sensitive information.',
      '4. Cookies y analítica':'4. Cookies and analytics','El sitio puede utilizar cookies esenciales y herramientas de analítica para comprender tráfico y rendimiento.':'The site may use essential cookies and analytics tools to understand traffic and performance.',
      '5. Servicios de terceros':'5. Third-party services','Podemos integrar proveedores de hosting, correo, pagos, analítica, automatización o IA.':'We may integrate hosting, email, payment, analytics, automation or AI providers.',
      '6. Seguridad':'6. Security','Usamos medidas razonables para reducir accesos no autorizados, aunque ningún sistema puede garantizar seguridad absoluta.':'We use reasonable safeguards to reduce unauthorized access, although no system can guarantee absolute security.'
    };
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n=>{const raw=n.nodeValue,trim=raw.trim(); if(exact[trim]) n.nodeValue=raw.replace(trim,exact[trim]);});
  }
  // Specific compound headings and placeholders
  if(lang==='en'){
    const sh=$('[data-view-panel="solutions"] .section-hero h2'); if(sh&&sh.firstChild) sh.firstChild.textContent='Start with what you want to solve.';
    const ph=$('[data-view-panel="project"] .section-hero h2'); if(ph&&ph.firstChild) ph.firstChild.textContent='Tell us what you want to achieve.';
    const type=$('input[name="tipo"]'); if(type) type.placeholder='Restaurant, salon, transportation...';
    if(chatInput) chatInput.placeholder='Type your question...';
  }
  function closeDrawer(){drawer?.classList.remove('open');overlay?.classList.remove('show');menuBtn?.classList.remove('open')}
  function openDrawer(){drawer?.classList.add('open');overlay?.classList.add('show');menuBtn?.classList.add('open')}
  function showView(name='home'){panels.forEach(p=>p.classList.toggle('active',p.dataset.viewPanel===name));brand?.classList.toggle('hidden',name!=='home');back?.classList.toggle('hidden',name==='home');closeDrawer();window.scrollTo({top:0,behavior:'smooth'})}
  menuBtn?.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();drawer?.classList.contains('open')?closeDrawer():openDrawer()}); overlay?.addEventListener('click',closeDrawer); closeMenu?.addEventListener('click',closeDrawer); brand?.addEventListener('click',()=>showView('home')); back?.addEventListener('click',()=>showView('home'));
  document.addEventListener('click',e=>{const t=e.target.closest('[data-view]');if(!t)return;e.preventDefault();showView(t.dataset.view)});
  function toggleChat(force){if(!chatPanel)return;const open=typeof force==='boolean'?force:!chatPanel.classList.contains('open');chatPanel.classList.toggle('open',open);chatPanel.setAttribute('aria-hidden',open?'false':'true');chatPeek?.classList.toggle('chat-hidden',open);if(open){setTimeout(()=>chatInput?.focus({preventScroll:true}),180)}else{hideSupportView()}}
  chatPeek?.addEventListener('click',()=>toggleChat()); chatClose?.addEventListener('click',()=>toggleChat(false));
  const answers={
   es:{
    start:'Empezar es simple: cuéntanos qué hace tu negocio, qué problema quieres resolver y qué resultado buscas. No necesitas términos técnicos. DONBEX convierte esa necesidad en un proyecto claro y te orienta sobre el siguiente paso.',
    solutions:'DONBEX crea soluciones digitales para negocios: automatización de procesos, asistentes con IA, páginas web inteligentes, PWA, CRM, plataformas a medida e integraciones. La idea es simplificar operaciones, mejorar la atención y convertir tareas manuales en sistemas más eficientes.',
    automation:'Podemos automatizar tareas repetitivas como formularios, seguimiento de clientes, notificaciones, solicitudes, reservas, organización de datos y procesos internos. Primero identificamos qué haces manualmente y diseñamos un flujo más simple y controlado.',
    ai:'Un asistente IA de DONBEX puede responder preguntas frecuentes, orientar clientes, recopilar información, clasificar solicitudes y derivar casos a una persona cuando sea necesario. Se diseña con información real de tu negocio y con respuestas alineadas a tus servicios.',
    web:'Una web DONBEX no se plantea solo como una página informativa. Podemos convertirla en una herramienta para captar solicitudes, organizar información, conectar formularios, automatizaciones, reservas, WhatsApp, correo u otros procesos de tu negocio.',
    products:'En “Nuestros productos” encontrarás soluciones propias de DONBEX. Actualmente está disponible el Reproductor PWA para Radio. Taxi Ride y Plataforma Web permanecen como próximos productos hasta su lanzamiento.',
    radio:'DONBEX Radio App crea un reproductor PWA profesional para radios online. Permite usar tu stream HTTPS, logo, identidad visual, redes sociales, enlace público y código QR, con una experiencia instalable en dispositivos compatibles. Puedes abrir la plataforma directamente desde “Nuestros productos”.',
    pricing:'Los proyectos personalizados se cotizan según lo que realmente necesite el negocio, para no cobrar funciones innecesarias. El Reproductor PWA para Radio está disponible desde $11.99 en pago único. Para una cotización de otro proyecto, puedo ayudarte a enviar tu solicitud.',
    support:'Si tu consulta necesita revisión humana, puedes enviarla directamente al soporte de DONBEX desde aquí. No necesitas abrir otra aplicación.'
   },
   en:{
    start:'Getting started is simple: tell us what your business does, what problem you want to solve, and what result you want. You do not need technical terms. DONBEX turns that need into a clear project and guides you to the next step.',
    solutions:'DONBEX builds digital solutions for businesses: process automation, AI assistants, smart websites, PWA, CRM, custom platforms and integrations. The goal is to simplify operations, improve customer service and turn manual tasks into more efficient systems.',
    automation:'We can automate repetitive work such as forms, customer follow-up, notifications, requests, bookings, data organization and internal processes. We first identify what you currently do manually and design a simpler, controlled workflow.',
    ai:'A DONBEX AI assistant can answer common questions, guide customers, collect information, classify requests and hand cases to a person when needed. It is designed around real information from your business and aligned with your services.',
    web:'A DONBEX website is not designed only as an informational page. We can turn it into a tool that captures requests, organizes information and connects forms, automation, bookings, WhatsApp, email or other business processes.',
    products:'Under “Our products” you will find DONBEX-built solutions. The PWA Radio Player is currently available. Taxi Ride and Web Platform remain upcoming products until launch.',
    radio:'DONBEX Radio App creates a professional PWA player for online radio stations. It can use your HTTPS stream, logo, visual identity, social links, public URL and QR code, with an installable experience on compatible devices. You can open it directly from “Our products”.',
    pricing:'Custom projects are quoted according to what the business actually needs, so you do not pay for unnecessary features. The PWA Radio Player is available from $11.99 as a one-time payment. I can help you send a request for any other project.',
    support:'If your request needs human review, you can send it directly to DONBEX support from here. You do not need to open another app.'
   }
  };
  if(lang==='en'){
    const chatEnglish={start:'How do I start my project?',solutions:'DONBEX solutions',automation:'Automation',ai:'AI Assistant / Chatbot',web:'Professional website',products:'Our products',radio:'Radio App',pricing:'Pricing & quote',support:'Talk to support'};
    Object.entries(chatEnglish).forEach(([k,v])=>{const b=$(`[data-chat-topic="${k}"]`);if(b)b.textContent=v});
    const ql=$('.chat-query-label'); if(ql) ql.textContent='YOU CAN ALSO ASK';
    if(chatInput) chatInput.placeholder='Type your question...';
  }else if(chatInput){chatInput.placeholder='Escribe tu pregunta...'}
  function addMsg(text,who='bot'){const d=document.createElement('div');d.className='msg '+who;d.textContent=text;msgs?.appendChild(d);if(msgs)msgs.scrollTop=msgs.scrollHeight;return d}
  function typingThen(text,cb){const d=document.createElement('div');d.className='msg bot typing';d.innerHTML='<i></i><i></i><i></i>';msgs?.appendChild(d);msgs.scrollTop=msgs.scrollHeight;setTimeout(()=>{d.remove();addMsg(text);cb?.()},560)}
  function hideSupportView(){
    chatPanel?.classList.remove('support-mode');
    if(supportView){supportView.classList.remove('show');supportView.setAttribute('aria-hidden','true');supportView.innerHTML=''}
  }
  function showSupportForm(){
    if(!supportView)return;
    chatPanel?.classList.add('support-mode');
    supportView.classList.add('show');
    supportView.setAttribute('aria-hidden','false');
    supportView.innerHTML=lang==='en'?`<div class="dbx-support-top">Talk to support</div><div class="dbx-support-note">If your request needs human review, send it directly to DONBEX support from here. No other app is required.</div><form id="chatSupportForm" class="dbx-support-form"><div class="dbx-support-row"><input name="name" required autocomplete="name" placeholder="Full name"><input name="email" type="email" required autocomplete="email" placeholder="Email"></div><input name="phone" autocomplete="tel" placeholder="Phone / WhatsApp (optional)"><textarea name="message" required placeholder="Write your request"></textarea><button type="submit" class="dbx-support-send">Send request</button><small class="dbx-support-status"></small></form>`:`<div class="dbx-support-top">Hablar con soporte</div><div class="dbx-support-note">Si tu consulta necesita revisión humana, envíala directamente al soporte de DONBEX desde aquí. No necesitas abrir otra aplicación.</div><form id="chatSupportForm" class="dbx-support-form"><div class="dbx-support-row"><input name="name" required autocomplete="name" placeholder="Nombre y apellido"><input name="email" type="email" required autocomplete="email" placeholder="Correo"></div><input name="phone" autocomplete="tel" placeholder="Teléfono / WhatsApp (opcional)"><textarea name="message" required placeholder="Escribe tu consulta"></textarea><button type="submit" class="dbx-support-send">Enviar consulta</button><small class="dbx-support-status"></small></form>`;
    const wrap=$('#chatSupportForm',supportView);
    wrap?.addEventListener('submit',async e=>{e.preventDefault();if(!wrap.reportValidity())return;const b=wrap.querySelector('.dbx-support-send'),st=wrap.querySelector('.dbx-support-status');b.disabled=true;st.textContent=lang==='en'?'Sending...':'Enviando...';try{const fd=new FormData(wrap);const r=await fetch('/api/donbex-support',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:'support',name:fd.get('name'),email:fd.get('email'),phone:fd.get('phone'),business:'',category:'Soporte general',message:fd.get('message'),language:lang})});const data=await r.json().catch(()=>({}));if(!r.ok)throw new Error(data.error||'send');hideSupportView();typingThen(lang==='en'?'Your request was sent successfully to DONBEX support. A specialist will contact you by email.':'Tu consulta fue enviada correctamente a soporte DONBEX. Un especialista se comunicará contigo por correo.');}catch(err){st.textContent=lang==='en'?'We could not send your request. Please try again.':'No pudimos enviar tu consulta. Inténtalo nuevamente.';b.disabled=false;}})
  }
  function topic(t){const text=answers[lang][t]||answers[lang].start;typingThen(text,()=>{if(t==='support')showSupportForm()})}
  $('#chatChips')?.addEventListener('click',e=>{const b=e.target.closest('[data-chat-topic]');if(!b)return;const t=b.dataset.chatTopic;if(t==='support'){showSupportForm();return}addMsg(b.textContent.trim(),'user');topic(t)});
  function freeReply(q){
    const x=q.toLowerCase();
    if(/support|soporte|ayuda|help|contact|humano|persona|especialista/.test(x))return ['support',answers[lang].support];
    if(/precio|precios|costo|cuanto|cuánto|cotiza|quote|price|cost/.test(x))return ['pricing',answers[lang].pricing];
    if(/radio|stream|emisora|reproductor/.test(x))return ['radio',answers[lang].radio];
    if(/chatbot|asistente|inteligencia artificial|\bia\b|\bai\b/.test(x))return ['ai',answers[lang].ai];
    if(/automat|proceso|tarea repet|workflow/.test(x))return ['automation',answers[lang].automation];
    if(/página|pagina|website|sitio web|web profesional/.test(x))return ['web',answers[lang].web];
    if(/producto|product|taxi|platform|plataforma/.test(x))return ['products',answers[lang].products];
    if(/crm|integr|pwa|venta|reserva/.test(x))return ['solutions',answers[lang].solutions];
    if(/empez|start|proyecto|project|idea|crear|negocio/.test(x))return ['start',answers[lang].start];
    return ['start',lang==='en'?'Tell me what you want to build or improve in your business. You can ask me about automation, AI assistants, websites, PWA, Radio App, pricing or project support.':'Cuéntame qué quieres crear o mejorar en tu negocio. Puedes preguntarme por automatización, asistentes IA, páginas web, PWA, Radio App, precios o cómo iniciar un proyecto.']
  }
  chatForm?.addEventListener('submit',e=>{e.preventDefault();const q=chatInput.value.trim();if(!q)return;hideSupportView();addMsg(q,'user');chatInput.value='';const [t,a]=freeReply(q);typingThen(a,()=>{if(t==='support')showSupportForm()})});
  projectForm?.addEventListener('submit',async e=>{e.preventDefault();if(!projectForm.reportValidity())return;const btn=projectForm.querySelector('.submit');btn.disabled=true;projectStatus.className='form-status';projectStatus.textContent=lang==='en'?'Sending your request securely...':'Enviando tu solicitud de forma segura...';const fd=new FormData(projectForm);const payload={type:'project',firstName:fd.get('nombre'),lastName:fd.get('apellido'),business:fd.get('negocio'),businessType:fd.get('tipo'),category:fd.get('servicio'),email:fd.get('correo'),message:fd.get('descripcion'),language:lang};try{const r=await fetch('/api/donbex-support',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const data=await r.json().catch(()=>({}));if(!r.ok)throw new Error(data.error||'send');projectForm.reset();projectStatus.classList.add('ok');projectStatus.textContent=lang==='en'?'Request sent. The DONBEX team will review it and contact you by email.':'Solicitud enviada. El equipo de DONBEX la revisará y te contactará por correo.';}catch(err){projectStatus.classList.add('error');projectStatus.textContent=lang==='en'?'We could not send your request. Please try again.':'No pudimos enviar tu solicitud. Inténtalo nuevamente.';}finally{btn.disabled=false;}});
  showView('home'); window.addEventListener('pageshow',()=>showView('home'));
})();
