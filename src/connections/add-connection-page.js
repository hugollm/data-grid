import React from 'react';
import { ipcRenderer } from 'electron';

import Component from 'app/component';
import { changePage } from 'app/actions';


export default class AddConnectionPage extends Component {

    constructor() {
        super();
        this.state = {
            connection: {
                host: '/var/run/postgresql',
                port: '5432',
                database: '',
                user: 'postgres',
                password: '',
            },
            connectionIsValid: null,
            connectionError: '',
        };
    }

    componentDidMount() {
        this.refs.database.focus();
    }

    bindValue(e) {
        var connection = this.state.connection;
        var name = e.target.name;
        var value = e.target.value;
        if (name != 'password')
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
        ipcRenderer.once('test-connection-response', (event, status) => {
            this.setState({connectionIsValid: status.valid, connectionError: status.error});
        });
        ipcRenderer.send('test-connection-request', this.state.connection);
    }

    onClickSave() {
        changePage('connections');
    }

    onClickCancel() {
        changePage('connections');
    }

    render() {
        var { host, port, database, user, password } = this.state.connection;
        return <div className="container add-connection-page">
            <div className="page-header">
                <h3>Add connection</h3>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-xs-8">
                        <label>Host</label>
                        <input type="text" name="host" value={host} onChange={this.bindValue.bind(this)} className="form-control"/>
                    </div>
                    <div className="col-xs-4">
                        <label>Port</label>
                        <input type="number" name="port" value={port} onChange={this.bindValue.bind(this)} className="form-control"/>
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
            <button className="btn btn-primary disabled" onClick={this.onClickSave.bind(this)}>Save</button>
            <button className="btn btn-default" onClick={this.onClickCancel.bind(this)}>Cancel</button>
        </div>;
    }

    renderCheckButton() {
        var disabled = ! this.isFormValid();
        return <button className="btn btn-default" onClick={this.onClickCheckConnection.bind(this)} disabled={disabled}>
            Check connection
        </button>;
    }

    renderCheckStatus() {
        var valid = this.state.connectionIsValid;
        if (valid === null)
            return '';
        if (valid === true)
            return <span className="text-success"><i className="text-success fa fa-check"></i> OK</span>;
        if (valid === false)
            return <i className="text-warning fa fa-warning"></i>;
    }
}
