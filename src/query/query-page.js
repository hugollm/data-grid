import React from 'react';

import Component from 'app/component';
import DataTable from 'table/data-table';

import AceEditor from 'react-ace';
import 'brace/mode/sql';
import 'brace/theme/tomorrow';

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

    onChangeSql(sql) {
        this.setState({sql: sql});
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
            <AceEditor
                mode="sql"
                theme="tomorrow"
                highlightActiveLine={false}
                width="100%"
                minLines={5}
                maxLines={40}
                fontSize="16px"
                focus={true}
                value={sql}
                onChange={this.onChangeSql.bind(this)}
            />
            {error ? <p className="text-danger">{error}</p> : <DataTable result={this.state.result}/>}
        </div>;
    }
}
