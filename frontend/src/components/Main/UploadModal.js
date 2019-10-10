import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import './styles/DragDrop.scss';

export default class UploadModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onDrag: false
        }
    }

    ok = () => {
    };

    handleOnDrag = () => {
        this.setState({
            onDrag: true
        })
    };

    handleOnDragLeave = () => {
        this.setState({
            onDrag: false
        })
    };

    handleDropFile = (event) => {
        this.setState({
            onDrag: false
        });

        this.uploadFile(event.dataTransfer.files);
    };

    uploadFile = (file) => {

    };

    render(){
        const { onDrop } = this.state;

        return <Modal show={this.props.show} onHide={() => this.props.openModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Upload file</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Select files from your computer</h5>
                <form action="" method="post" encType="multipart/form-data" id="js-upload-form">
                    <div className="form-inline">
                        <div className="form-group">
                            <input type="file" name="files[]" id="js-upload-files" multiple/>
                        </div>
                    </div>
                </form>

                <h5>Or drag and drop files below</h5>
                <div className={"upload-drop-zone" + (onDrop ? " drop" : "")} id="drop-zone"
                     onDragOver={this.handleOnDrag} onDrop={this.handleDropFile} onDragLeave={this.handleOnDragLeave}>
                    Just drag and drop files here
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
