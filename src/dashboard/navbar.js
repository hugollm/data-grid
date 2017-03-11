import React from 'react';
import Component from 'app/component';
import { changePage } from 'app/actions';


export default class Navbar extends Component {

    render() {
        return <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container-fluid">
                <div className="navbar-header navbar-collapse collapse">
                    <a href="#" className="navbar-brand" onClick={this.onClickBrand.bind(this)}>
                        <i className="fa fa-database"></i> mydb
                    </a>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="#" onClick={this.onClickDisconnect.bind(this)}><i className="fa fa-sign-out"></i> Disconnect</a></li>
                </ul>
            </div>
        </nav>;
    }

    onClickBrand() {
        changePage('query');
    }

    onClickDisconnect() {
        changePage('connections');
    }
}
