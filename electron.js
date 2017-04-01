const electron = require('electron');
const path = require('path');
const pg = require('pg');

electron.app.on('ready', start);
electron.ipcMain.on('test-connection-request', testConnection);
electron.ipcMain.on('connect-request', connect);
electron.ipcMain.on('disconnect-request', disconnect);
electron.ipcMain.on('query-request', query);

var client = null;

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

function connect(event, params) {
    if (client)
        return event.sender.send('connect-error', 'Already connected');
    client = new pg.Client(params);
    client.connect((error) => {
        if (error)
            return event.sender.send('connect-error', error.message);
        return event.sender.send('connect-ok');
    });
}

function disconnect(event) {
    if (!client)
        return event.sender.send('disconnect-error', 'No active connection');
    client.end((error) => {
        if (error)
            return event.sender.send('disconnect-error', error.message);
        client = null;
        return event.sender.send('disconnect-ok');
    });
}

function query(event, uid, sql, args) {
    if (!client)
        return sendQueryResponse(event, uid, null, {message: 'No active connection'});
    client.query(sql, args, (error, result) => {
        return sendQueryResponse(event, uid, result, error);
    });
}

function sendQueryResponse(event, uid, result, error) {
    var response = {uid: uid, result: result, error: (error ? error.message : null)};
    return event.sender.send('query-response-' + uid, response);
}
