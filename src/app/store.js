import TrueStore from 'true-store';


const store = new TrueStore({

    app: {
        page: 'connections',
        connections: null,
        selectedConnection: null,
    },

    dashboard: {
        tables: [],
    },
});

store.debug = true;


export default store;
