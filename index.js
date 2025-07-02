const { app, BrowserWindow, protocol, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    awaitWriteFinish: true,
    hardResetMethod: 'exit',
    watchDirs: [
        path.join(__dirname, 'views'),
        path.join(__dirname, 'public'),
        path.join(__dirname, 'config'),
    ],
});

function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 700,
        minWidth: 1000,
        minHeight: 700,
        icon: path.join(__dirname, 'public', 'img', 'icon.ico'),
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(__dirname, 'config', 'preload.js'),
        },
    });

    win.setMenuBarVisibility(false);
    win.webContents.openDevTools();

    const indexPath = path.join(__dirname, 'views', 'index.html');
    win.loadFile(indexPath);
}

app.whenReady().then(() => {
    protocol.registerFileProtocol('app', (request, callback) => {
        let url = request.url.substr(6);
        if (url.startsWith('/')) { url = url.substr(1); }
        const filePath = path.join(__dirname, 'public', url);
        callback({ path: filePath });
    });

    ipcMain.handle('get-translations', (event, lang) => {
        const translationsPath = path.join(__dirname, 'database', 'translations.json');
        const rawData = fs.readFileSync(translationsPath, 'utf-8');
        const allTranslations = JSON.parse(rawData);

        const filteredTranslations = {};
        for (const [key, translations] of Object.entries(allTranslations)) {
            filteredTranslations[key] = translations[lang] || '';
        }
        return filteredTranslations;
    });

    createWindow();
});
