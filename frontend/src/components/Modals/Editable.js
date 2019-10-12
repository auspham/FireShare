import React, { Component } from 'react';
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import AccountService from "../../api/AccountService";

export default class Editable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: this.props.file,
            editing: false,
            rename: this.props.file.name
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.file !== this.props.file) {
            this.setState({file: nextProps.file})
        }
    }


    handleEdit = () => {
        const { editing } = this.state;
        this.setState({
            editing: true
        })
    };

    handleChange = (event) => {
        this.setState({
            rename: event.target.value
        })
    };

    handleSubmit = () => {
        const { file, rename } = this.state;
        if(rename.length > 0 && !/\s/.test(rename)) {
            AccountService.updateFile(file._id, rename).then(() => {
                this.props.showAlert(
                    'Success!',
                    `Done, changed the name from ${file.name} to ${rename}`,
                    'success');
                this.props.fetchFiles();
            }).catch(error => {
                console.log(error);
                this.props.showAlert(
                    'Error!',
                    `Uhoh, something is wrong`,
                    'danger');
            });
            this.setState({
                editing: false
            });
        } else {
            this.props.showAlert(
                'Error!',
                `Length of file has to be larger than 1 and cannot contain any whitespace.`,
                'warning');
        }
    };

    render() {
        const { file, editing, rename } =  this.state;
        return (
            <td>
                <OverlayTrigger placement={"bottom"} overlay={<Tooltip id={"tooltip-bottom"}>Click to edit file name</Tooltip>}>
                    <div onClick={this.handleEdit}>
                        { editing ?
                            <input type={"text"} value={ rename } onChange={this.handleChange}
                                    onBlur={this.handleSubmit} onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    this.handleSubmit();
                                }
                            }}/>
                            : file.name }
                    </div>
                </OverlayTrigger>
            </td>
        );
    }
}