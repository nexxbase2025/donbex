DONBEX RADIO APP STUDIO — V13 ACTIVATION FLOW

Base: V12 TRACKING FLOW.

CAMBIOS DE CLARIDAD:
- “Generar reproductor” pasa a “Publicar mi Radio App”.
- El cliente configura y prueba primero.
- Luego continúa a activación y pago.
- Al subir comprobante:
  “Pago pendiente de verificación”.
  No necesita mantener la página abierta.
  Guarda su enlace de seguimiento.
  La verificación puede tardar hasta 2 horas.
- Cuando el admin apruebe en Firestore:
  la Radio App se activa automáticamente.
  El cliente NO tiene que pulsar “Generar” otra vez.
- En seguimiento aprobado aparecen:
  Abrir mi radio
  Copiar enlace público
  Descargar QR con logo
  Guardar acceso privado

No se tocaron diseños, animaciones ni motor del reproductor.


V13.1 — SINGLE PUBLISH CTA
- Eliminado el botón redundante “Continuar a activación y pago”.
- Eliminado el texto auxiliar debajo de ese botón.
- Queda un único CTA: “Publicar mi Radio App”.
- Ese botón abre directamente el checkout de activación/pago.
- No se modificaron reproductor, plantillas, tracking ni flujo de aprobación.
