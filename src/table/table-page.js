import React from 'react';
import Component from 'app/component';


export default class TablePage extends Component {

    render() {
        return <div className="table-page">
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
