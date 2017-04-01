import { ipcRenderer } from 'electron';
import storage from 'electron-json-storage';
import store from 'app/store';
import { changePage } from 'app/actions';


export const loadConnections = store.action('loadConnections', (state) => {
    storage.get('connections', (error, connections) => {
        if (!Array.isArray(connections))
            connections = [];
        updateConnections(connections);
    });
});

const updateConnections = store.action('updateConnections', (state, connections) => {
    state.app.connections = connections;
});

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
        storage.set('connections', connections, (error) => {
            updateConnections(connections);
        });
    });
});

export const forgetConnection = store.action('forgetConnection', (state, connection) => {
    storage.get('connections', (error, connections) => {
        for (var i in connections)
            if (JSON.stringify(connections[i]) == JSON.stringify(connection))
                connections.splice(i, 1);
        storage.set('connections', connections, (error) => {
            updateConnections(connections);
        });
    });
});

export const connect = store.action('connect', (state, connection) => {
    state.app.currentConnection = connection;
    ipcRenderer.once('connect-ok', connectOk);
    ipcRenderer.once('connect-error', connectError);
    ipcRenderer.send('connect-request', connection);
});

const connectOk = store.action('connectOk', (state) => {
    changePage('query');
});

const connectError = store.action('connectError', (state, error) => {
    state.app.currentConnection = null;
    alert(error);
});

export const disconnect = store.action('disconnect', (state, params) => {
    ipcRenderer.once('disconnect-ok', disconnectOk);
    ipcRenderer.once('disconnect-error', disconnectError);
    ipcRenderer.send('disconnect-request');
});

const disconnectOk = store.action('disconnectOk', (state) => {
    state.app.currentConnection = null;
    state.dashboard.tables = [];
    state.dashboard.selectedTable = null;
    state.query.sql = '';
    state.query.result = null;
    state.query.error = null;
    changePage('connections');
});

const disconnectError = store.action('disconnectError', (state, error) => {
    alert(error);
});
