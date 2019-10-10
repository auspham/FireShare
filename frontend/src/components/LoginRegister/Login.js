import React, { Component } from 'react';
import './styles/Login.scss';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from "react-router-dom";
import AuthenticationService from "../../api/AuthenticationService";
import CustomAlert from '../Notification/CustomAlert';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            show: false,
            heading: '',
            message: '',
            type: '',
            redirect: false
        }
    }

    componentDidMount() {
        if(AuthenticationService.isUserLoggedIn() && !this.props.redirect) {
            this.props.handleLogin();
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { history, redirect, handleLogin } = this.props;
        AuthenticationService.authenticateAccount(this.state.email, this.state.password)
            .then(() => {
                if(redirect === false) {
                    handleLogin();
                    history.push('/dashboard');
                }
            })
            .catch((err) => {
                console.log(err)
                this.props.showAlert(
                    'Error!',
                    'Sorry, we cannot verify your account',
                    'danger');
            });
    };


    render() {
        // const { redirect } = this.state;
        // if (redirect) return <Redirect exact to="/dashboard"/>

        return <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Sign In</h5>
                            <form className="form-signin">
                                <div className="form-label-group">
                                    <input type="email" name="email" id="inputEmail" className="form-control"
                                           placeholder="Email address" onChange={this.handleChange} required autoFocus/>
                                    <label htmlFor="inputEmail">Email address</label>
                                </div>

                                <div className="form-label-group">
                                    <input type="password" name="password" id="inputPassword" className="form-control"
                                           placeholder="Password" onChange={this.handleChange} required/>
                                    <label htmlFor="inputPassword">Password</label>
                                </div>

                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit"
                                        onClick={this.handleSubmit}>
                                    Sign in
                                </button>

                                <Link to={"/register"} className="d-block text-center mt-2 small">Sign Up</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default withRouter(Login);