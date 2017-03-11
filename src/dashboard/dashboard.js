import React from 'react';
import Component from 'app/component';

import './style.scss';


export default class Dashboard extends Component {

    render() {
        return <div className="dashboard">

            <nav className="navbar navbar-inverse navbar-fixed-top">
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
                            <li><a href=""><i className="fa fa-sign-out"></i> Disconnect</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 col-md-2 sidebar">
                        <ul className="nav nav-sidebar">
                            <li className="active"><a href="#"><i className="fa fa-columns"></i> Overview</a></li>
                            <li><a href="#"><i className="fa fa-pencil-square-o"></i> Query</a></li>
                        </ul>
                        <ul className="nav nav-sidebar">
                            <li><a href="#"><i className="fa fa-star"></i> Useful query</a></li>
                            <li><a href="#"><i className="fa fa-star"></i> Report on users</a></li>
                        </ul>
                        <ul className="nav nav-sidebar">
                            <li><a href="#"><i className="fa fa-table"></i> users</a></li>
                            <li><a href="#"><i className="fa fa-table"></i> roles</a></li>
                            <li><a href="#"><i className="fa fa-table"></i> projects</a></li>
                            <li><a href="#"><i className="fa fa-table"></i> assignments</a></li>
                        </ul>
                    </div>
                    <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">

                    </div>
                </div>
            </div>

        </div>;
    }
}
