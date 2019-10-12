import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import './styles/DragDrop.scss';
import AccountService from "../../api/AccountService";


export default class ShareModal extends Component {
    render() {
        return <Modal show={this.props.show} onHide={() => this.props.openModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Upload file</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6>Type in the user's email you want to share with</h6>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Recipient's username"
                           aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                        <div className="listUser">

                        </div>
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
