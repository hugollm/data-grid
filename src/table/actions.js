import store from 'app/store';
import { query } from 'query/actions';


export const loadTableData = store.action('loadTableData', (state, callback) => {
    var sql = 'SELECT COUNT(*) as count FROM ' + state.dashboard.selectedTable;
    query(sql, [], updateTableCountAndLoadRows);
});

const updateTableCountAndLoadRows = store.action('updateTableCountAndLoadRows', (state, result) => {
    state.table.count = result.rows[0].count;
    var sql = 'SELECT * FROM ' + state.dashboard.selectedTable + ' ORDER BY 1 LIMIT $1 OFFSET $2';
    var args = [state.table.perPage, (state.table.page-1) * state.table.perPage];
    query(sql, args, updateTableData);
});

const updateTableData = store.action('updateTableData', (state, result) => {
    state.table.data = result;
});

export const changeTablePage = store.action('changeTablePage', (state, page) => {
    state.table.page = page;
    loadTableData();
});
