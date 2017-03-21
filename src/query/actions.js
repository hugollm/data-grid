import { ipcRenderer } from 'electron';
import store from 'app/store';


export const query = store.action('query', (state, sql, args, callback) => {
    ipcRenderer.once('query-response', (event, result) => queryOk(callback, result));
    ipcRenderer.once('query-error', (event, error) => queryError(error));
    ipcRenderer.send('query-request', state.app.selectedConnection, sql, args);
});

const queryOk = store.action('queryOk', (state, callback, result) => {
    state.query.error = null;
    ipcRenderer.removeAllListeners('query-error');
    callback(result);
});

const queryError = store.action('queryError', (state, error) => {
    state.query.error = error;
    ipcRenderer.removeAllListeners('query-response');
});
