import React from 'react';
import Component from 'app/component';

import store from 'app/store';
import { changePage } from 'app/actions';
import { disconnect } from './actions';


export default class Navbar extends Component {

    onClickBrand() {
        changePage('query');
    }

    onClickDisconnect() {
        disconnect();
        changePage('connections');
    }

    render() {
        var connection = store.get('app.selectedConnection');
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
