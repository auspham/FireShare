import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import './styles/DragDrop.scss';
import AccountService from "../../api/AccountService";
import axios from "axios";


export default class ShareModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allUser: [],
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.show !== this.props.show) {
            this.fetchUsers();
        }
    }

    fetchUsers = () => {
        AccountService.getAllUser().then(result => {
            console.log(result);
            this.setState({ allUser: result.data });
        })
    };

    render() {
        return <Modal show={this.props.show} onHide={() => this.props.openModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Upload file</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6>Type in the user's email you want to share with</h6>
                    <input type="text" className="form-control" placeholder="Recipient's username"
                           aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <div className="listUser">
                        {this.state.allUser.map((user, i) => {
                            return (<div className={"userHolder"} key={user._id}>{user.email}</div>)
                        })}
                    </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => this.props.openModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.uploadFile}>
                    Upload File
                </Button>
            </Modal.Footer>
        </Modal>
    }
}
