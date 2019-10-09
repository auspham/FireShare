import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './login/Login'
import NotFound from './NotFound'
import Register from './login/Register'

export default class MainApp extends Component {
    render() {
        return (
            <Router>
                 <Switch>
                            <Route path={["/", "/login"]} exact component={Login} />
                            <Route path={"/register"} component={Register} />
                            <Route component={NotFound} />
                    </Switch>
            </Router>
        )
    }
}