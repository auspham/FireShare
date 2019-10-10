import React, { Component } from "react";
import { Alert } from 'react-bootstrap';
import './styles/Alert.scss';

export default class CustomAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show
        }
    }

    render() {
        return <Alert className={"fix-alert"} show={this.props.show}
                       variant={this.props.type}
                       onClose={() => this.props.handleShow(false)} dismissible>
            <Alert.Heading>{this.props.heading}</Alert.Heading>
            <p>
                {this.props.message}
            </p>
        </Alert>
    }
}