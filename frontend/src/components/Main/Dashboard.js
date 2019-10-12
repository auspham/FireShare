import React, { Component } from 'react';
import AccountService from '../../api/AccountService'
import './styles/Dashboard.scss'
import {Button, Table} from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import UploadModal from "./UploadModal";
import CustomAlert from "../Notification/CustomAlert";
import { API_URL } from '../../Constants'
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ShareModal from "./ShareModal";
import AuthenticationService from "../../api/AuthenticationService";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myFiles: [],
            sharedWithMe: [],
            showUpload: false,
            showAlert: false,
            showShare: false,
            selectedFile: null,
        }
    }

    componentDidMount() {
        axios.defaults.headers.common['auth-token'] = sessionStorage.getItem('USER_TOKEN');
        this.fetchFiles();
    }

    fetchFiles = () => {
        AccountService.retrieveInfo().then(result => {
            console.log(result);
            this.setState({
                myFiles: result.data.myFiles,
                sharedWithMe: result.data.sharedWithMe
            });
            console.log(result);
        })
    }

    openModal = (option) => {
        this.setState({showUpload: option })
    };

    openShareModal = (option) => {
        this.setState({ showShare: option })
    }

    handleShow = (value) => {
        this.setState({
            showAlert: value
        });
        setTimeout(() => {
            this.setState({showAlert: false})
        },2000);
    };

    showAlert = (heading, message, type) => {
        this.handleShow(true);

        this.setState({
            heading: heading,
            message: message,
            type: type,
        });
    };

    selectFile = (file) => {
        this.setState({
            selectedFile: file,
            showShare: true
        })
    }

    render() {
        return <div className="container mt-5 align-content-center">
            <CustomAlert show={this.state.showAlert} heading={this.state.heading}
                         message={this.state.message} type={this.state.type}
                         handleShow={this.handleShow} />

            <UploadModal show={this.state.showUpload} openModal={this.openModal}
                         showAlert={this.showAlert} fetchFile={this.fetchFiles}/>

            {this.state.showShare &&
            <ShareModal show={this.state.showShare} openModal={this.openShareModal}
                         showAlert={this.showAlert} file={this.state.selectedFile}/>}

            <div className="table-head">
                <div className="pull-left">
                    <p>My File</p>
                </div>
                <div className="pull-right">
                    <Button className="mb-2 float-right" onClick={() => {this.openModal(true)}}>Upload file</Button>
                </div>
                <div className="clearfix"></div>
            </div>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>File ID</th>
                    <th>File name</th>
                    <th>Size (kb)</th>
                    <th>Modified</th>
                    <th>Owner</th>
                    <th>Download</th>
                    <th>Share</th>
                </tr>
                </thead>
                <tbody>
                {this.state.myFiles.map((file,i) => {
                    return (<tr key={i}>
                        <td>{i}</td>
                        <td>{file._id}</td>
                        <td>{file.name}</td>
                        <td>{file.size / 100000 * 100}</td>
                        <td>{moment(file.date).fromNow()}</td>
                        <td>{file.ownerEmail}</td>
                        <td><a href={`${API_URL}/${file.download}`} target="_blank">Download</a></td>
                        <td className="text-center shareIcon">
                            <FontAwesomeIcon icon={faUserPlus} onClick={() => {
                                this.selectFile(file._id);
                            }}
                        /></td>
                    </tr>)
                })}
                {this.state.sharedWithMe.map((file,i) => {
                    return (<tr key={i}>
                        <td>{i}</td>
                        <td>{file._id}</td>
                        <td>{file.name}</td>
                        <td>{file.size / 100000 * 100}</td>
                        <td>{moment(file.date).fromNow()}</td>
                        <td>{file.ownerEmail}</td>
                        <td><a href={`${API_URL}/${file.download}`} target="_blank">Download</a></td>
                        <td className="text-center shareIcon">
                            <FontAwesomeIcon icon={faUserPlus} onClick={() => {
                                this.selectFile(file._id);
                            }}
                            /></td>
                    </tr>)
                })}
                </tbody>
            </Table>
        </div>
    }
}

export default withRouter(Dashboard);