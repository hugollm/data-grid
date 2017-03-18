import React from 'react';
import Component from 'app/component';

import store from 'app/store';
import { changePage } from 'app/actions';
import { loadTables } from './actions';


export default class Sidebar extends Component {

    constructor() {
        super();
        this.updateOnData('dashboard.tables');
    }

    componentDidMount() {
        loadTables();
    }

    onClickQuery() {
        changePage('query');
    }

    onClickTable(tableName) {
        changePage('table');
    }

    render() {
        var tables = store.get('dashboard.tables');
        return <div className="col-sm-3 col-md-2 sidebar">
            <ul className="nav nav-sidebar">
                <li className="active" onClick={this.onClickQuery.bind(this)}>
                    <a href="#"><i className="fa fa-pencil-square-o"></i> Query</a>
                </li>
            </ul>
            <ul className="nav nav-sidebar">
                {tables.map((tableName) => this.renderTableItem(tableName))}
            </ul>
        </div>;
    }

    renderTableItem(tableName) {
        return <li onClick={() => this.onClickTable(tableName)}><a href="#"><i className="fa fa-table"></i> {tableName}</a></li>;
    }
}
