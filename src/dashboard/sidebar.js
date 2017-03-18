import React from 'react';
import Component from 'app/component';

import store from 'app/store';
import { changePage } from 'app/actions';
import { loadTables, selectTable } from './actions';


export default class Sidebar extends Component {

    constructor() {
        super();
        this.updateOnData('dashboard.tables');
        this.updateOnData('dashboard.selectedTable');
    }

    componentDidMount() {
        loadTables();
    }

    onClickQuery() {
        selectTable(null);
        changePage('query');
    }

    onClickTable(tableName) {
        selectTable(tableName);
        changePage('table');
    }

    render() {
        var tables = store.get('dashboard.tables');
        return <div className="col-sm-3 col-md-2 sidebar">
            <ul className="nav nav-sidebar">
                {this.renderQueryItem()}
            </ul>
            <ul className="nav nav-sidebar">
                {tables.map((tableName) => this.renderTableItem(tableName))}
            </ul>
        </div>;
    }

    renderQueryItem() {
        var className = store.get('app.page') == 'query' ? 'active' : '';
        return <li onClick={this.onClickQuery.bind(this)} className={className}>
            <a href="#"><i className="fa fa-pencil-square-o"></i> Query</a>
        </li>;
    }

    renderTableItem(tableName) {
        var className = store.get('dashboard.selectedTable') == tableName ? 'active' : '';
        return <li onClick={() => this.onClickTable(tableName)} className={className}>
            <a href="#"><i className="fa fa-table"></i> {tableName}</a>
        </li>;
    }
}
