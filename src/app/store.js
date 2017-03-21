import TrueStore from 'true-store';


const store = new TrueStore({

    app: {
        page: 'connections',
        connections: null,
        selectedConnection: null,
    },

    query: {
        error: null,
    },

    dashboard: {
        tables: [],
        selectedTable: null,
        tableData: null,
    },
});

store.debug = true;


export default store;
