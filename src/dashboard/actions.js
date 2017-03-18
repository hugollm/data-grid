import store from 'app/store';


export const disconnect = store.action('disconnect', (state) => {
    state.app.selectedConnection = null;
});
