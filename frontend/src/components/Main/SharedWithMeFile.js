import React, { Component } from 'react';
import {Dropdown, OverlayTrigger, Table, Tooltip} from "react-bootstrap";
import moment from "moment";
import {API_URL} from "../../Constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH, faUserPlus} from "@fortawesome/free-solid-svg-icons";

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
                                <Dropdown.Item href={`${API_URL}/${file.download}`}>Download</Dropdown.Item>
                                <Dropdown.Item disabled>
                                    Share
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Rename</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </td>
                </tr>)
            })}</tbody></Table>)
    }
}