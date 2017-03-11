const electron = require('electron');
const path = require('path');

electron.app.on('ready', start);

function start() {
    var mainWindow = new electron.BrowserWindow({width: 1280, height: 768});
    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadURL('file://' + path.join(__dirname, 'build/index.html'));
}
