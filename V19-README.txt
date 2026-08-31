DONBEX RADIO APP V19

Focused corrections based on the current flow:
- Tracking page now syncs editActive/editExpiresAt from radioEdits after admin approves an edition plan.
- "Editar mi radio" appears only while edit access is active and disappears after expiry.
- /edit/<token> loads the current live station config into the Studio.
- Edit save creates a controlled edit-change request instead of writing directly to the public radio.
- Tracking QR is rendered as a real PNG data URL and save/share logic is reinforced for iPhone.
- Route guard runs in <head> to prevent the Studio flashing briefly when opening /order/, /edit/ or /slug.
- Static Studio manifest is display=browser, so the Studio itself is not installable as the client radio.
- Public station route still uses dynamic install behavior with station name/logo.
- No changes to the four player templates or the working new-radio order flow.
