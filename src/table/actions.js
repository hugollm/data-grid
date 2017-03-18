import store from 'app/store';
import { query } from 'query/actions';


export const loadTableData = store.action('loadTableData', (state, callback) => {
    var sql = 'SELECT * FROM ' + state.dashboard.selectedTable;
    query(sql, [], updateTableData);
});

const updateTableData = store.action('updateTableData', (state, result) => {
    state.dashboard.tableData = result;
});
