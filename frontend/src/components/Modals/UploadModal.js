import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import './styles/DragDrop.scss';
import AccountService from "../../api/AccountService";

export default class UploadModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            onDrag: false
        }
        this.fileInput = React.createRef();
    }


    handleOnDrag = (event) => {
        event.preventDefault();

        this.setState({
            onDrag: true
        })
    };

    handleOnDragLeave = () => {
        this.setState({
            onDrag: false
        })
    };

    handleTraditionUploadFile = (event) => {
        const { file } = this.state;

        if (file) this.props.showAlert(
            'Watch out!',
            'You are overriding your previous file',
            'warning');

        this.setState({
            file: event.target.files[0],
        })
    };

    handleDropFile = (event) => {
        event.preventDefault();

        const { file } = this.state;

        if (file) this.props.showAlert(
            'Watch out!',
            'You are overriding your previous file',
            'warning');

        this.setState({
            onDrag: false,
            file: event.dataTransfer.files[0]
        });

        console.log(event.dataTransfer.files[0]);

    };

    openFileDialog = () => {
        this.fileInput.current.click();
    };

    uploadFile = () => {
        const { file } = this.state;

        if (file) {
            AccountService.uploadFile(file).then(r => {
                this.props.openModal(false);
                this.props.fetchFiles();
                this.setState({file: null});
                this.props.showAlert(
                    'Success!',
                    'We are uploading your file..',
                    'success');
            }).catch(error => {
                this.props.showAlert(
                    'Error!',
                    'Uh oh, something is wrong',
                    'danger');
            });

        } else {
            this.props.showAlert(
                'Warning!',
                'You have to choose a file first',
                'danger');
        }
    };

    render(){
        const { onDrag, file } = this.state;

        return <Modal show={this.props.show} onHide={() => this.props.openModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Upload file</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6>Click to select files from your computer or drag and drop to the area</h6>

                <input className="d-none" ref={this.fileInput} type="file" name="files[]"
                       onChange={this.handleTraditionUploadFile}/>

                <div className={"upload-drop-zone" + (onDrag ? " drop" : "")} id="drop-zone"
                     onDragOver={this.handleOnDrag} onDrop={this.handleDropFile} onDragLeave={this.handleOnDragLeave}
                     onClick={this.openFileDialog}>
                    {file ? `You have chosen ${file.name}` : "Just drag and drop files here"}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => this.props.openModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.uploadFile}
                        disabled={file !== null ? "": "disabled"}>
                    Upload File
                </Button>
            </Modal.Footer>
        </Modal>
    }
}
