import React from 'react';

import Component from 'app/component';
import store from 'app/store';
import { changePage } from 'app/actions';
import { checkConnection, saveConnection } from './actions';


export default class AddConnectionPage extends Component {

    constructor() {
        super();
        this.state = {
            connection: {
                host: '/var/run/postgresql',
                port: '5432',
                ssl: false,
                database: '',
                user: 'postgres',
                password: '',
            },
            connectionIsValid: null,
            connectionError: '',
        };
        this.updateOnData('connections.checkingConnection');
    }

    componentDidMount() {
        this.refs.database.focus();
    }

    bindValue(e) {
        var connection = this.state.connection;
        var name = e.target.name;
        var value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        if (name != 'ssl' && name != 'password')
            value = value.trim()
        connection[name] = value;
        this.setState({connection: connection});
    }

    isFormValid() {
        var connection = this.state.connection;
        var host = connection.host.trim();
        var port = connection.port.trim();
        var database = connection.database.trim();
        var user = connection.user.trim();
        return host && port && database && user;
    }

    onClickCheckConnection() {
        checkConnection(this.state.connection, (status) => {
            this.setState({connectionIsValid: status.valid, connectionError: status.error});
        });
    }

    onClickSave() {
        if (!this.state.connectionIsValid)
            return;
        saveConnection(this.state.connection);
        changePage('connections');
    }

    onClickCancel() {
        changePage('connections');
    }

    render() {
        var { host, port, ssl, database, user, password } = this.state.connection;
        return <div className="container add-connection-page">
            <div className="page-header">
                <h3>Add connection</h3>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-xs-7">
                        <label>Host</label>
                        <input type="text" name="host" value={host} onChange={this.bindValue.bind(this)} className="form-control"/>
                    </div>
                    <div className="col-xs-3">
                        <label>Port</label>
                        <input type="number" name="port" value={port} onChange={this.bindValue.bind(this)} className="form-control"/>
                    </div>
                    <div className="col-xs-2">
                        <label>SSL</label>
                        <div className="checkbox">
                            <label><input type="checkbox" name="ssl" checked={ssl} onChange={this.bindValue.bind(this)}/> {ssl ? 'Yes' : 'No'}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label>Database</label>
                <input type="text" name="database" value={database} onChange={this.bindValue.bind(this)} className="form-control" ref="database"/>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-xs-6">
                        <label>User</label>
                        <input type="text" name="user" value={user} onChange={this.bindValue.bind(this)} className="form-control"/>
                    </div>
                    <div className="col-xs-6">
                        <label>Password</label>
                        <input type="text" name="password" value={password} onChange={this.bindValue.bind(this)} className="form-control"/>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="form-group">
                {this.renderCheckButton()}
                {this.renderCheckStatus()}
                <span className="text-danger">{this.state.connectionError}</span>
            </div>
            <hr/>
            <button className="btn btn-primary" onClick={this.onClickSave.bind(this)} disabled={!this.state.connectionIsValid}>Save</button>
            <button className="btn btn-default" onClick={this.onClickCancel.bind(this)}>Cancel</button>
        </div>;
    }

    renderCheckButton() {
        var checking = store.get('connections.checkingConnection');
        var disabled = (! this.isFormValid()) || checking;
        return <button className="btn btn-default" onClick={this.onClickCheckConnection.bind(this)} disabled={disabled}>
            Check connection
        </button>;
    }

    renderCheckStatus() {
        var checking = store.get('connections.checkingConnection');
        var valid = this.state.connectionIsValid;
        if (checking)
            return <i className="fa fa-spinner fa-pulse"></i>;
        if (valid === null)
            return '';
        if (valid === true)
            return <span className="text-success"><i className="text-success fa fa-check"></i> OK</span>;
        if (valid === false)
            return <i className="text-warning fa fa-warning"></i>;
    }
}
