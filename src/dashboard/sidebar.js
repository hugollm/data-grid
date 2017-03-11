import React from 'react';
import Component from 'app/component';
import { changePage } from 'app/actions';


export default class Sidebar extends Component {

    render() {
        return <div className="col-sm-3 col-md-2 sidebar">
            <ul className="nav nav-sidebar">
                <li className="active" onClick={this.onClickQuery.bind(this)}>
                    <a href="#"><i className="fa fa-pencil-square-o"></i> Query</a>
                </li>
            </ul>
            <ul className="nav nav-sidebar">
                <li onClick={this.onClickTable.bind(this)}><a href="#"><i className="fa fa-table"></i> users</a></li>
                <li onClick={this.onClickTable.bind(this)}><a href="#"><i className="fa fa-table"></i> roles</a></li>
                <li onClick={this.onClickTable.bind(this)}><a href="#"><i className="fa fa-table"></i> projects</a></li>
                <li onClick={this.onClickTable.bind(this)}><a href="#"><i className="fa fa-table"></i> assignments</a></li>
            </ul>
        </div>;
    }

    onClickQuery() {
        changePage('query');
    }

    onClickTable() {
        changePage('table');
    }
}
