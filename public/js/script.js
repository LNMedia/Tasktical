/* === Language Handler === */
async function loadTranslations(lang) {
    const translations = await window.electronAPI.invoke('get-translations', lang);
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[key]) {
            el.textContent = translations[key];
        }
    });
}
function updateLanguageButton(currentLang) {
    const btn = document.querySelector('.changeLang');
    if (!btn) return;
  
    btn.setAttribute('data-lang', currentLang);
  
    const otherLang = currentLang === 'de' ? 'en' : 'de';
    btn.setAttribute('data-change', otherLang);
}
async function initLang() {
    let lang = localStorage.getItem('lang') || 'en';
  
    await loadTranslations(lang);
    updateLanguageButton(lang);
  
    const btn = document.querySelector('.changeLang');
    if (btn) {
        btn.addEventListener('click', async () => {
            const newLang = btn.getAttribute('data-change');
            if (newLang && newLang !== lang) {
                lang = newLang;
                localStorage.setItem('lang', lang);
        
                await loadTranslations(lang);
                updateLanguageButton(lang);
            }
        });
    }
}
window.addEventListener('DOMContentLoaded', initLang);