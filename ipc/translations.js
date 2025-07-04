const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

ipcMain.handle('get-translations', (event, lang) => {
    try {
        const translationsPath = path.join(__dirname, '..', 'database', 'translations.json');
        const rawData = fs.readFileSync(translationsPath, 'utf-8');
        const allTranslations = JSON.parse(rawData);

        const filteredTranslations = {};
        for (const [key, translations] of Object.entries(allTranslations)) {
            filteredTranslations[key] = translations[lang] || '';
        }
        return filteredTranslations;
    } catch (err) {
        console.error(err);
        return {};
    }
});