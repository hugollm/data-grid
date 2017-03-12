const electron = require('electron');
const path = require('path');

electron.app.on('ready', start);
electron.ipcMain.on('test-connection-request', testConnection);

function start() {
    var mainWindow = new electron.BrowserWindow({width: 1280, height: 768});
    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadURL('file://' + path.join(__dirname, 'build/index.html'));
    // mainWindow.webContents.openDevTools();
}

function testConnection(event, params) {
    var pg = require('pg');
    var client = new pg.Client(params);
    client.connect((error) => {
        var valid = !error;
        var errorMessage = error ? error.message : '';
        event.sender.send('test-connection-response', {valid: valid, error: errorMessage});
        if (valid)
            client.end();
    });
}