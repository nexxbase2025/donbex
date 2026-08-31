DONBEX RADIO APP V16

CRITICAL FIXES
- Routed URLs now load CSS/JS from absolute /assets paths. This fixes the unstyled/narrow pages on /order/, /edit/ and /slug.
- Mobile checkout inputs are 16px to prevent iPhone Safari focus auto-zoom.
- Checkout is forced to one-column/full-width on phones.
- QR download now uses native Share/Save on iPhone when available, with PNG download fallback.
- /edit/:token now reads radioEdits.
- Added safe Firestore helper for future edition-renewal requests compatible with DONBEX Admin V3.0.
- Existing order creation, radio activation, templates, stream, Firebase config and QR generation are preserved.

NEXT PRODUCT LAYER
Recovery by email and automatic email delivery require a protected server-side mail/auth flow and should not be faked client-side.
