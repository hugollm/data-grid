import React from 'react';
import Component from 'app/component';

import store from 'app/store';
import { loadTableData } from './actions';
import './style.scss';


export default class TablePage extends Component {

    constructor() {
        super();
        this.state = {result: null};
        this.updateOnData('dashboard.tableData');
    }

    render() {
        var result = store.get('dashboard.tableData');
        if (result === null)
            return <div></div>;
        return <div className="table-page">
            {this.renderPagination()}
            {this.renderRows()}
        </div>;
    }

    renderPagination() {
        return <nav aria-label="Page navigation">
            <ul className="pagination">
                <li>
                    <a href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li><a href="#">1 / 321</a></li>
                <li>
                    <a href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>;
    }

    renderRows() {
        var result = store.get('dashboard.tableData');
        if (result === null)
            return;
        if (result.fields.length == 0)
            return <p className="text-muted" style={{marginTop: '20px'}}>No results.</p>;
        return <div className="table-responsive">
            <table className="table table-bordered table-condensed table-hover">
                <thead>
                    <tr>
                        {result.fields.map((field) => <th>{field.name}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {result.rows.map((row) => this.renderRow(result.fields, row))}
                </tbody>
            </table>
        </div>;
    }

    renderRow(fields, row) {
        var values = [];
        for (var i in fields)
            values.push(<td>{this.renderValue(row[fields[i].name])}</td>);
        return <tr>{values}</tr>;
    }

    renderValue(value) {
        if (value === null)
            return <em className="text-muted">NULL</em>;
        else if (value === true)
            return <em className="text-muted">TRUE</em>;
        else if (value === false)
            return <em className="text-muted">FALSE</em>;
        else
            return value;
    }
}
