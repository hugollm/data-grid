import React from 'react';
import Component from 'app/component';

import store from 'app/store';
import { changePage } from 'app/actions';
import { loadConnections } from './actions';
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
        changePage('query');
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
        if (connections)
            return <ul className="list-group">
                {connections.map(this.renderConnection.bind(this))}
            </ul>;
        else
            return <p className="text-muted">No connections.</p>;
    }

    renderConnection(connection) {
        return <li className="list-group-item connection" onClick={() => this.onClickConnection(connection)}>
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
