import React, { Component } from 'react';
import {Dropdown, OverlayTrigger, Table, Tooltip} from "react-bootstrap";
import moment from "moment";
import {API_URL} from "../../Constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import AccountService from "../../api/AccountService";
import * as FileDownload from "js-file-download";

export default class MyFile extends Component {
    constructor(props) {
        super(props);
    }

    handleDownload = (file) => {
        AccountService.downloadFile(file.download).then((result) => {
            FileDownload(result.data, file.name);
            this.props.showAlert(
                'Success!',
                `Downloading ${file.name}.`,
                'info');
        }).catch(error => {
            console.error(error);
            this.props.showAlert(
                'Error!',
                `Uh oh, something is wrong.`,
                'danger');
        })
    };

    handleUnshare = (file) => {
        AccountService.unShareFile(file._id).then(result => {
            this.props.showAlert(
                'Success!',
                `You have unshared ${file.name} with ${file.ownerEmail}.`,
                'success');
            this.props.fetchFiles();
        }).catch(error => {
            this.props.showAlert(
                'Error!',
                `Uhh ohh, something is wrong, we can't unshare this file.`,
                'danger');
            this.props.fetchFiles();
        });
    }


    render() {
        return ( <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>File name</th>
                <th>Size (kb)</th>
                <th>Modified</th>
                <th>Owner</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {this.props.sharedWithMe.map((file,i) => {
                return (<tr key={i}>
                    <td>{i}</td>
                    <td>{file.name}</td>
                    <td>{Math.round(file.size * 100 ) / 100000}</td>
                    <td>{moment(file.date).fromNow()}</td>
                    <td>{file.ownerEmail}</td>
                    <td className="text-center actionIcon">
                        <Dropdown>
                            <Dropdown.Toggle><FontAwesomeIcon icon={faEllipsisH}/></Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => this.handleDownload(file)}>Download</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.handleUnshare(file)}>Unshare</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </td>
                </tr>)
            })}</tbody></Table>)
    }
}