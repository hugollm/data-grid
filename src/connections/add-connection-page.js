import React from 'react';
import { ipcRenderer } from 'electron';

import Component from 'app/component';
import { changePage } from 'app/actions';


export default class AddConnectionPage extends Component {

    constructor() {
        super();
        this.state = {
            host: '/var/run/postgresql',
            port: '5432',
            database: '',
            user: 'postgres',
            password: '',
            connectionIsValid: null,
            connectionError: '',
        };
    }

    componentDidMount() {
        this.refs.host.focus();
        ipcRenderer.on('test-connection-response', (event, status) => {
            console.log(status);
            this.setState({connectionIsValid: status.valid, connectionError: status.error});
        });
    }

    bindValue(e) {
        var state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    isFormValid() {
        var host = this.state.host.trim();
        var port = this.state.port.trim();
        var database = this.state.database.trim();
        var user = this.state.user.trim();
        return host && port && database && user;
    }

    onClickCheckConnection() {
        var params = {
            host: this.state.host.trim(),
            port: this.state.port.trim(),
            database: this.state.database.trim(),
            user: this.state.user.trim(),
            password: this.state.password,
        };
        ipcRenderer.send('test-connection-request', params);
    }

    onClickSave() {
        changePage('connections');
    }

    onClickCancel() {
        changePage('connections');
    }

    render() {
        var { host, port, database, user, password } = this.state;
        return <div className="container add-connection-page">
            <div className="page-header">
                <h3>Add connection</h3>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-xs-8">
                        <label>Host</label>
                        <input type="text" name="host" value={host} onChange={this.bindValue.bind(this)} className="form-control" ref="host"/>
                    </div>
                    <div className="col-xs-4">
                        <label>Port</label>
                        <input type="number" name="port" value={port} onChange={this.bindValue.bind(this)} className="form-control"/>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label>Database</label>
                <input type="text" name="database" value={database} onChange={this.bindValue.bind(this)} className="form-control"/>
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
            return <i className="fa fa-check"></i>;
        if (valid === false)
            return <i className="fa fa-ban"></i>;
        return 'What';
    }
}
