import React from 'react';
import Component from 'app/component';

import { changePage } from 'app/actions';
import './style.scss';


export default class ConnectionsPage extends Component {

    render() {
        return <div className="container connections-page">
            <div className="page-header">
                <button className="btn btn-link"><i className="fa fa-plus"></i> Add connection</button>
            </div>
            {this.renderConnections()}
        </div>;
    }

    renderConnections() {
        return <ul className="list-group">
            {this.renderConnection()}
            {this.renderConnection()}
            {this.renderConnection()}
        </ul>;
    }

    renderConnection() {
        return <li className="list-group-item connection" onClick={this.onClickConnection.bind(this)}>
            <div className="pull-left">
                <i className="fa fa-database"></i>
            </div>
            <div>
                <span>mydb</span> <br/>
                <span className="text-muted">localhost</span>
            </div>
        </li>;
    }

    onClickConnection() {
        changePage('query');
    }
}
