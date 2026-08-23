DONBEX STATIC V15 FIXED

CAUSA REAL DEL FALLO DE V14:
- El HTML usaba id="overlay", pero app.js buscaba #menuOverlay.
- JavaScript recibía null y se detenía al intentar overlay.addEventListener(...).
- Por eso NO funcionaban menú, volver al inicio, traducciones ni parte del chat.
- Además HTML usaba id="msgs", pero JS buscaba #chatMessages.
- Los iconos sociales anteriores tampoco se reemplazaron porque el HTML real usaba class="socials" y el parche anterior esperaba otra clase.

V15 corrige los selectores contra el DOM REAL.
También añade ?v=15 a style.css y app.js para romper caché.

Prueba local:
doble clic en index.html.
