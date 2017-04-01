import React from 'react';
import Component from 'app/component';

import store from 'app/store';
import { changePage } from 'app/actions';
import { disconnect } from 'connections/actions';
import { selectTable } from './actions';


export default class Navbar extends Component {

    onClickBrand() {
        selectTable(null);
        changePage('query');
    }

    onClickDisconnect() {
        disconnect();
    }

    render() {
        var connection = store.get('app.currentConnection');
        return <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container-fluid">
                <div className="navbar-header navbar-collapse collapse">
                    <a href="#" className="navbar-brand" onClick={this.onClickBrand.bind(this)}>
                        <i className="fa fa-database"></i> {connection.database}
                    </a>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="#" onClick={this.onClickDisconnect.bind(this)}><i className="fa fa-sign-out"></i> Disconnect</a></li>
                </ul>
            </div>
        </nav>;
    }
}
