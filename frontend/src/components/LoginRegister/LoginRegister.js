import React, { Component } from "react";
import CustomAlert from "../Notification/CustomAlert";

import Login from './Login'
import Register from "./Register";
import {withRouter, Redirect} from 'react-router-dom';

class LoginRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            heading: '',
            message: '',
            type: '',
            redirect: false
        }
    }

    componentDidMount() {
        if(sessionStorage.getItem('USER_TOKEN')) {
            this.setState({redirect: true});
        }
    }

    showAlert = (heading, message, type) => {
        this.handleShow(true);

        this.setState({
            heading: heading,
            message: message,
            type: type,
        });
    };

    handleShow = (value) => {
        this.setState({
            show: value
        });
        setTimeout(() => {
            this.setState({show: false})
        },2000);
    };


    render() {
        const { pathname } = this.props.location;
        const { showLogin } = this.state;

        const { redirect } = this.state;
        if (redirect) return <Redirect strict to="/dashboard"/>

        return <>
            <CustomAlert show={this.state.show} heading={this.state.heading}
                     message={this.state.message} type={this.state.type}
                     handleShow={this.handleShow} />
            {(pathname === '/register') ? (<Register showAlert={this.showAlert}/>) :
                (<Login showAlert={this.showAlert}/>)}
            </>
    }
}

export default withRouter(LoginRegister)