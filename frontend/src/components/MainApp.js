import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './LoginRegisterComponent/Login'
import Register from './LoginRegisterComponent/Register'
import NotFound from './NotFound'

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