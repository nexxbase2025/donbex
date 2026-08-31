DONBEX RADIO APP V21

Focused changes:
- QR no longer depends on browser canvas readiness.
- New /api/qr creates the QR PNG server-side with qrcode + sharp.
- Customer logo is embedded in center server-side.
- iPhone Save QR uses native share/save; fallback opens the PNG.
- /edit/<token> black screen is fixed by showing the Studio editor.
- Public radio can show "Volver a mi panel" when opened from the tracking hub.
- Edit view gets a return-to-private-hub button when a suitable hub URL is known.
- Install bubble remains hidden in standalone/installed mode.
- Existing new-radio purchase, tracking, edition requests, templates and Firebase project are preserved.

Recommended product structure:
Keep THREE URLs internally:
1) Public radio URL — what listeners use / QR points to.
2) Private tracking hub URL — the customer's permanent control center.
3) Private edit URL — used only while an edition plan is active.
The customer only needs to save/receive the private tracking hub; the public URL and edit button live inside it.
