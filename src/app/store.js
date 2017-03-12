import TrueStore from 'true-store';


const store = new TrueStore({

    app: {
        page: 'connections',
        connections: null,
    },
});

store.debug = true;


export default store;
