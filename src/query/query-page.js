import React from 'react';
import Component from 'app/component';
import './style.scss';


export default class QueryPage extends Component {

    render() {
        return <div className="query-page">
            <button className="btn btn-default"><i className="fa fa-play"></i> Run <span className="text-muted">(F5)</span></button>
            <textarea className="form-control" rows="5"></textarea>
            <table className="table table-bordered table-striped table-responsive">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>email</th>
                        <th>admin</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Lorem Ipsum</td>
                        <td>lorem.ipsum@gmail.com</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>Lorem Ipsum</td>
                        <td>lorem.ipsum@gmail.com</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>Lorem Ipsum</td>
                        <td>lorem.ipsum@gmail.com</td>
                        <td>false</td>
                    </tr>
                </tbody>
            </table>
        </div>;
    }
}
