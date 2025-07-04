const { ipcMain, app } = require('electron');
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

ipcMain.handle('get-workspaces', (event) => {
    try {
        // Check Basepath & create new if not exists
        const basePath = path.join(app.getPath('userData'), 'database');
        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath, { recursive: true });
        }

        // Path to WorkspacesDB || create new
        const dbPath = path.join(basePath, 'workspaces.db');
        const db = new Database(dbPath);

        // Create table "workspaces" if not exists
        db.prepare(`
            CREATE TABLE IF NOT EXISTS workspaces (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        `).run();

        // Get workspaces
        const workspaces = db.prepare('SELECT id, name, created_at FROM workspaces').all();

        // Close db
        db.close();

        // Return result
        return workspaces;

    } catch (err) {
            console.error('Fehler beim Laden der Workspaces:', err);
            return [];
    }
});

ipcMain.handle('add-workspace', (event, data) => {
    try {
        const { workspaceName } = data;
        if (!workspaceName || typeof workspaceName !== 'string' || workspaceName.trim() === '') {
            throw new Error('Non valid workspace-name submitted.');
        }

        const basePath = path.join(app.getPath('userData'), 'tasktical');
        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath, { recursive: true });
        }

        const dbPath = path.join(basePath, 'workspaces.db');
        const db = new Database(dbPath);

        db.prepare(`
            CREATE TABLE IF NOT EXISTS workspaces (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                icon INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        `).run();

        const insert = db.prepare('INSERT INTO workspaces (name) VALUES (?)');
        const result = insert.run(workspaceName.trim());

        // Prepare new workspace as db-file
        const workspaceFileName = `workspace_${result.lastInsertRowid}.db`;
        const newDBPath = path.join(basePath, workspaceFileName);

        if (!fs.existsSync(newDBPath)) {
            fs.closeSync(fs.openSync(newDBPath, 'w'));
        }

        db.close();

        return { success: true, id: result.lastInsertRowid, file: workspaceFileName };

    } catch (err) {
        console.error(err);
        return { success: false, error: err.message };
    }
});
