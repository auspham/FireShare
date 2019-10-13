import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import AccountService from "../../api/AccountService";
export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        }
    }

    componentDidMount() {
        AccountService.retrieveInfo().then(result => {
            this.setState({email: result.data.email });
        }).catch(error => {
            console.error(error);
        })
    }

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">FireShare</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">

                    </Nav>
                    <Navbar.Text style={{color: "black"}}>{this.state.email}</Navbar.Text>
                    <Button className={"ml-2"} variant={"outline-dark"}>Log out</Button>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}