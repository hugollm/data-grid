import React from 'react';
import electron from 'electron';
import Component from 'app/component';

import store from 'app/store';
import { changePage } from 'app/actions';
import { loadConnections, selectConnection, forgetConnection } from './actions';
import './style.scss';


export default class ConnectionsPage extends Component {

    constructor() {
        super();
        this.updateOnData('app.connections');
    }

    componentDidMount() {
        loadConnections();
    }

    onClickAddConnection() {
        changePage('add-connection');
    }

    onClickConnection(connection) {
        selectConnection(connection);
        changePage('query');
    }

    onContextConnection(connection) {
        const { Menu, MenuItem } = electron.remote;
        var menu = new Menu();
        var item = new MenuItem({label: 'Forget', click: () => forgetConnection(connection)});
        menu.append(item);
        menu.popup(electron.remote.getCurrentWindow());
    }

    render() {
        return <div className="container connections-page">
            <div className="page-header">
                <button className="btn btn-link" onClick={this.onClickAddConnection.bind(this)}>
                    <i className="fa fa-plus"></i> Add connection
                </button>
            </div>
            {this.renderConnections()}
        </div>;
    }

    renderConnections() {
        var connections = store.get('app.connections');
        if (connections === null)
            return;
        if (connections.length)
            return <ul className="list-group">
                {connections.map(this.renderConnection.bind(this))}
            </ul>;
        else
            return <p className="text-muted">No registered connections.</p>;
    }

    renderConnection(connection) {
        return <li className="list-group-item connection"
                    onClick={() => this.onClickConnection(connection)} onContextMenu={() => this.onContextConnection(connection)}>
            <div className="row">
                <div className="col-xs-1">
                    <i className="fa fa-database"></i>
                </div>
                <div className="col-xs-7 database-name">
                    <span>{connection.database}</span>
                </div>
                <div className="col-xs-4">
                    <span className="text-muted">{connection.host}</span> <br/>
                    <span className="text-muted">{connection.user}{connection.password ? ':*****' : ''}</span>
                </div>
            </div>
        </li>;
    }
}
