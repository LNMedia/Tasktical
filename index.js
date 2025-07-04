const { app, BrowserWindow, protocol } = require('electron');
const path = require('path');

require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    awaitWriteFinish: true,
    hardResetMethod: 'exit',
    watchDirs: [
        path.join(__dirname, 'views'),
        path.join(__dirname, 'public'),
        path.join(__dirname, 'config'),
        path.join(__dirname, 'database'),
        path.join(__dirname, 'helpers'),
        path.join(__dirname, 'middleware'),
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

    require('./ipc/translations');
    require('./ipc/workspaces');

    createWindow();
});