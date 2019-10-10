import React, { Component } from 'react';
import './styles/Login.scss';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import AuthenticationService from "../../api/AuthenticationService";
import CustomAlert from '../Notification/CustomAlert';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            show: false,
            heading: '',
            message: '',
            type: '',
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        AuthenticationService.authenticateAccount(this.state.email, this.state.password)
            .then(() => {
                console.log('redirect');
                this.setState({ redirect: true });
            })
            .catch((err) => {
                this.props.showAlert(
                    'Error!',
                    'Sorry, we cannot verify your account',
                    'danger');
            });
    };


    render() {
        const { redirect } = this.state;
        if (redirect) return <Redirect to="/dashboard" exact/>

        return <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Sign In</h5>
                            <form className="form-signin" onSubmit={this.handleSubmit}>
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

                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
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

