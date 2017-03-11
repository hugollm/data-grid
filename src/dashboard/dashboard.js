import React from 'react';

import Component from 'app/component';
import store from 'app/store';

import Navbar from './navbar';
import Sidebar from './sidebar';

import QueryPage from 'query/query-page';
import TablePage from 'table/table-page';

import './style.scss';


export default class Dashboard extends Component {

    render() {
        return <div className="dashboard">
            <Navbar/>
            <div className="container-fluid">
                <div className="row">
                    <Sidebar/>
                    <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                        {this.renderPage()}
                    </div>
                </div>
            </div>
        </div>;
    }

    renderPage() {
        var page = store.get('app.page');
        if (page == 'query')
            return <QueryPage/>;
        else if (page == 'table')
            return <TablePage/>;
        else
            return <div>{page}</div>;
    }
}
