import React from 'react';
import Component from 'app/component';
import './style.scss';


export default class TablePage extends Component {

    render() {
        return <div className="table-page">
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li>
                        <a href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li><a href="#">1 / 321</a></li>
                    <li>
                        <a href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
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
