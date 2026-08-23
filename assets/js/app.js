
(()=>{
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const panels=$$('[data-view-panel]');
  const brand=$('#brandHome'), back=$('#backHome');
  const menuBtn=$('#menuBtn'), drawer=$('#drawer'), overlay=$('#menuOverlay'), closeMenu=$('#closeMenu');
  const chatPeek=$('#chatPeek'), chatPanel=$('#chatPanel'), chatClose=$('#chatClose');

  let current='home';

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
    const lang=(navigator.language||navigator.userLanguage||'es').toLowerCase().startsWith('en')?'en':'es';
    document.documentElement.lang=lang;
    if(lang==='en'){
      const dict=translations.en;
      $$('[data-i18n]').forEach(el=>{
        const key=el.dataset.i18n;
        if(dict[key]) el.textContent=dict[key];
      });
    }
  }

  function closeDrawer(){
    drawer.classList.remove('open');
    overlay.classList.remove('show');
    menuBtn.classList.remove('open');
    drawer.setAttribute('aria-hidden','true');
  }
  function openDrawer(){
    drawer.classList.add('open');
    overlay.classList.add('show');
    menuBtn.classList.add('open');
    drawer.setAttribute('aria-hidden','false');
  }

  function showView(name){
    name=name||'home';
    panels.forEach(p=>p.classList.toggle('active',p.dataset.viewPanel===name));
    current=name;
    brand.classList.toggle('hidden',name!=='home');
    back.classList.toggle('hidden',name==='home');
    closeDrawer();
    window.scrollTo(0,0);
  }

  // Use standard click only: most reliable across Safari/iPhone/desktop.
  menuBtn.addEventListener('click',e=>{
    e.preventDefault();
    drawer.classList.contains('open')?closeDrawer():openDrawer();
  });
  overlay.addEventListener('click',closeDrawer);
  closeMenu.addEventListener('click',closeDrawer);
  brand.addEventListener('click',e=>{e.preventDefault();showView('home');});
  back.addEventListener('click',e=>{e.preventDefault();showView('home');});

  document.addEventListener('click',e=>{
    const target=e.target.closest('[data-view]');
    if(!target) return;
    e.preventDefault();
    showView(target.dataset.view);
  });

  // Always start at HOME after load / browser restore.
  window.addEventListener('pageshow',()=>showView('home'));
  window.addEventListener('load',()=>showView('home'));

  // Chat
  function toggleChat(){
    const open=!chatPanel.classList.contains('open');
    chatPanel.classList.toggle('open',open);
    chatPeek.classList.toggle('active',open);
  }
  chatPeek.addEventListener('click',e=>{e.preventDefault();toggleChat();});
  chatClose.addEventListener('click',e=>{e.preventDefault();toggleChat();});

  const form=$('#chatForm'), input=$('#chatInput'), msgs=$('#chatMessages');
  function reply(q){
    q=q.toLowerCase();
    const en=document.documentElement.lang==='en';
    if(/web|página|pagina|website/.test(q)) return en?"We can build an automated website connected to your business workflow.":"Podemos crear una web automatizada conectada al flujo real de tu negocio.";
    if(/chatbot|ia|ai|automat/.test(q)) return en?"We can create assistants and automation for support, lead capture and internal workflows.":"Podemos crear asistentes y automatizaciones para atención, captación y procesos internos.";
    if(/radio|pwa|stream/.test(q)) return en?"PWA Radio Player is designed for online stations that need an installable branded player.":"El Reproductor PWA para Radio está pensado para radios online que necesitan un reproductor instalable y con identidad propia.";
    if(/taxi|ride|conductor|driver/.test(q)) return en?"Taxi Ride is DONBEX's platform for drivers and passenger workflows.":"Taxi Ride es la plataforma DONBEX para conductores y flujo de pasajeros.";
    return en?"Tell us your project or need and we’ll guide you toward the right solution.":"Cuéntanos tu proyecto o necesidad y te orientaremos hacia la solución adecuada.";
  }
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const q=input.value.trim(); if(!q)return;
    const u=document.createElement('div');u.className='msg user';u.textContent=q;msgs.appendChild(u);
    const b=document.createElement('div');b.className='msg bot';b.textContent=reply(q);msgs.appendChild(b);
    input.value='';msgs.scrollTop=msgs.scrollHeight;
  });

  // Project form
  $('#projectForm').addEventListener('submit',e=>{
    e.preventDefault();
    const fd=new FormData(e.currentTarget);
    const body=[
      `Nombre: ${fd.get('nombre')} ${fd.get('apellido')}`,
      `Negocio: ${fd.get('negocio')}`,
      `Tipo: ${fd.get('tipo')}`,
      `Servicio: ${fd.get('servicio')}`,
      `Correo: ${fd.get('correo')}`,
      '',
      'Proyecto / necesidad / idea:',
      fd.get('descripcion')
    ].join('\n');
    location.href=`mailto:hello@dombex.com?subject=${encodeURIComponent('Nueva solicitud de proyecto - DONBEX')}&body=${encodeURIComponent(body)}`;
  });

  $$('[data-social]').forEach(a=>a.addEventListener('click',e=>{
    if(a.getAttribute('href')==='#') e.preventDefault();
  }));

  applyLanguage();
  showView('home');
})();
