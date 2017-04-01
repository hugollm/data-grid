import { ipcRenderer } from 'electron';

import store from 'app/store';
import { query } from 'query/actions';
import { loadTableData } from 'table/actions';


export const loadTables = store.action('loadTables', (state) => {
    var sql = "SELECT table_name FROM information_schema.tables";
    sql += " WHERE table_schema = $1::text ORDER BY table_name";
    var args = ['public'];
    query(sql, args, updateTables);
    state.dashboard.loadingTables = true;
});

const updateTables = store.action('updateTables', (state, result) => {
    var tables = [];
    for (var i in result.rows)
        tables.push(result.rows[i].table_name);
    state.dashboard.tables = tables;
    state.dashboard.loadingTables = false;
});

export const selectTable = store.action('selectTable', (state, tableName) => {
    state.dashboard.selectedTable = tableName;
    state.table.page = 1;
    state.table.data = null;
    if (tableName)
        loadTableData();
});
