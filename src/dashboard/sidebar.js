import React from 'react';
import Component from 'app/component';

import store from 'app/store';
import { changePage } from 'app/actions';
import { loadTables, selectTable } from './actions';


export default class Sidebar extends Component {

    constructor() {
        super();
        this.state = {filter: ''};
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

    onChangeFilter(e) {
        this.setState({filter: e.target.value.trim()});
    }

    render() {
        var tables = store.get('dashboard.tables');
        return <div className="col-sm-3 col-md-2 sidebar">
            <ul className="nav nav-sidebar">
                {this.renderQueryItem()}
            </ul>
            <ul className="nav nav-sidebar">
                {this.renderTableSearch()}
                {this.renderTableItems(tables)}
            </ul>
        </div>;
    }

    renderQueryItem() {
        var className = store.get('app.page') == 'query' ? 'active' : '';
        return <li onClick={this.onClickQuery.bind(this)} className={className}>
            <a href="#"><i className="fa fa-pencil-square-o"></i> Query</a>
        </li>;
    }

    renderTableSearch() {
        return <li>
            <input type="text" placeholder="Filter tables..."
                value={this.state.filter} onChange={this.onChangeFilter.bind(this)}/>
        </li>;
    }

    renderTableItems(tables) {
        var filter = this.state.filter;
        if (filter)
            tables = tables.filter((table) => table.indexOf(filter) !== -1);
        return tables.map((tableName) => this.renderTableItem(tableName));
    }

    renderTableItem(tableName) {
        var className = store.get('dashboard.selectedTable') == tableName ? 'active' : '';
        return <li onClick={() => this.onClickTable(tableName)} className={className}>
            <a href="#"><i className="fa fa-table"></i> {tableName}</a>
        </li>;
    }
}
