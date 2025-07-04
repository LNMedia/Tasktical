async function loadTranslations(lang) {
    const translations = await window.electronAPI.invoke('get-translations', lang);
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[key]) {
            el.textContent = translations[key];
        }
    });
}

function updateLanguageButtons(currentLang) {
    const btns = document.querySelectorAll('.changeLang');
    if (!btns.length) return;

    const otherLang = currentLang === 'de' ? 'en' : 'de';

    btns.forEach(btn => {
        btn.setAttribute('data-lang', currentLang);
        btn.setAttribute('data-change', otherLang);
    });
}

async function initLang() {
    let lang = localStorage.getItem('lang') || 'en';

    await loadTranslations(lang);
    updateLanguageButtons(lang);

    const btns = document.querySelectorAll('.changeLang');
    btns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const newLang = btn.getAttribute('data-change');
            if (newLang && newLang !== lang) {
                lang = newLang;
                localStorage.setItem('lang', lang);

                await loadTranslations(lang);
                updateLanguageButtons(lang);
            }
        });
    });
}


window.addEventListener('DOMContentLoaded', initLang);