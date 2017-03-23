import TrueStore from 'true-store';


const store = new TrueStore({

    app: {
        page: 'connections',
        connections: null,
        selectedConnection: null,
    },

    dashboard: {
        tables: [],
        selectedTable: null,
    },

    query: {
        sql: '',
        result: null,
        error: null,
    },

    table: {
        data: null,
        page: 1,
        perPage: 15,
    },
});

store.debug = true;


export default store;
