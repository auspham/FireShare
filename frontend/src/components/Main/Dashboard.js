import React, { Component } from 'react';
import AccountService from '../../api/AccountService'
import './styles/Dashboard.scss'
import {Button, Table} from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import UploadModal from "../Modals/UploadModal";
import CustomAlert from "../Notification/CustomAlert";

import axios from "axios";
import ShareModal from "../Modals/ShareModal";
import MyFile from "./MyFile";
import SharedWithMeFile from "./SharedWithMeFile";
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

            <MyFile myFiles={this.state.myFiles} selectFile={this.selectFile}/>
            <div className="table-head">
                <div className="pull-left">
                    <p>Shared with me</p>
                </div>
                <div className="clearfix"></div>
            </div>
            <SharedWithMeFile sharedWithMe={this.state.sharedWithMe}/>

        </div>
    }
}

export default withRouter(Dashboard);