import React from 'react';
import Component from 'app/component';
import { changePage } from 'app/actions';


export default class Navbar extends Component {

    render() {
        return <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#"><i className="fa fa-database"></i> mydb</a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#" onClick={this.onClickDisconnect.bind(this)}><i className="fa fa-sign-out"></i> Disconnect</a></li>
                    </ul>
                </div>
            </div>
        </nav>;
    }

    onClickDisconnect() {
        changePage('connections');
    }
}
