DONBEX RADIO APP V24

Correcciones específicas:

1. QR
- Se quitó completamente el QR grande del panel para no ocupar espacio.
- El botón sigue diciendo "Descargar QR".
- El click se intercepta ANTES que todos los handlers antiguos.
- Ya no usa navigator.share.
- Ya no debe abrir AirDrop/Mail/Mensajes.
- Va directo a /api/qr con Content-Disposition: attachment.
- El QR conserva el logo del cliente en el centro.

2. Guardar cambios
- La causa técnica encontrada en V23: /api/radio-edit.js importa firebase-admin,
  pero package.json NO tenía firebase-admin instalado.
- V24 agrega firebase-admin a dependencies.
- El endpoint sigue actualizando la misma radios/{slug}.
- No cambia URL ni QR.

IMPORTANTE:
Para /api/radio-edit, el proyecto Vercel de RADIO APP necesita estas 3 variables,
igual que las que ya existen en Admin:
RADIO_FIREBASE_PROJECT_ID
RADIO_FIREBASE_CLIENT_EMAIL
RADIO_FIREBASE_PRIVATE_KEY

No son reglas de Firestore: la edición pasa por una API segura del servidor.
