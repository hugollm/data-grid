import React from 'react';

import Component from 'app/component';
import DataTable from './data-table';

import store from 'app/store';
import { countTableRows, loadTableData, changeTablePage } from './actions';
import './style.scss';


export default class TablePage extends Component {

    constructor() {
        super();
        this.updateOnData('table');
    }

    onClickPreviousPage() {
        var page = store.get('table.page') - 1;
        if (page < 1)
            page = 1;
        changeTablePage(page);
    }

    onClickNextPage() {
        var page = store.get('table.page') + 1;
        var tableCount = store.get('table.count');
        var maxPage = this.maxPage();
        if (tableCount === null)
            page = 1;
        else if (page > maxPage)
            page = maxPage;
        changeTablePage(page);
    }

    maxPage() {
        var maxPage = Math.ceil(store.get('table.count') / store.get('table.perPage'));
        if (maxPage === 0)
            maxPage = 1;
        return maxPage;
    }

    render() {
        return <div className="table-page">
            {this.renderPagination()}
            <DataTable result={store.get('table.data')}/>
        </div>;
    }

    renderPagination() {
        return <nav aria-label="Page navigation">
            <ul className="pagination">
                <li onClick={this.onClickPreviousPage.bind(this)}>
                    <a href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li><a href="#">{store.get('table.page')} / {this.maxPage()}</a></li>
                <li onClick={this.onClickNextPage.bind(this)}>
                    <a href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>;
    }
}
