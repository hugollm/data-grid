import React from 'react';
import Component from 'app/component';

import { changePage } from 'app/actions';


export default class AddConnectionPage extends Component {

    componentDidMount() {
        this.refs.host.focus();
    }

    render() {
        return <div className="container add-connection-page">
            <div className="page-header">
                <h3>Add connection</h3>
            </div>
            <form>
                <div className="form-group">
                    <div className="row">
                        <div className="col-xs-8">
                            <label>Host</label>
                            <input type="text" className="form-control" ref="host"/>
                        </div>
                        <div className="col-xs-4">
                            <label>Port</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Database</label>
                    <input type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-xs-6">
                            <label>User</label>
                            <input type="text" className="form-control"/>
                        </div>
                        <div className="col-xs-6">
                            <label>Password</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="form-group">
                    <button className="btn btn-default">Check connection</button>
                </div>
            </form>
            <hr/>
            <button className="btn btn-primary disabled" onClick={this.onClickSave.bind(this)}>Save</button>
            <button className="btn btn-default" onClick={this.onClickCancel.bind(this)}>Cancel</button>
        </div>;
    }

    onClickSave() {
        changePage('connections');
    }

    onClickCancel() {
        changePage('connections');
    }
}
