import axios from "axios";
import React, { Component } from 'react';
import AccountService from '../../api/AccountService'
import './styles/Dashboard.scss'
import {Button, Table} from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import UploadModal from "../Modals/UploadModal";
import CustomAlert from "../Notification/CustomAlert";
import ShareModal from "../Modals/ShareModal";
import MyFile from "./MyFile";
import SharedWithMeFile from "./SharedWithMeFile";
import DeleteModal from "../Modals/DeleteModal";
import Loading from "../Modals/Loading";
import NavBar from "./NavBar";
import * as io from 'socket.io-client';
import { API_URL } from '../../Constants'

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
            fileToDelete: null,
            showDelete: false,
            loading: true,
            total: []
        }
        this.socket = io(API_URL);
    }

    componentDidMount() {
        axios.defaults.headers.common['auth-token'] = sessionStorage.getItem('USER_TOKEN');
        this.fetchFiles();
    }

    handleSocket = () => {
        const { total } = this.state;
        total.forEach(file => {
            this.socket.emit('subscribe', file);
        });
        this.socket.on("update", () => {
            console.log("update");
            this.fetchFiles();
        });
    };

    fetchFiles = () => {
        this.setState({
            loading: true,
        });
        AccountService.retrieveFiles().then(result => {
            console.log(result);
            this.setState({
                myFiles: result.data.myFiles,
                sharedWithMe: result.data.sharedWithMe,
                total: result.data.total,
                loading: false,
            }, () => {this.handleSocket()});
        })
    };

    openModal = (option) => {
        this.setState({showUpload: option })
    };

    openShareModal = (option) => {
        this.setState({ showShare: option })
    };

    openDeleteModal = (option) => {
        this.setState({ showDelete: option })
    };

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
    };

    deleteFile = (file) => {
        this.setState({
            showDelete: true,
            fileToDelete: file
        })
    };

    render() {
        return <>
            <NavBar/>
            <div className="container mt-5 align-content-center">
            {this.state.loading && <Loading/>}
            <CustomAlert show={this.state.showAlert} heading={this.state.heading}
                         message={this.state.message} type={this.state.type}
                         handleShow={this.handleShow} />

            {this.state.showUpload &&
            <UploadModal show={this.state.showUpload} openModal={this.openModal}
                         showAlert={this.showAlert} fetchFiles={this.fetchFiles}/>}

            {this.state.showShare &&
            <ShareModal show={this.state.showShare} openModal={this.openShareModal}
                         showAlert={this.showAlert} file={this.state.selectedFile}/>}

            {this.state.showDelete &&
            <DeleteModal show={this.state.showDelete} openModal={this.openDeleteModal}
                         fetchFiles={this.fetchFiles} showAlert={this.showAlert}
                         file={this.state.fileToDelete}/>}

            <div className="table-head">
                <div className="pull-left">
                    <p>My File</p>
                </div>
                <div className="pull-right">
                    <Button className="mb-2 float-right" onClick={() => {this.openModal(true)}}>Upload file</Button>
                </div>
                <div className="clearfix"></div>
            </div>

            <MyFile myFiles={this.state.myFiles} selectFile={this.selectFile}
                    deleteFile={this.deleteFile} fetchFiles={this.fetchFiles}
                    showAlert={this.showAlert}/>

            <div className="table-head">
                <div className="pull-left">
                    <p>Shared with me</p>
                </div>
                <div className="clearfix"></div>
            </div>

            <SharedWithMeFile sharedWithMe={this.state.sharedWithMe}
                              showAlert={this.showAlert} fetchFiles={this.fetchFiles}/>
        </div>
        </>
    }
}

export default withRouter(Dashboard);