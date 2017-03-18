import { ipcRenderer } from 'electron';
import store from 'app/store';


export const query = store.action('query', (state, sql, args, callback) => {
    ipcRenderer.once('query-response', (event, result) => {
        callback(result);
    });
    ipcRenderer.send('query-request', state.app.selectedConnection, sql, args);
});
