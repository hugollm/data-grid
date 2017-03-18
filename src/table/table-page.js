import React from 'react';

import Component from 'app/component';
import DataTable from './data-table';

import store from 'app/store';
import { loadTableData } from './actions';
import './style.scss';


export default class TablePage extends Component {

    constructor() {
        super();
        this.updateOnData('dashboard.tableData');
    }

    render() {
        return <div className="table-page">
            {this.renderPagination()}
            <DataTable result={store.get('dashboard.tableData')}/>
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
}
