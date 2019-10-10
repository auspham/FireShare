import React, { Component } from 'react';
import AccountService from '../../api/AccountService'
import AuthenticationService from "../../api/AuthenticationService";
import './styles/Dashboard.scss'
import {Button, Table} from "react-bootstrap";
import { withRouter } from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    componentDidMount() {
        AuthenticationService.setupAxiosConfigure(sessionStorage.getItem('USER_TOKEN'));

        AccountService.retrieveInfo().then(result => {
            this.setState({
                message: result.data._id
            });
            console.log(result);
        })
    }

    render() {
        return <div className="container mt-5">
            <div className="table-head">
                <div class="pull-left">
                    <p>My File</p>
                </div>
                <div className="pull-right">
                    <Button className="mb-2 float-right">Upload file</Button>
                </div>
                <div className="clearfix"></div>
            </div>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>File ID</th>
                    <th>File name</th>
                    <th>Modified</th>
                    <th>Owner</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>1 min</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>2 min</td>
                    <td>@fat</td>
                </tr>

                </tbody>
            </Table>
        </div>
    }
}

export default withRouter(Dashboard);