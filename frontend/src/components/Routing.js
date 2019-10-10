import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from "react-router-dom";
import Dashboard from './Main/Dashboard';
import NotFound from './NotFound';
import AuthenticationService from '../api/AuthenticationService';
import AuthRoute from "./AuthRoute";
import LoginRegister from './LoginRegister/LoginRegister'

class Routing extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/"><LoginRegister /></Route>
                    <Route path="/login"><LoginRegister /></Route>
                    <Route path="/register"><LoginRegister/></Route>
                    <AuthRoute authed={AuthenticationService.isUserLoggedIn()} path="/dashboard">
                        <Dashboard/>
                    </AuthRoute>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        )
    }
}

export default Routing;