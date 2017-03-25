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

    onClickFirstPage() {
        changeTablePage(1);
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

    onClickLastPage() {
        changeTablePage(this.maxPage());
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
                {this.renderFirstPageButton()}
                {this.renderPreviousPageButton()}
                <li className="page-counter">
                    <a href="#">{store.get('table.page')} / {this.maxPage()}</a>
                </li>
                {this.renderNextPageButton()}
                {this.renderLastPageButton()}
            </ul>
        </nav>;
    }

    renderFirstPageButton() {
        var inFirst = store.get('table.page') === 1;
        var className = inFirst ? 'disabled' : '';
        return <li className={className} onClick={this.onClickFirstPage.bind(this)}>
            <a href="#" aria-label="Previous">
                <i className="fa fa-fast-backward"></i>
            </a>
        </li>;
    }

    renderPreviousPageButton() {
        var hasPrevious = store.get('table.page') > 1;
        var className = hasPrevious ? '' : 'disabled';
        return <li className={className} onClick={this.onClickPreviousPage.bind(this)}>
            <a href="#" aria-label="Previous">
                <i className="fa fa-step-backward"></i>
            </a>
        </li>;
    }

    renderNextPageButton() {
        var hasNext = store.get('table.page') < this.maxPage();
        var className = hasNext ? '' : 'disabled';
        return <li className={className} onClick={this.onClickNextPage.bind(this)}>
            <a href="#" aria-label="Next">
                <i className="fa fa-step-forward"></i>
            </a>
        </li>;
    }

    renderLastPageButton() {
        var inLast = store.get('table.page') === this.maxPage();
        var className = inLast ? 'disabled' : '';
        return <li className={className} onClick={this.onClickLastPage.bind(this)}>
            <a href="#" aria-label="Next">
                <i className="fa fa-fast-forward"></i>
            </a>
        </li>;
    }
}
