import React, { Component } from 'react';
import {OverlayTrigger, Table, Tooltip} from "react-bootstrap";
import moment from "moment";
import {API_URL} from "../../Constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";

export default class MyFile extends Component {
    constructor(props) {
        super(props);
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
                <th>Download</th>
                <th>Share</th>
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
                    <td><a href={`${API_URL}/${file.download}`} target="_blank">Download</a></td>
                    <td className="text-center shareIcon shareDisable">
                        <OverlayTrigger placement={"right"} overlay={<Tooltip id={"tooltip-right"}>You're not the owner</Tooltip>}>
                            <FontAwesomeIcon icon={faUserPlus}/>
                        </OverlayTrigger>
                    </td>
                </tr>)
            })}</tbody></Table>)
    }
}