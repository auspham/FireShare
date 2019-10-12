import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import UserHolder from "./UserHolder";
import AccountService from "../../api/AccountService";

export default class DeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: this.props.file
        }
    }

    deleteFile = () => {
        const { file } = this.state;
        AccountService.deleteFile(file._id).then(() => {
            this.props.showAlert(
                'Success!',
                `Done, you have successfully deleted ${file.name}.`,
                'primary');
            this.props.openModal(false);
            this.props.fetchFile();
        }).catch(err => {
            this.props.showAlert(
                'Error!',
                `Hmmm, something is wrong.`,
                'danger');
            this.props.openModal(false);
        });
    }

    render() {
        const { file } = this.state;
        return <Modal show={this.props.show} onHide={() => this.props.openModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Delete a file</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6 className={"text-center"}>Delete a file can cause permanently removed</h6>
                <p className={"text-center"}>Are you sure you want to delete <i>{file.name}</i>?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => this.props.openModal(false)}>
                    Close
                </Button>
                <Button variant={"danger"} onClick={this.deleteFile}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    }
}