
(()=>{
  "use strict";

  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));

  const panels=$$('[data-view-panel]');
  const brand=$('#brandHome');
  const back=$('#backHome');
  const menuBtn=$('#menuBtn');
  const drawer=$('#drawer');
  const overlay=$('#overlay');       // ACTUAL V14 HTML id
  const closeMenu=$('#closeMenu');

  const chatPeek=$('#chatPeek');
  const chatPanel=$('#chatPanel');
  const chatClose=$('#chatClose');
  const chatForm=$('#chatForm');
  const chatInput=$('#chatInput');
  const msgs=$('#msgs');             // ACTUAL V14 HTML id
  const projectForm=$('#projectForm');

  const translations={
    en:{
      homeKicker:'DIGITAL SYSTEMS FOR BUSINESS',
      homeTitle1:'Technology that',
      homeTitle2:'moves business forward.',
      homeIntro:'We build platforms, automation, PWA, websites and intelligent systems that simplify operations and turn complex workflows into easy-to-use experiences.',
      buildProject:'Build your project',
      exploreSolutions:'Explore solutions',
      menuSolutions:'Solutions',
      menuProducts:'Products',
      menuAbout:'About us',
      menuPrivacy:'Privacy policy',
      backHome:'Back home',
      solAutomationLabel:'AUTOMATION',
      solAiLabel:'AI ASSISTANTS',
      solWebLabel:'SMART WEB',
      solPlatformLabel:'CUSTOM SYSTEMS',
      solPwaLabel:'MOBILE / PWA',
      solSalesLabel:'ONLINE SALES',
      solIntegrationsLabel:'INTEGRATIONS',
      productWebName:'Web Platform',
      productRadioName:'PWA Radio Player',
      productTaxiSubtitle:'PLATFORM FOR DRIVERS AND TRANSPORTATION OPERATIONS',
      productWebSubtitle:'PLATFORM TO CREATE AND MANAGE BUSINESS WEB EXPERIENCES',
      productRadioSubtitle:'PWA PLAYER GENERATOR FOR ONLINE RADIO STATIONS',
      productTaxiText:'Requests, passenger experience, driver management and operational tools.',
      productWebText:'A manageable, scalable digital presence prepared to grow with the business.',
      productRadioText:'Add a streaming URL, logo and branding to generate an installable experience ready to share.',
      openPlatform:'Open platform',
      aboutThinkLabel:'HOW WE THINK',
      aboutBuildLabel:'WHAT WE BUILD',
      aboutWhoLabel:'WHO IT IS FOR'
    }
  };

  function applyLanguage(){
    const lang=(navigator.language||navigator.userLanguage||'es').toLowerCase().startsWith('en') ? 'en' : 'es';
    document.documentElement.lang=lang;
    if(lang==='en'){
      const dict=translations.en;
      $$('[data-i18n]').forEach(el=>{
        const text=dict[el.dataset.i18n];
        if(text) el.textContent=text;
      });
    }
  }

  function closeDrawer(){
    if(!drawer) return;
    drawer.classList.remove('open');
    if(overlay) overlay.classList.remove('show');
    if(menuBtn) menuBtn.classList.remove('open');
  }

  function openDrawer(){
    if(!drawer) return;
    drawer.classList.add('open');
    if(overlay) overlay.classList.add('show');
    if(menuBtn) menuBtn.classList.add('open');
  }

  function showView(name='home'){
    panels.forEach(panel=>{
      panel.classList.toggle('active',panel.dataset.viewPanel===name);
    });
    if(brand) brand.classList.toggle('hidden',name!=='home');
    if(back) back.classList.toggle('hidden',name==='home');
    closeDrawer();
    window.scrollTo(0,0);
  }

  if(menuBtn){
    menuBtn.onclick=(e)=>{
      e.preventDefault();
      e.stopPropagation();
      drawer && drawer.classList.contains('open') ? closeDrawer() : openDrawer();
    };
  }
  if(overlay) overlay.onclick=closeDrawer;
  if(closeMenu) closeMenu.onclick=(e)=>{e.preventDefault();closeDrawer();};
  if(brand) brand.onclick=(e)=>{e.preventDefault();showView('home');};
  if(back) back.onclick=(e)=>{e.preventDefault();showView('home');};

  // One delegated handler only. No pointerup/touchend duplicates.
  document.addEventListener('click',(e)=>{
    const target=e.target.closest('[data-view]');
    if(!target) return;
    e.preventDefault();
    e.stopPropagation();
    showView(target.dataset.view);
  });

  function toggleChat(){
    if(!chatPanel) return;
    const opening=!chatPanel.classList.contains('open');
    chatPanel.classList.toggle('open',opening);
    if(chatPeek) chatPeek.classList.toggle('active',opening);
  }

  if(chatPeek) chatPeek.onclick=(e)=>{e.preventDefault();e.stopPropagation();toggleChat();};
  if(chatClose) chatClose.onclick=(e)=>{e.preventDefault();toggleChat();};

  function reply(q){
    q=q.toLowerCase();
    const en=document.documentElement.lang==='en';
    if(/web|página|pagina|website/.test(q))
      return en ? "We can build an automated website connected to your business workflow." : "Podemos crear una web automatizada conectada al flujo real de tu negocio.";
    if(/chatbot|ia|ai|automat/.test(q))
      return en ? "We can create assistants and automation for support, lead capture and internal workflows." : "Podemos crear asistentes y automatizaciones para atención, captación y procesos internos.";
    if(/radio|pwa|stream/.test(q))
      return en ? "PWA Radio Player is designed for online stations that need an installable branded player." : "El Reproductor PWA para Radio está pensado para radios online que necesitan un reproductor instalable y con identidad propia.";
    if(/taxi|ride|conductor|driver/.test(q))
      return en ? "Taxi Ride is DONBEX's platform for drivers and passenger workflows." : "Taxi Ride es la plataforma DONBEX para conductores y flujo de pasajeros.";
    return en ? "Tell us your project or need and we’ll guide you toward the right solution." : "Cuéntanos tu proyecto o necesidad y te orientaremos hacia la solución adecuada.";
  }

  if(chatForm && chatInput && msgs){
    chatForm.onsubmit=(e)=>{
      e.preventDefault();
      const q=chatInput.value.trim();
      if(!q) return;
      const u=document.createElement('div');
      u.className='msg user';
      u.textContent=q;
      msgs.appendChild(u);
      const b=document.createElement('div');
      b.className='msg bot';
      b.textContent=reply(q);
      msgs.appendChild(b);
      chatInput.value='';
      msgs.scrollTop=msgs.scrollHeight;
    };
  }

  if(projectForm){
    projectForm.onsubmit=(e)=>{
      e.preventDefault();
      const fd=new FormData(projectForm);
      const body=[
        `Nombre: ${fd.get('nombre')||''} ${fd.get('apellido')||''}`,
        `Negocio: ${fd.get('negocio')||''}`,
        `Tipo: ${fd.get('tipo')||''}`,
        `Servicio: ${fd.get('servicio')||''}`,
        `Correo: ${fd.get('correo')||''}`,
        '',
        'Proyecto / necesidad / idea:',
        fd.get('descripcion')||''
      ].join('\n');
      location.href=`mailto:hello@dombex.com?subject=${encodeURIComponent('Nueva solicitud de proyecto - DONBEX')}&body=${encodeURIComponent(body)}`;
    };
  }

  $$('[data-social]').forEach(a=>{
    a.onclick=(e)=>{
      if(a.getAttribute('href')==='#') e.preventDefault();
    };
  });

  applyLanguage();

  // Always begin at HOME, including Safari back-forward cache restoration.
  showView('home');
  window.addEventListener('pageshow',()=>showView('home'));
})();
