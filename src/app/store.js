import TrueStore from 'true-store';


const store = new TrueStore({

    app: {
        page: 'connections',
        connections: null,
        selectedConnection: null,
    },
});

store.debug = true;


export default store;
