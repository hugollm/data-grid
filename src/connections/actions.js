import { ipcRenderer } from 'electron';
import storage from 'electron-json-storage';
import store from 'app/store';


export const checkConnection = store.action('checkConnection', (state, connection, callback) => {
    ipcRenderer.once('test-connection-response', (event, status) => {
        callback(status);
    });
    ipcRenderer.send('test-connection-request', connection);
});

export const saveConnection = store.action('saveConnection', (state, connection) => {
    storage.get('connections', (error, connections) => {
        if (!Array.isArray(connections))
            connections = [];
        connections.push(connection);
        storage.set('connections', connections);
    });
});