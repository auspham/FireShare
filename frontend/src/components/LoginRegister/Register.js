import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import AuthenticationService from "../../api/AuthenticationService";
import CustomAlert from "../Notification/CustomAlert";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: false
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        AuthenticationService.registerNewAccount(this.state.email, this.state.password)
            .then(() => {
                this.setState({ redirect: true });
                this.props.showAlert(
                    'Successful!',
                    'Look who just got an account',
                    'success');
            })
            .catch((err) => {
                console.error(err);
                this.props.showAlert(
                    'Error!',
                    'Sorry, email is already in used',
                    'warning');
            });
    };


    render() {
        const { redirect } = this.state;
        if (redirect) return <Redirect to="/login"/>

        return <div className="container">
            <div className="row">
                <div className="col-lg-10 col-xl-9 mx-auto">
                    <div className="card card-signin flex-row my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Register</h5>
                            <form className="form-signin" onSubmit={this.handleSubmit}>
                                <div className="form-label-group">
                                    <input type="email" name="email" id="inputEmail" className="form-control"
                                           placeholder="Email address" onChange={this.handleChange} required/>
                                        <label htmlFor="inputEmail">Email address</label>
                                </div>

                                <div className="form-label-group">
                                    <input type="password" name="password" id="inputPassword" className="form-control"
                                           placeholder="Password" onChange={this.handleChange} required/>
                                   <label htmlFor="inputPassword">Password</label>
                                </div>

                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                                    Register
                                </button>

                                <Link to="/login" className="d-block text-center mt-2 small">Sign In</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}