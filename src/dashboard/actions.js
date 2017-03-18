import { ipcRenderer } from 'electron';
import store from 'app/store';


export const disconnect = store.action('disconnect', (state) => {
    state.app.selectedConnection = null;
    state.dashboard.tables = [];
});

export const loadTables = store.action('loadTables', (state) => {
    ipcRenderer.once('query-response', (event, result) => {
        updateTables(result.rows);
    });
    var sql = "SELECT table_name FROM information_schema.tables";
    sql += " WHERE table_schema = $1::text ORDER BY table_name";
    var args = ['public'];
    ipcRenderer.send('query-request', state.app.selectedConnection, sql, args);
});

const updateTables = store.action('updateTables', (state, rows) => {
    var tables = [];
    for (var i in rows)
        tables.push(rows[i].table_name);
    state.dashboard.tables = tables;
});
