DONBEX RADIO APP V20

This release focuses ONLY on the two remaining issues reported after V19:

1) Tracking QR
- QR is rendered with explicit black/white colors.
- The customer logo is fetched through a same-origin Vercel proxy before being drawn.
- This prevents a cross-origin/tainted canvas, which was keeping trackingQrReady=false and causing the endless "QR todavía se está preparando" message.
- Save on iPhone uses the native share/save sheet.

2) iPhone installed PWA opening the Studio
- The Studio no longer ships a static manifest link.
- On iPhone, a public station does NOT inject a manifest; Safari therefore saves the CURRENT station URL.
- The page title and apple-mobile-web-app-title are changed to the customer's station name.
- The apple-touch-icon is changed to the customer's logo.
- Android still gets a station-specific dynamic manifest with start_url equal to the public station path.

IMPORTANT TEST NOTE:
Delete the OLD home-screen icon before testing V20. iOS preserves the old installed web app's title/start URL and will not rewrite an existing icon automatically.
