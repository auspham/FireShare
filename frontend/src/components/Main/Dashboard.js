import React, { Component } from 'react';
import AccountService from '../../api/AccountService'
import AuthenticationService from "../../api/AuthenticationService";
export default class Dashboard extends Component {
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
        return <h1>{this.state.message}</h1>
    }
}
