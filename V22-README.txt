DONBEX RADIO APP V22

Correcciones específicas sobre V21:
- El botón del panel ahora dice Descargar QR.
- Se eliminó Abrir mi radio del panel privado porque el reproductor ya se muestra ahí.
- El error viejo 'QR todavía se está preparando' queda interceptado antes de los handlers anteriores.
- Descargar QR usa directamente /api/qr, el mismo PNG que ya se ve correctamente en pantalla.
- /edit/<token> fuerza visible el Studio/editor y corrige la pantalla negra.
- Guardar cambios en edición actualiza la MISMA radios/{slug} mediante /api/radio-edit.
- No genera nueva URL pública.
- No genera nuevo QR.
- No crea una nueva radio.
- El botón Volver a mi panel se conserva.
- El endpoint /api/radio-edit usa las mismas variables RADIO_FIREBASE_* que ya usa Admin/Vercel.

Estructura recomendada:
El cliente conserva una sola URL privada principal: /order/<token>.
Dentro de ella: reproductor, enlace público, QR, edición activa y renovación.
El QR y el enlace público siempre apuntan al mismo /<slug>.
