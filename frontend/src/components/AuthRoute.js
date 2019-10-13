import React, { Component, cloneElement, Children } from 'react'
import {Route, Redirect } from "react-router-dom";

const AuthRoute = ({ children, authed, ...rest }) => {
    return(<Route {...rest} exact render={(props) => authed ?
            <>
                {Children.map(children, child => cloneElement(child, { ...child.props }))}
            </>
            : <Redirect to={process.env.PUBLIC_URL + "/login"}/>} />
    )
}

export default AuthRoute;