import React from 'react';

import store from './store';
import ConnectionsPage from 'connections/connections-page';
import Dashboard from 'dashboard/dashboard';
import './style.scss';


export default class App extends React.Component {

    constructor() {
        super();
        this.update = this.forceUpdate.bind(this);
    }

    componentDidMount() {
        store.listenData('app.page', this.update);
    }

    componentWillUnmount() {
        store.unlistenData('app.page', this.update);
    }

    render() {
        var page = store.get('app.page');
        if (page == 'connections')
            return <ConnectionsPage/>;
        else if (page == 'dashboard')
            return <Dashboard/>;
        else
            return <p>{page}</p>;
    }
}
