import React from 'react';

import Component from 'app/component';
import DataTable from 'table/data-table';

import store from 'app/store';
import { query } from './actions';
import './style.scss';


export default class QueryPage extends Component {

    constructor() {
        super();
        this.state = {sql: '', result: null};
        this.updateOnData('query.error');
    }

    onKeyDown(e) {
        if (e.which == 116)
            this.onClickRun();
    }

    onChangeSql(e) {
        this.setState({sql: e.target.value});
    }

    onClickRun() {
        query(this.state.sql, [], (result) => {
            this.setState({result: result});
        });
    }

    render() {
        var sql = this.state.sql;
        var error = store.get('query.error');
        return <div className="query-page" onKeyDown={this.onKeyDown.bind(this)}>
            <button className="btn btn-default" onClick={this.onClickRun.bind(this)}>
                <i className="fa fa-play"></i> Run <span className="text-muted">(F5)</span>
            </button>
            <textarea name="sql" className="form-control" rows="5" onChange={this.onChangeSql.bind(this)}>{sql}</textarea>
            {error ? <p className="text-danger">{error}</p> : <DataTable result={this.state.result}/>}
        </div>;
    }
}
