// Single source of truth for the version footer shown on every page.
// Update this file instead of editing each page's footer separately.
const APP_VERSION = "1.2.0";
const APP_VERSION_DATE = "2026-07-02";

document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('versionText');
    if (el) el.textContent = `Version ${APP_VERSION} - Last Updated: ${APP_VERSION_DATE}`;
});
