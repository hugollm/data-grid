import TrueStore from 'true-store';


const store = new TrueStore({

    app: {
        page: 'connections',
    }
});

store.debug = true;


export default store;
