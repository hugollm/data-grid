import React from 'react';
import Component from './component';

import store from './store';
import ConnectionsPage from 'connections/connections-page';
import AddConnectionPage from 'connections/add-connection-page';
import Dashboard from 'dashboard/dashboard';
import './style.scss';


export default class App extends Component {

    constructor() {
        super();
        this.updateOnData('app.page');
    }

    render() {
        var page = store.get('app.page');
        if (page == 'connections')
            return <ConnectionsPage/>;
        else if (page == 'add-connection')
            return <AddConnectionPage/>;
        else
            return <Dashboard/>;
    }
}
