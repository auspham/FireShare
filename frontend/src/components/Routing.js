import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import MainApp from './Main/MainApp';
import NotFound from './NotFound';
import AuthenticationService from '../api/AuthenticationService';
import AuthRoute from "./AuthRoute";
import LoginRegister from './LoginRegister/LoginRegister'

export default class Routing extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login"><LoginRegister /></Route>
                    <Route path="/register"><LoginRegister/></Route>
                    <AuthRoute authed={AuthenticationService.isUserLoggedIn()} path="/">
                        <MainApp/>
                    </AuthRoute>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        )
    }
}