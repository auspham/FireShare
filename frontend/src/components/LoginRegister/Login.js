import React, { Component } from 'react';
import './styles/Login.scss';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from "react-router-dom";
import AuthenticationService from "../../api/AuthenticationService";
import Loading from "../Modals/Loading";

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
            valid: false,
            loading: false,
        }
    }

    componentDidMount() {
        if(AuthenticationService.isUserLoggedIn() && !this.props.isLoggedIn) {
            this.props.history.push('/dashboard');
        }
    }

    inputChecking = () => {
        const { email, password } = this.state;
        return password.length >= 6 && password.length <= 100
            && email.length >= 6 && email.length < 1000
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => {
            const { retype, password } = this.state;

            if (this.inputChecking()) {
                this.setState({ valid: true });
            } else {
                this.setState({ valid: false });
            }
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const { history, isLoggedIn, handleLogin } = this.props;
        AuthenticationService.authenticateAccount(this.state.email, this.state.password)
            .then(() => {
                if(isLoggedIn === false) {
                    handleLogin();
                    history.push('/dashboard');
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({ loading: false });
                this.props.showAlert(
                    'Error!',
                    'Sorry, we cannot verify your account',
                    'danger');
            });
    };


    render() {
        const { valid, loading } = this.state;
        return <>
            {loading && <Loading/>}

            <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Sign In</h5>
                            <form className="form-signin" autoComplete="off">
                                <div className="form-label-group">
                                    <input type="email" name="email" id="inputEmail" className="form-control"
                                           placeholder="Email address" onChange={this.handleChange} required autoFocus
                                           autoComplete="off"/>
                                    <label htmlFor="inputEmail">Email address</label>
                                </div>

                                <div className="form-label-group">
                                    <input type="password" name="password" id="inputPassword" className="form-control"
                                           placeholder="Password" onChange={this.handleChange} required autoComplete="off"/>
                                    <label htmlFor="inputPassword">Password</label>
                                </div>

                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit"
                                        onClick={this.handleSubmit} disabled={valid ? "" : "disabled"}>
                                    Sign in
                                </button>

                                <Link to={"/register"} className="d-block text-center mt-2 small">Sign Up</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    }
}

export default withRouter(Login);