import React from 'react';


export default class DataTable extends React.Component {

    render() {
        var result = this.props.result;
        if (result === null)
            return <div></div>;
        if (result.fields.length == 0)
            return <p className="text-muted" style={{marginTop: '20px'}}>No results.</p>;
        return <div className="table-responsive data-table">
            <table className="table table-bordered table-condensed table-hover">
                <thead>
                    <tr>
                        {result.fields.map((field) => <th>{field.name}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        </div>;
    }

    renderRows(rows) {
        var result = this.props.result;
        if (result.rows.length == 0)
            return <tr><td colSpan={result.fields.length}><em className="text-muted">No data.</em></td></tr>;
        return result.rows.map((row) => this.renderRow(result.fields, row));
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
        if (value === '')
            return <em className="text-muted">EMPTY STRING</em>
        else if (value === true)
            return <em className="text-success">TRUE</em>;
        else if (value === false)
            return <em className="text-danger">FALSE</em>;
        else
            return value;
    }
}
