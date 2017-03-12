import { ipcRenderer } from 'electron';


export function checkConnection(connection, callback) {
    ipcRenderer.once('test-connection-response', (event, status) => {
        callback(status);
    });
    ipcRenderer.send('test-connection-request', connection);
}
