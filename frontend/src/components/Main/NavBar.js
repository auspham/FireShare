import React, { Component } from 'react';
import { Navbar, Nav, Button } from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import AccountService from "../../api/AccountService";
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        }
    }

    componentDidMount() {
        AccountService.retrieveInfo().then(result => {
            this.setState({ email: result.data.email });
            this.props.socket.emit('register', result.data._id);
        }).catch(error => {
            console.error(error);
        })
    }

    logout = () => {
        sessionStorage.clear();
        this.props.socket.emit('disconnect');
        window.location.reload();
    };

    render() {
        return (
            <Navbar bg="light" expand="lg" sticky="top">
                <Navbar.Brand href="#home">FireShare</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">

                    </Nav>
                    <Navbar.Text style={{color: "black"}}>{this.state.email}</Navbar.Text>
                    <Button className={"ml-2"} variant={"outline-dark"}
                            onClick={this.logout}>Log out</Button>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default withRouter(NavBar);