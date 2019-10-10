import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Login from './LoginRegister/Login';
import Register from './LoginRegister/Register';
import MainApp from './Main/MainApp';
import NotFound from './NotFound';
import AuthenticationService from '../api/AuthenticationService';
import AuthRoute from "./AuthRoute";

export default class Routing extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login"><Login /></Route>
                    <Route path="/register"><Register/></Route>
                    <AuthRoute authed={AuthenticationService.isUserLoggedIn()} path="/">
                        <MainApp/>
                    </AuthRoute>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        )
    }
}