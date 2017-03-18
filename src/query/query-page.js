import React from 'react';
import Component from 'app/component';

import { query } from './actions';
import './style.scss';


export default class QueryPage extends Component {

    constructor() {
        super();
        this.state = {sql: '', result: null};
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
        return <div className="query-page" onKeyDown={this.onKeyDown.bind(this)}>
            <button className="btn btn-default" onClick={this.onClickRun.bind(this)}>
                <i className="fa fa-play"></i> Run <span className="text-muted">(F5)</span>
            </button>
            <textarea name="sql" className="form-control" rows="5" onChange={this.onChangeSql.bind(this)}>{sql}</textarea>
            {this.renderRows()}
        </div>;
    }

    renderRows() {
        var result = this.state.result;
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
