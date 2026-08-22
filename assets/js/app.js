
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const menuBtn=$('.menu-btn'), drawer=$('.drawer'), overlay=$('.menu-overlay'), close=$('.drawer-top button');
  let menuBusy=false, chatBusy=false;

  function toggleMenu(force){
    if(menuBusy) return;
    menuBusy=true;
    const open=typeof force==='boolean'?force:!drawer.classList.contains('show');
    drawer.classList.toggle('show',open);
    overlay.classList.toggle('show',open);
    menuBtn.classList.toggle('open',open);
    document.body.classList.toggle('menu-open',open);
    setTimeout(()=>menuBusy=false,180);
  }

  if(menuBtn){
    menuBtn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();toggleMenu();},{passive:false});
    menuBtn.addEventListener('touchend',e=>{e.preventDefault();e.stopPropagation();toggleMenu();},{passive:false});
  }
  overlay&&overlay.addEventListener('click',()=>toggleMenu(false));
  close&&close.addEventListener('click',e=>{e.preventDefault();toggleMenu(false)});
  $$('.drawer a').forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));

  const peek=$('.chat-peek'), panel=$('.chat-panel'), chatClose=$('.chat-head button'), form=$('.chat-form'), input=$('.chat-form input'), msgs=$('.chat-msgs');
  const en=document.documentElement.lang.startsWith('en');

  function toggleChat(force){
    if(chatBusy) return;
    chatBusy=true;
    const open=typeof force==='boolean'?force:!panel.classList.contains('open');
    panel.classList.toggle('open',open);
    peek.classList.toggle('active',open);
    setTimeout(()=>chatBusy=false,150);
  }

  if(peek){
    peek.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();toggleChat();},{passive:false});
    peek.addEventListener('touchend',e=>{e.preventDefault();e.stopPropagation();toggleChat();},{passive:false});
  }
  chatClose&&chatClose.addEventListener('click',e=>{e.preventDefault();toggleChat(false)});

  function botReply(q){
    q=q.toLowerCase();
    if(/web|página|pagina|website/.test(q)) return en?"We can build an automated website connected to your workflow.":"Podemos crear una web automatizada conectada al flujo real de tu negocio.";
    if(/chatbot|ia|ai|automat/.test(q)) return en?"We can build assistants and automations for support, leads and internal processes.":"Podemos crear asistentes y automatizaciones para atención, captación y procesos internos.";
    if(/radio|pwa|stream/.test(q)) return en?"PWA Radio Player is designed for online stations that need a branded, installable player.":"PWA Radio Player está pensado para radios online que necesitan un reproductor instalable y con identidad propia.";
    if(/taxi|ride|driver|conductor/.test(q)) return en?"Taxi Ride is DONBEX's platform for drivers and passenger workflows.":"Taxi Ride es la plataforma de DONBEX para conductores y flujo de pasajeros.";
    return en?"Tell us your project or need and we’ll point you in the right direction.":"Cuéntanos tu proyecto o necesidad y te orientaremos hacia la solución adecuada.";
  }

  form&&form.addEventListener('submit',e=>{
    e.preventDefault();
    const q=input.value.trim();
    if(!q)return;
    const u=document.createElement('div');
    u.className='msg user';
    u.textContent=q;
    msgs.appendChild(u);
    const b=document.createElement('div');
    b.className='msg bot';
    b.textContent=botReply(q);
    msgs.appendChild(b);
    input.value='';
    msgs.scrollTop=msgs.scrollHeight;
  });

  // Browser-language redirect only when hosted.
  if(location.protocol!=='file:' && !sessionStorage.getItem('dombex-lang')){
    const isEn=(navigator.language||'').toLowerCase().startsWith('en');
    const p=location.pathname;
    if(isEn && !p.includes('/en/')){
      const map={'/':'/en/index.html','/index.html':'/en/index.html','/soluciones.html':'/en/solutions.html','/productos.html':'/en/products.html','/proyecto.html':'/en/project.html','/sobre-nosotros.html':'/en/about.html','/privacidad.html':'/en/privacy.html'};
      if(map[p]) location.replace(map[p]);
    }
    sessionStorage.setItem('dombex-lang','1');
  }
})();
