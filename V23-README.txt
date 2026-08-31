DONBEX RADIO APP V23

This version is built directly on V22 and focuses only on the latest requested interaction.

Changes:
- "Editar mi radio" no longer opens /edit/<token>.
- It expands an inline editor inside the same private tracking panel.
- The client sees edits immediately in the radio preview on the left.
- Fields: station name, stream URL, template, logo, Instagram, Facebook, TikTok.
- Saving updates the existing radios/{slug} through /api/radio-edit.
- Same public URL remains.
- Same QR remains.
- Existing installed PWAs continue loading the same public slug, so saved changes appear there.
- Tracking preview no longer shows the old "Instala esta radio / Android..." instruction text.
- QR button uses a real attachment response and no longer invokes navigator.share / AirDrop / Mail sheet.
- The button remains "Descargar QR".

Not changed:
- Public PWA install flow.
- Tracking status/expiry.
- Edition-plan approval.
- Four player templates.
- Existing radio URL/slug.
