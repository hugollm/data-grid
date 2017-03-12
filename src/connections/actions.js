import { ipcRenderer } from 'electron';
import storage from 'electron-json-storage';


export function checkConnection(connection, callback) {
    ipcRenderer.once('test-connection-response', (event, status) => {
        callback(status);
    });
    ipcRenderer.send('test-connection-request', connection);
}

export function saveConnection(connection) {
    storage.get('connections', (error, connections) => {
        if (!Array.isArray(connections))
            connections = [];
        connections.push(connection);
        storage.set('connections', connections);
    });
}
