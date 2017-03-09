import store from './store';


export const changePage = store.action('changePage', (state, page) => {
    state.app.page = page;
});
