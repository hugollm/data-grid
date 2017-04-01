import { ipcRenderer } from 'electron';
import store from 'app/store';


export const updateSql = store.action('updateSql', (state, sql) => {
    state.query.sql = sql;
});

export const query = store.action('query', (state, sql, args, successCallback, errorCallback) => {
    if (!errorCallback)
        errorCallback = alertQueryError;
    var uid = uuid4();
    ipcRenderer.once('query-response-' + uid, (event, response) => queryResponse(response, successCallback, errorCallback));
    ipcRenderer.send('query-request', state.app.selectedConnection, uid, sql, args);
});

function uuid4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

const queryResponse = store.action('queryResponse', (state, response, successCallback, errorCallback) => {
    ipcRenderer.removeAllListeners('query-response-' + response.uid);
    if (response.error)
        errorCallback(response.error);
    else
        successCallback(response.result);
});

const alertQueryError = store.action('alertQueryError', (state, error) => {
    alert(error);
});

export const userQuery = store.action('userQuery', (state) => {
    query(state.query.sql, [], userQueryOk, userQueryError);
});

const userQueryOk = store.action('userQueryOk', (state, result) => {
    state.query.result = result;
    state.query.error = null;
});

const userQueryError = store.action('queryError', (state, error) => {
    state.query.result = null;
    state.query.error = error;
});
