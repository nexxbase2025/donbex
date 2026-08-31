DONBEX RADIO APP V18

This version is built directly on V17 and preserves the full-screen mobile checkout and dedicated tracking page.

Fixed:
- Tracking QR now renders into its own canvas with explicit black/white colors.
- Customer logo is drawn in the center of the tracking QR when CORS allows it.
- QR save uses native iOS Share/Save flow, then falls back to PNG download.
- "Solicitar edición" now opens a real renewal payment form.
- Renewal requests are written to radioRequests with requestType=edition and are compatible with DONBEX Admin V3.0.
- Public player hides the old install instructions.
- Android public player gets an install bubble when beforeinstallprompt is available.
- iPhone gets a designed install bubble with Add to Home Screen instructions.
- Apple touch icon is dynamically changed to the station logo.
- Android manifest is generated dynamically using the station name/logo through /api/manifest.
- Service worker no longer unregisters itself.

No changes:
- Existing 4 player templates
- New-radio purchase flow
- Firestore project/config
- Admin approval architecture
