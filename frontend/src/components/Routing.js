import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from "react-router-dom";
import Dashboard from './Main/Dashboard';
import NotFound from './NotFound';
import AuthenticationService from '../api/AuthenticationService';
import AuthRoute from "./AuthRoute";
import CustomAlert from "./Notification/CustomAlert";
import Login from './LoginRegister/Login';
import Register from "./LoginRegister/Register";

class Routing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            heading: '',
            message: '',
            type: '',
            isLoggedIn: false
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

    handleLogIn = () => {
        this.setState({
            isLoggedIn: true
        })
    }

    render() {

        return (
            <> <CustomAlert show={this.state.show} heading={this.state.heading}
                         message={this.state.message} type={this.state.type}
                         handleShow={this.handleShow} />

            <Router basename={'/FireShare'}>
                <Switch>
                    <Route path="/login">
                        <Login handleLogin={this.handleLogIn}
                               isLoggedIn={this.state.isLoggedIn} showAlert={this.showAlert}/>
                    </Route>
                    <Route path="/register">
                        <Register isLoggedIn={this.state.isLoggedIn}
                                  showAlert={this.showAlert}/>
                    </Route>
                    <AuthRoute authed={AuthenticationService.isUserLoggedIn()} path="/dashboard">
                        <Dashboard/>
                    </AuthRoute>
                    <AuthRoute authed={AuthenticationService.isUserLoggedIn()} path="/">
                        <Dashboard/>
                    </AuthRoute>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
            </>
        )
    }
}

export default Routing;