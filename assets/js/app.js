(()=>{
  "use strict";
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const panels=$$('[data-view-panel]'), brand=$('#brandHome'), back=$('#backHome'), menuBtn=$('#menuBtn'), drawer=$('#drawer'), overlay=$('#overlay'), closeMenu=$('#closeMenu');
  const chatPeek=$('#chatPeek'), chatPanel=$('#chatPanel'), chatClose=$('#chatClose'), chatForm=$('#chatForm'), chatInput=$('#chatInput'), msgs=$('#msgs'), supportView=$('#supportView'), projectForm=$('#projectForm'), projectStatus=$('#projectStatus');
  const lang=(navigator.language||navigator.userLanguage||'es').toLowerCase().startsWith('en')?'en':'es'; document.documentElement.lang=lang;
  const en={
    homeKicker:'DIGITAL SYSTEMS FOR BUSINESS',homeTitle1:'Technology that',homeTitle2:'moves business forward.',homeIntro:'We build platforms, automation, PWA, websites and intelligent systems that simplify operations and turn complex workflows into easy-to-use experiences.',
    buildProject:'BUILD YOUR PROJECT',ourProducts:'OUR PRODUCTS',exploreSolutions:'EXPLORE SOLUTIONS',menuSolutions:'Solutions',menuProducts:'Products',menuAbout:'About us',menuPrivacy:'Privacy policy',backHome:'Back home',coreOnline:'● ONLINE',
    solAutomationLabel:'AUTOMATION',solAiLabel:'AI ASSISTANTS',solWebLabel:'SMART WEB',solPlatformLabel:'CUSTOM SYSTEMS',solPwaLabel:'MOBILE / PWA',solSalesLabel:'ONLINE SALES',solIntegrationsLabel:'INTEGRATIONS',
    solutionsKicker:'SOLUTIONS',solutionsTitleAccent:'DONBEX builds the solution.',solutionsIntro:'Explore what you want to improve. Open each solution to understand what it can do for your business, then tell us your idea when you are ready.',customKicker:'CUSTOM / TAILORED',customTitle:'Does your need fall outside these categories?',customText:'Use them as a reference. DONBEX also designs fully custom solutions around your operation, your team and the result you want to achieve.',customCta:'TELL US YOUR IDEA',
    sol1Title:'Process automation',sol1Text:'Reduce repetitive tasks and connect actions you currently perform manually.',sol1Cta:'I want to automate ↗',
    sol2Title:'Chatbots & AI assistants',sol2Text:'Answer questions, guide customers and capture information even when your team is unavailable.',sol2Cta:'I want an assistant ↗',
    sol3Title:'Automated websites',sol3Text:'Turn your website into a tool that captures requests, organizes data and triggers workflows.',sol3Cta:'I want a website ↗',
    sol4Title:'Business platforms',sol4Text:'Centralize customers, orders, bookings, roles and operations in a system built around your business.',sol4Cta:'I want a platform ↗',
    sol5Title:'Apps & PWA',sol5Text:'Create a fast, installable mobile experience without depending on an app store.',sol5Cta:'I want a PWA ↗',
    sol6Title:'Online sales & services',sol6Text:'Organize catalogs, orders, bookings, payments and follow-up in a simpler flow.',sol6Cta:'I want to sell online ↗',
    sol7Title:'CRM & internal management',sol7Text:'Organize customers, statuses, history and tasks so your team works with greater clarity.',sol7Cta:'I want to organize my business ↗',
    sol8Title:'Integrations',sol8Text:'Connect email, forms, APIs and tools that currently work separately.',sol8Cta:'I want to connect systems ↗',
    productWebName:'Web Platform',productRadioName:'PWA Radio Player',productTaxiSubtitle:'PLATFORM FOR DRIVERS AND TRANSPORTATION OPERATIONS',productWebSubtitle:'PLATFORM TO CREATE AND MANAGE BUSINESS WEB EXPERIENCES',productRadioSubtitle:'PWA PLAYER GENERATOR FOR ONLINE RADIO STATIONS',productTaxiText:'A platform designed to connect requests, passengers, drivers and operations in one unified digital experience.',productWebText:'A manageable web platform for businesses that need digital presence, management and connected processes in one environment.',productRadioText:'Create a professional Radio App PWA with HTTPS streaming, visual identity, public link, QR and an installable experience ready for your audience.',openPlatform:'Open platform',comingSoon:'COMING SOON',productsKicker:'DONBEX PRODUCTS',productsIntro:'Technology developed by DONBEX to solve real business needs. Explore our available products and upcoming launches.',
    projectKicker:'YOUR IDEA, TURNED INTO A SYSTEM',projectTitleAccent:'DONBEX turns the idea into a clear digital solution.',projectIntro:'You do not need to know code or use technical terms. Tell us how your business works, what you want to improve and the result you want. We structure the solution and show you the next step.',
    projectStep1Label:'01 · DISCOVER',projectStep1Title:'Your business',projectStep1Text:'We understand your real operation: what you do today, where time is lost and what result you want to achieve.',
    projectStep2Label:'02 · STRUCTURE',projectStep2Title:'The solution',projectStep2Text:'We organize the need and define what the solution should do, who will use it and which process it should improve.',
    projectStep3Label:'03 · DESIGN',projectStep3Title:'The experience',projectStep3Text:'We design a clear, fast and professional experience, connecting the flows and tools your business actually needs.',
    projectStep4Label:'04 · BUILD',projectStep4Title:'The next step',projectStep4Text:'We define the scope with you and the next step to turn the proposal into a system ready to be built.',
    firstName:'First name',lastName:'Last name',businessName:'Business / company name',businessType:'Business / company type',whatNeed:'What do you need?',email:'Email',describeProject:'Describe your project, need or idea',selectCategory:'Select a category',optAutomation:'Automation',optChatbot:'Chatbot / AI',optWebsite:'Website',optPlatform:'Platform',optPwa:'App / PWA',optCrm:'CRM',optIntegrations:'Integrations',optOther:'Other',sendRequest:'Send request',personalAttention:'PERSONAL ATTENTION',specialistTitle:'Would you rather talk to a DONBEX specialist?',specialistText:'Leave us your details. If your project needs it, we can coordinate a call.',
    aboutThinkLabel:'HOW WE THINK',aboutBuildLabel:'WHAT WE BUILD',aboutWhoLabel:'WHO IT IS FOR',drawerTagline:'Technology that moves business forward.',virtualAssistant:'Virtual Assistant',supportAvailable:'Support available',chatWelcome:'Hi. I am the DONBEX virtual assistant. I can guide you through our products, solutions and how to start your project. How can I help you today?',chipStart:'How do I start my project?',chipSolutions:'What can DONBEX do?',chipProducts:'Our products',chipRadio:'Radio App',chipSupport:'Talk to support'
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
  let currentView='home', previousView='home', activeSolution='automation';
  function showView(name='home'){
    previousView=currentView; currentView=name;
    panels.forEach(p=>p.classList.toggle('active',p.dataset.viewPanel===name));
    brand?.classList.toggle('hidden',name!=='home');back?.classList.toggle('hidden',name==='home'||name==='solution-detail');
    closeDrawer(); window.scrollTo({top:0,behavior:'smooth'});
  }
  menuBtn?.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();drawer?.classList.contains('open')?closeDrawer():openDrawer()}); overlay?.addEventListener('click',closeDrawer); closeMenu?.addEventListener('click',closeDrawer); brand?.addEventListener('click',()=>showView('home')); back?.addEventListener('click',()=>showView('home'));
  document.addEventListener('click',e=>{const t=e.target.closest('[data-view]');if(!t)return;e.preventDefault();const cat=t.dataset.projectCategory;if(cat){const sel=$('#projectForm select[name="servicio"]');if(sel)sel.value=(lang==='en'&&cat==='Otro')?'Other':cat}showView(t.dataset.view)});

  const solutionData={
    es:{
      automation:{kicker:'AUTOMATIZACIÓN DE PROCESOS',title:'Haz que las tareas repetitivas avancen sin depender de trabajo manual.',lead:'La automatización conecta acciones, datos y avisos para que los procesos cotidianos se ejecuten de forma ordenada y con menos intervención.',copy:'Podemos analizar formularios, seguimiento de clientes, reservas, notificaciones, clasificación de solicitudes, actualización de estados y otras tareas que hoy consumen tiempo. La meta no es automatizar por automatizar: es eliminar pasos innecesarios y dejar a tu equipo concentrado en lo que realmente requiere criterio humano.',bullets:['Menos tareas repetitivas y menos errores manuales','Seguimiento automático de solicitudes y clientes','Procesos conectados entre formularios, correo y sistemas','Mayor velocidad y trazabilidad en la operación'],outcome:'Un flujo de trabajo más simple, controlado y capaz de avanzar incluso cuando nadie está pendiente de cada paso.',category:'Automatización'},
      ai:{kicker:'CHATBOTS & ASISTENTES IA',title:'Un asistente que atiende, orienta y recopila información mientras tu equipo se ocupa del negocio.',lead:'Un agente de IA bien configurado puede responder 24/7 con información real de tu empresa, guiar al cliente y escalar a una persona cuando sea necesario.',copy:'Diseñamos asistentes alrededor de tus servicios, políticas, horarios, preguntas frecuentes y procesos. Pueden explicar, filtrar solicitudes, pedir datos, orientar una compra, ayudar a reservar o preparar la conversación antes de que intervenga tu equipo. La experiencia debe sentirse útil y natural, no como un menú rígido de respuestas.',bullets:['Atención inicial disponible 24/7','Respuestas alineadas con tu negocio y tus servicios','Captura ordenada de datos y necesidades del cliente','Escalamiento a soporte humano cuando corresponde'],outcome:'Una atención más rápida y consistente, sin obligar a tu equipo a responder una y otra vez las mismas consultas.',category:'Chatbot / IA'},
      web:{kicker:'WEB AUTOMATIZADA',title:'Tu página web puede hacer mucho más que mostrar información.',lead:'Una web moderna puede recibir consultas, organizar datos, orientar al visitante, activar procesos y convertirse en una herramienta real de atención o venta.',copy:'Diseñamos sitios que combinan presencia profesional con funciones útiles: formularios inteligentes, asistentes, reservas, solicitudes, catálogos, notificaciones, seguimiento e integraciones. El objetivo es que tu web trabaje contigo y no sea solamente una vitrina estática.',bullets:['Experiencia profesional adaptada a móvil y escritorio','Formularios y consultas conectadas a tu operación','Chat o asistente integrado cuando el proyecto lo requiere','Automatizaciones, reservas o procesos en la misma experiencia'],outcome:'Una presencia digital que informa, atiende y convierte acciones del visitante en procesos útiles para tu negocio.',category:'Página web'},
      platform:{kicker:'PLATAFORMAS PARA NEGOCIOS',title:'Centraliza la operación de tu negocio en un sistema creado alrededor de cómo realmente trabajas.',lead:'Cuando varias tareas viven en hojas, mensajes y herramientas separadas, una plataforma a medida puede unirlas en un solo flujo.',copy:'Podemos construir paneles para clientes, empleados o administradores; gestión de solicitudes, reservas, pedidos, usuarios, roles, estados, documentos y operaciones internas. No partimos de una plantilla genérica: primero entendemos tu proceso y luego diseñamos la plataforma alrededor de él.',bullets:['Clientes, usuarios y roles organizados','Paneles y procesos adaptados a tu operación','Estados, solicitudes y seguimiento en un mismo entorno','Base preparada para crecer con nuevas funciones'],outcome:'Una operación centralizada, más visible y fácil de administrar, sin depender de herramientas desconectadas.',category:'Plataforma'},
      pwa:{kicker:'APPS & PWA',title:'Una experiencia instalable que funciona en distintos dispositivos sin depender de una tienda de aplicaciones.',lead:'Las PWA combinan la facilidad de una web con una experiencia similar a una app: se abren desde un enlace y, en dispositivos compatibles, pueden instalarse.',copy:'Podemos crear una sola experiencia responsiva para iPhone, Android, tablets y computadoras. El cliente puede llegar mediante un enlace o código QR, abrir la plataforma desde el navegador y agregarla a su dispositivo cuando el sistema lo permita. Es una forma práctica de poner tu servicio directamente en las manos de tu audiencia.',bullets:['Una misma experiencia para múltiples dispositivos','Acceso mediante enlace público o código QR','Instalación en dispositivos compatibles','Actualizaciones centralizadas sin publicar una app nueva cada vez'],outcome:'Tu negocio a un toque de distancia, con acceso rápido y una experiencia diseñada para sentirse como producto digital propio.',category:'App / PWA'},
      sales:{kicker:'VENTAS & SERVICIOS ONLINE',title:'Organiza productos, servicios, pedidos y pagos en una experiencia clara para el cliente.',lead:'Vender online no es solo poner productos en una pantalla: el recorrido debe ayudar a encontrar, elegir, solicitar o pagar sin fricción.',copy:'Podemos estructurar catálogos por categorías, fichas de productos o servicios, pedidos, reservas, pagos en línea, confirmaciones y seguimiento. Todo puede diseñarse alrededor del tipo de negocio y conectarse con procesos internos para reducir mensajes dispersos y trabajo manual.',bullets:['Catálogos y servicios organizados por categorías','Pedidos, reservas o solicitudes en un flujo claro','Integración de pagos cuando el proyecto lo requiere','Confirmaciones y seguimiento para cliente y negocio'],outcome:'Una experiencia de compra o contratación más ordenada, profesional y fácil de administrar.',category:'Plataforma'},
      crm:{kicker:'CRM & GESTIÓN INTERNA',title:'Convierte clientes, seguimientos y tareas dispersas en una operación organizada.',lead:'Un CRM debe ayudarte a saber quién es cada cliente, qué necesita, en qué estado está y qué debe hacer tu equipo después.',copy:'Diseñamos sistemas internos para registrar clientes, historial, solicitudes, tareas, responsables, estados, recordatorios y datos relevantes. La estructura se adapta al proceso real de tu negocio para que el equipo tenga información útil y no un sistema lleno de campos que nadie utiliza.',bullets:['Historial y datos del cliente centralizados','Estados y seguimientos claros','Tareas y responsabilidades mejor organizadas','Información útil para tomar decisiones y dar continuidad'],outcome:'Más control sobre cada cliente y cada proceso, con menos información perdida entre mensajes, notas y hojas separadas.',category:'CRM'},
      integrations:{kicker:'INTEGRACIONES',title:'Haz que las herramientas que ya utilizas dejen de trabajar aisladas.',lead:'Correo, formularios, APIs, bases de datos y plataformas pueden conectarse para que la información avance entre sistemas sin repetir trabajo.',copy:'Analizamos qué herramientas utilizas y qué información necesita pasar de una a otra. Podemos conectar servicios mediante APIs, webhooks y automatizaciones para registrar datos, disparar notificaciones, actualizar estados o iniciar acciones cuando ocurre un evento.',bullets:['Menos duplicación de datos y trabajo manual','Información sincronizada entre herramientas','Acciones automáticas a partir de eventos reales','Procesos más continuos entre sistemas existentes'],outcome:'Un ecosistema digital conectado donde las herramientas colaboran en lugar de obligarte a mover información manualmente.',category:'Integraciones'}
    },
    en:{
      automation:{kicker:'PROCESS AUTOMATION',title:'Let repetitive work move forward without depending on manual follow-up.',lead:'Automation connects actions, data and notifications so everyday workflows run in an organized way with less intervention.',copy:'We can analyze forms, customer follow-up, bookings, notifications, request classification, status updates and other tasks that consume time today. The goal is not automation for its own sake; it is to remove unnecessary steps and let your team focus on work that truly requires human judgment.',bullets:['Fewer repetitive tasks and manual errors','Automatic customer and request follow-up','Connected forms, email and business systems','Faster, more traceable operations'],outcome:'A simpler and more controlled workflow that can keep moving without someone watching every step.',category:'Automation'},
      ai:{kicker:'CHATBOTS & AI ASSISTANTS',title:'An assistant that answers, guides and collects information while your team runs the business.',lead:'A properly configured AI agent can respond 24/7 using real business information, guide customers and escalate to a person when needed.',copy:'We design assistants around your services, policies, hours, FAQs and workflows. They can explain, qualify requests, collect data, guide a purchase, help with bookings or prepare a conversation before your team steps in.',bullets:['24/7 initial assistance','Answers aligned with your business','Structured collection of customer information','Human support escalation when needed'],outcome:'Faster, more consistent service without forcing your team to answer the same questions repeatedly.',category:'Chatbot / AI'},
      web:{kicker:'AUTOMATED WEB',title:'Your website can do much more than display information.',lead:'A modern website can receive inquiries, organize data, guide visitors, trigger workflows and become a real service or sales tool.',copy:'We design sites that combine professional presence with useful functions: smart forms, assistants, bookings, requests, catalogs, notifications, follow-up and integrations.',bullets:['Professional mobile and desktop experience','Forms and inquiries connected to operations','Integrated chat or assistant when needed','Automation, bookings and workflows in one experience'],outcome:'A digital presence that informs, serves and turns visitor actions into useful business processes.',category:'Website'},
      platform:{kicker:'BUSINESS PLATFORMS',title:'Centralize business operations in a system built around how you actually work.',lead:'When tasks live across spreadsheets, messages and separate tools, a custom platform can bring them into one workflow.',copy:'We can build customer, employee and admin panels; requests, bookings, orders, users, roles, statuses, documents and internal operations. We start from your process, not from a generic template.',bullets:['Organized customers, users and roles','Panels adapted to your operation','Requests and status tracking in one place','A foundation ready to grow'],outcome:'A centralized operation that is easier to see, manage and expand.',category:'Platform'},
      pwa:{kicker:'APPS & PWA',title:'An installable experience across devices without depending on an app store.',lead:'PWAs combine the reach of the web with an app-like experience: they open from a link and can be installed on compatible devices.',copy:'We can create one responsive experience for iPhone, Android, tablets and computers. Customers can arrive through a link or QR code, open it in the browser and add it to their device when supported.',bullets:['One experience across multiple devices','Access through a public link or QR','Installable on compatible devices','Centralized updates without republishing an app'],outcome:'Your business one tap away, with fast access and a digital-product experience of its own.',category:'App / PWA'},
      sales:{kicker:'ONLINE SALES & SERVICES',title:'Organize products, services, orders and payments in a clear customer experience.',lead:'Selling online is not just displaying products; the journey should make it easy to find, choose, request or pay.',copy:'We can structure catalogs by category, product or service pages, orders, bookings, online payments, confirmations and tracking, all around the way your business operates.',bullets:['Organized product and service catalogs','Clear order, booking or request flows','Payment integrations when required','Confirmations and tracking'],outcome:'A more organized, professional sales or service experience that is easier to manage.',category:'Platform'},
      crm:{kicker:'CRM & INTERNAL MANAGEMENT',title:'Turn scattered customer follow-up and tasks into an organized operation.',lead:'A CRM should tell you who each customer is, what they need, where they are in the process and what your team needs to do next.',copy:'We design internal systems for customer records, history, requests, tasks, owners, statuses, reminders and relevant business data.',bullets:['Centralized customer history and information','Clear statuses and follow-up','Better organized tasks and ownership','Useful information for continuity and decisions'],outcome:'More control over customers and processes with less information lost across messages and notes.',category:'CRM'},
      integrations:{kicker:'INTEGRATIONS',title:'Make the tools you already use stop working in isolation.',lead:'Email, forms, APIs, databases and platforms can be connected so information moves between systems without repeated manual work.',copy:'We analyze your current tools and what information needs to move between them, then connect services through APIs, webhooks and automation.',bullets:['Less duplicated data and manual work','Information synchronized between tools','Automatic actions triggered by real events','More continuous workflows across systems'],outcome:'A connected digital ecosystem where tools collaborate instead of forcing you to move information manually.',category:'Integrations'}
    }
  };
  function openSolution(key){activeSolution=key;const d=solutionData[lang][key]||solutionData[lang].automation;$('#solutionDetailKicker').textContent=d.kicker;$('#solutionDetailTitle').textContent=d.title;$('#solutionDetailLead').textContent=d.lead;$('#solutionDetailCopy').textContent=d.copy;$('#solutionDetailOutcome').textContent=d.outcome;$('#solutionDetailOutcomeTitle').textContent=lang==='en'?'What can your business achieve?':'¿Qué puede lograr tu negocio?';$('#solutionCoreLabel').textContent=lang==='en'?'DONBEX / SOLUTION CORE':'DONBEX / NÚCLEO DE SOLUCIÓN';$('#solutionReadyLabel').textContent=lang==='en'?'READY TO DESIGN':'LISTO PARA DISEÑAR';$('#solutionFocusLabel').textContent=lang==='en'?'FOCUS':'ENFOQUE';$('#solutionDetailBullets').innerHTML=d.bullets.map(x=>`<li>${x}</li>`).join('');$('#solutionBack span').textContent=lang==='en'?'BACK TO SOLUTIONS':'VOLVER A SOLUCIONES';$('#solutionDetailCta').textContent=lang==='en'?'BUILD THIS SOLUTION':'QUIERO CREAR ESTA SOLUCIÓN';showView('solution-detail')}
  document.addEventListener('click',e=>{const t=e.target.closest('[data-solution]');if(t){e.preventDefault();openSolution(t.dataset.solution)}});
  $('#solutionBack')?.addEventListener('click',()=>showView('solutions'));
  $('#solutionDetailCta')?.addEventListener('click',()=>{const d=solutionData[lang][activeSolution];showView('project');setTimeout(()=>{const sel=$('#projectForm select[name="servicio"]');if(sel)sel.value=d.category;$('#projectForm')?.scrollIntoView({behavior:'smooth',block:'start'})},120)});

  function toggleChat(force){
    if(!chatPanel)return;
    const open=typeof force==='boolean'?force:!chatPanel.classList.contains('open');
    chatPanel.classList.toggle('open',open);
    chatPanel.setAttribute('aria-hidden',open?'false':'true');
    chatPeek?.classList.toggle('chat-hidden',open);
    if(open){
      ensureQuickPanel();
      requestAnimationFrame(()=>chatPanel.classList.add('chat-ready'));
      if(!matchMedia('(max-width:680px)').matches)setTimeout(()=>chatInput?.focus({preventScroll:true}),260);
    }else{
      chatPanel.classList.remove('chat-ready');
    }
  }
  chatPeek?.addEventListener('click',()=>toggleChat());
  chatClose?.addEventListener('click',()=>toggleChat(false));

  const answers={
    es:{
      start:'Empezar es sencillo. Cuéntame qué hace tu negocio, qué quieres mejorar y qué resultado te gustaría conseguir. No necesitas términos técnicos: con esa información puedo orientarte hacia la solución DONBEX más adecuada.',
      solutions:'DONBEX diseña automatizaciones, asistentes IA, webs automatizadas, plataformas para negocios, PWA, ventas online, CRM e integraciones. Puedes abrir “Explorar soluciones” para ver cada opción explicada de forma individual.',
      automation:'La automatización elimina pasos repetitivos y conecta acciones que hoy dependen de trabajo manual. Podemos automatizar formularios, seguimiento, avisos, reservas, estados y otros procesos para que avancen de forma ordenada.',
      ai:'Un asistente IA de DONBEX puede atender 24/7, responder con información real de tu negocio, orientar clientes, recopilar datos y pasar la conversación a una persona cuando sea necesario.',
      web:'Una web DONBEX no tiene que ser una simple vitrina. Puede informar, recibir consultas, organizar datos, vender, reservar, activar procesos y trabajar con un asistente automatizado dentro de la misma experiencia.',
      products:'En “Nuestros productos” encontrarás tecnología creada por DONBEX. Actualmente está disponible Radio App, nuestro reproductor PWA para radios online. Taxi Ride y Plataforma Web aparecen como próximos lanzamientos.',
      radio:'DONBEX Radio App permite crear un reproductor PWA profesional para radio online con streaming HTTPS, identidad visual, redes, enlace público, QR y experiencia instalable. Puedes abrirlo desde “Nuestros productos”.',
      pricing:'Los proyectos personalizados se cotizan según el alcance real. Radio App está disponible desde $11.99 en pago único. Si me cuentas qué necesitas, puedo orientarte o ayudarte a enviar una solicitud.',
      support:'Perfecto. Te muestro aquí mismo el formulario de soporte para que dejes tus datos y tu consulta al equipo DONBEX.'
    },
    en:{
      start:'Getting started is simple. Tell me what your business does, what you want to improve and the result you want. You do not need technical terms; I can guide you toward the most suitable DONBEX solution.',
      solutions:'DONBEX designs automation, AI assistants, automated websites, business platforms, PWA, online sales, CRM and integrations. Open “Explore solutions” to see each option explained individually.',
      automation:'Automation removes repetitive steps and connects actions that currently depend on manual work. We can automate forms, follow-up, notifications, bookings, statuses and other workflows.',
      ai:'A DONBEX AI assistant can help 24/7, answer using real business information, guide customers, collect data and hand the conversation to a person when needed.',
      web:'A DONBEX website does not have to be a simple showcase. It can inform, receive inquiries, organize data, sell, book, trigger processes and include an automated assistant in the same experience.',
      products:'Under “Our products” you will find technology created by DONBEX. Radio App, our PWA player for online radio, is currently available. Taxi Ride and Web Platform are upcoming products.',
      radio:'DONBEX Radio App creates a professional PWA player for online radio with HTTPS streaming, visual identity, social links, public URL, QR and an installable experience. Open it from “Our products”.',
      pricing:'Custom projects are quoted based on the real scope. Radio App starts at $11.99 as a one-time payment. Tell me what you need and I can guide you or help you send a request.',
      support:'Perfect. I will show the support form right here so you can leave your details and request for the DONBEX team.'
    }
  };

  const quickLabels=lang==='en'
    ?{start:'How do I start my project?',solutions:'DONBEX solutions',automation:'Automation',ai:'AI assistant / Chatbot',web:'Professional website',products:'Our products',radio:'Radio App',pricing:'Pricing & quote',support:'Talk to support'}
    :{start:'¿Cómo empiezo mi proyecto?',solutions:'Soluciones DONBEX',automation:'Automatización',ai:'Asistente IA / Chatbot',web:'Página web profesional',products:'Nuestros productos',radio:'Radio App',pricing:'Precios y cotización',support:'Hablar con soporte'};

  function quickHtml(){
    return `<div class="chat-query-block"><div class="chat-query-label">${lang==='en'?'YOU CAN ALSO ASK':'TAMBIÉN PUEDES CONSULTAR'}</div><div class="chat-chips">${['start','solutions','automation','ai','web','products','radio','pricing'].map(k=>`<button data-chat-topic="${k}" type="button">${quickLabels[k]}</button>`).join('')}<button class="support-chip" data-chat-topic="support" type="button">${quickLabels.support}</button></div></div>`;
  }

  function ensureQuickPanel(){
    if(!msgs)return null;
    // Remove the old unwrapped quick controls from previous versions.
    [...msgs.children].forEach(el=>{
      if(el.classList?.contains('chat-query-label')||el.id==='chatChips')el.remove();
    });
    let block=msgs.querySelector('.chat-query-block');
    if(!block){
      const wrap=document.createElement('div');
      wrap.innerHTML=quickHtml();
      block=wrap.firstElementChild;
    }
    const welcome=msgs.querySelector('.msg.welcome');
    if(welcome){
      if(welcome.nextElementSibling!==block)welcome.insertAdjacentElement('afterend',block);
    }else if(msgs.firstElementChild!==block){
      msgs.prepend(block);
    }
    return block;
  }

  if(chatInput)chatInput.placeholder=lang==='en'?'Type your question...':'Escribe tu pregunta...';

  function pruneChat(){
    if(!msgs)return;
    const nodes=[...msgs.querySelectorAll('.msg:not(.welcome):not(.typing)')];
    while(nodes.length>4)nodes.shift().remove();
    const forms=[...msgs.querySelectorAll('#chatSupportForm')];
    while(forms.length>1)forms.shift().remove();
  }

  function scrollChatTo(el){
    if(!msgs||!el)return;
    requestAnimationFrame(()=>{
      const top=Math.max(0,el.offsetTop-msgs.clientHeight+Math.min(el.offsetHeight+20,msgs.clientHeight*.78));
      msgs.scrollTo({top,behavior:'smooth'});
    });
  }

  function addMsg(text,who='bot'){
    if(!msgs)return null;
    ensureQuickPanel();
    const d=document.createElement('div');
    d.className='msg '+who;
    d.textContent=text;
    msgs.appendChild(d);
    pruneChat();
    scrollChatTo(d);
    return d;
  }

  let typingTimer=null;
  function typingThen(text,cb,opts={}){
    if(!msgs)return;
    ensureQuickPanel();
    msgs.querySelectorAll('.typing').forEach(x=>x.remove());
    if(typingTimer)clearTimeout(typingTimer);
    const d=document.createElement('div');
    d.className='msg bot typing';
    d.setAttribute('aria-label',lang==='en'?'Assistant is typing':'El asistente está escribiendo');
    d.innerHTML='<i></i><i></i><i></i>';
    msgs.appendChild(d);
    scrollChatTo(d);
    typingTimer=setTimeout(()=>{
      d.remove();
      const response=text?addMsg(text):null;
      cb?.(response);
      typingTimer=null;
    },opts.delay||2300);
  }

  function supportCard(){
    const copy=lang==='en'
      ?{title:'DONBEX SUPPORT',text:'Leave your details and request. The message will be sent directly to the DONBEX support team.',name:'Full name',email:'Email',phone:'Phone / WhatsApp (optional)',message:'Write your request',send:'Send request'}
      :{title:'SOPORTE DONBEX',text:'Déjanos tus datos y tu consulta. El mensaje se enviará directamente al equipo de soporte DONBEX.',name:'Nombre y apellido',email:'Correo',phone:'Teléfono / WhatsApp (opcional)',message:'Escribe tu consulta',send:'Enviar consulta'};
    return `<form id="chatSupportForm" class="support-contact-card" novalidate><div class="support-section-title">${copy.title}</div><p>${copy.text}</p><div class="support-contact-grid"><input name="name" required autocomplete="name" inputmode="text" placeholder="${copy.name}"><input name="email" type="email" required autocomplete="email" inputmode="email" placeholder="${copy.email}"><input class="full" name="phone" autocomplete="tel" inputmode="tel" placeholder="${copy.phone}"><textarea class="full" name="message" required rows="4" placeholder="${copy.message}"></textarea><input name="company" tabindex="-1" autocomplete="off" class="hp" aria-hidden="true"></div><button class="support-contact-submit" type="submit">${copy.send}</button><small class="support-contact-status" role="status" aria-live="polite"></small></form>`;
  }

  function showSupportForm(){
    if(!supportView||!chatPanel)return;
    chatPanel.classList.add('support-mode');
    supportView.classList.add('show');
    supportView.setAttribute('aria-hidden','false');
    const f=supportView.querySelector('#chatSupportFormStatic');
    if(f&&!f.dataset.bound){f.addEventListener('submit',submitSupportStatic);f.dataset.bound='1'}
    requestAnimationFrame(()=>supportView.scrollTo({top:0,behavior:'smooth'}));
  }

  function closeSupportForm(){
    chatPanel?.classList.remove('support-mode');
    supportView?.classList.remove('show');
    supportView?.setAttribute('aria-hidden','true');
  }

  async function postSupport(payload){
    const ctrl=new AbortController();
    const timer=setTimeout(()=>ctrl.abort(),15000);
    try{
      const r=await fetch('/api/donbex-support',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:ctrl.signal});
      const data=await r.json().catch(()=>({}));
      if(!r.ok||!data.ok){const err=new Error(data.error||`http_${r.status}`);err.code=data.error;err.details=data;throw err}
      return data;
    }finally{clearTimeout(timer)}
  }

  async function submitSupport(e){
    e.preventDefault();
    const form=e.currentTarget;
    if(!form.reportValidity())return;
    const b=form.querySelector('.support-contact-submit'),st=form.querySelector('.support-contact-status');
    b.disabled=true;
    st.className='support-contact-status';
    st.textContent=lang==='en'?'Sending securely…':'Enviando de forma segura…';
    try{
      const fd=new FormData(form);
      await postSupport({type:'support',name:fd.get('name'),email:fd.get('email'),phone:fd.get('phone'),message:fd.get('message'),language:lang,page:location.href});
      st.classList.add('ok');
      st.textContent=lang==='en'?'Request sent successfully. We will reply by email.':'Consulta enviada correctamente. Te responderemos por correo.';
      b.textContent=lang==='en'?'Sent ✓':'Enviado ✓';
      form.querySelector('textarea').value='';
    }catch(err){
      console.error('DONBEX support send',err,err.details||'');
      st.classList.add('err');
      const cfg=err.code==='email_not_configured';
      st.textContent=cfg
        ?(lang==='en'?'Email delivery still needs to be connected in Vercel.':'El envío de correo todavía necesita conectarse en Vercel.')
        :(lang==='en'?'We could not send it right now. Please try again.':'No pudimos enviarla en este momento. Inténtalo nuevamente.');
      b.disabled=false;
    }
  }

  async function submitSupportStatic(e){
    e.preventDefault();
    const form=e.currentTarget;if(!form.reportValidity())return;
    const b=form.querySelector('.dbx-support-send'),st=form.querySelector('.dbx-support-status');
    b.disabled=true;st.textContent=lang==='en'?'Sending securely…':'Enviando de forma segura…';
    try{
      const fd=new FormData(form);
      await postSupport({type:'support',name:fd.get('name'),email:fd.get('email'),phone:fd.get('phone'),message:fd.get('message'),language:lang,page:location.href});
      form.reset();
      closeSupportForm();
      ensureQuickPanel();
      addMsg(lang==='en'?'Thank you. Your message was sent successfully. A DONBEX advisor will contact you very soon.':'Gracias por enviar tu mensaje. Tu consulta fue enviada correctamente y un asesor de DONBEX se comunicará contigo muy pronto.','bot');
    }
    catch(err){console.error('DONBEX support send',err,err.details||'');st.textContent=err.code==='email_not_configured'?(lang==='en'?'Email delivery still needs to be connected in Vercel.':'El envío de correo todavía necesita conectarse en Vercel.'):(lang==='en'?'We could not send it right now. Please try again.':'No pudimos enviarla en este momento. Inténtalo nuevamente.');st.style.color='#ff9da9';b.disabled=false;}
  }

  function topic(t){
    const text=answers[lang][t]||answers[lang].start;
    typingThen(text,()=>{if(t==='support')showSupportForm()},{delay:t==='support'?2350:2200});
  }

  msgs?.addEventListener('click',e=>{
    const b=e.target.closest('[data-chat-topic]');
    if(!b)return;
    const t=b.dataset.chatTopic;
    addMsg(b.textContent.trim(),'user');
    topic(t);
  });

  function greetingReply(q){
    const x=q.toLowerCase().trim();
    if(/^(hola|hello|hi|hey)\b/.test(x))return lang==='en'?'Hi! How are you? Tell me what you would like to create, improve or learn about DONBEX and I will be happy to guide you.':'¡Hola! ¿Cómo estás? Cuéntame qué quieres crear, mejorar o conocer de DONBEX y con gusto te oriento.';
    if(/buenos? días|buen día|good morning/.test(x))return lang==='en'?'Good morning! How are you? Tell me what you need and I will gladly guide you through DONBEX solutions, products or your project.':'¡Buenos días! ¿Cómo estás? Cuéntame en qué te puedo ayudar con tu proyecto, tu negocio o alguna solución DONBEX.';
    if(/buenas tardes|good afternoon/.test(x))return lang==='en'?'Good afternoon! How are you? Tell me what you need and I will gladly guide you.':'¡Buenas tardes! ¿Cómo estás? Cuéntame qué necesitas y con gusto te oriento sobre las soluciones y productos DONBEX.';
    if(/buenas noches|good evening|good night/.test(x))return lang==='en'?'Good evening! How are you? Tell me what you need and I will help you find the right DONBEX option.':'¡Buenas noches! ¿Cómo estás? Cuéntame qué necesitas y con gusto te ayudo a encontrar la mejor opción dentro de DONBEX.';
    if(/gracias|muchas gracias|thank you|thanks/.test(x))return lang==='en'?'You are very welcome. I am here whenever you need me. You can keep asking about a solution, product, pricing or your project.':'¡Con mucho gusto! Estoy aquí para ayudarte. Puedes seguir preguntándome sobre una solución, un producto, precios o tu proyecto.';
    if(/adiós|adios|hasta luego|nos vemos|bye|goodbye/.test(x))return lang==='en'?'See you soon! Whenever you need DONBEX, I will be here to help.':'¡Hasta pronto! Cuando necesites a DONBEX, aquí estaré para ayudarte.';
    return null;
  }

  function freeReply(q){
    const greet=greetingReply(q);if(greet)return ['greeting',greet];
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
    return ['start',lang==='en'?'Tell me a little more about what you need. I can guide you through automation, AI assistants, websites, platforms, PWA, Radio App, pricing or how to start a project.':'Cuéntame un poco más sobre lo que necesitas. Puedo orientarte sobre automatización, asistentes IA, webs, plataformas, PWA, Radio App, precios o cómo iniciar un proyecto.'];
  }

  chatForm?.addEventListener('submit',e=>{
    e.preventDefault();
    const q=chatInput.value.trim();
    if(!q)return;
    addMsg(q,'user');
    chatInput.value='';
    const [t,a]=freeReply(q);
    typingThen(a,()=>{if(t==='support')showSupportForm()},{delay:t==='support'?2350:2200});
  });

  projectForm?.addEventListener('submit',async e=>{e.preventDefault();if(!projectForm.reportValidity())return;const btn=projectForm.querySelector('.submit');btn.disabled=true;projectStatus.className='form-status';projectStatus.textContent=lang==='en'?'Sending your request securely...':'Enviando tu solicitud de forma segura...';const fd=new FormData(projectForm);const payload={type:'project',firstName:fd.get('nombre'),lastName:fd.get('apellido'),business:fd.get('negocio'),businessType:fd.get('tipo'),category:fd.get('servicio'),email:fd.get('correo'),message:fd.get('descripcion'),language:lang,page:location.href};try{await postSupport(payload);projectForm.reset();projectStatus.classList.add('ok');projectStatus.textContent=lang==='en'?'Request sent. The DONBEX team will review it and contact you by email.':'Solicitud enviada. El equipo de DONBEX la revisará y te contactará por correo.';}catch(err){console.error('DONBEX project send',err);projectStatus.classList.add('error');projectStatus.textContent=err.code==='email_not_configured'?(lang==='en'?'Email service is not configured in this Vercel project.':'El servicio de correo no está configurado en este proyecto de Vercel.'):(lang==='en'?'We could not send your request right now. Please try again.':'No pudimos enviar tu solicitud en este momento. Inténtalo nuevamente.');}finally{btn.disabled=false;}});
  ensureQuickPanel(); showView('home'); window.addEventListener('pageshow',()=>showView('home'));

})();
