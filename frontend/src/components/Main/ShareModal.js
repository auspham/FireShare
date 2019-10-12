import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import './styles/DragDrop.scss';
import AccountService from "../../api/AccountService";
import UserHolder from "./UserHolder";
import AuthenticationService from "../../api/AuthenticationService";


export default class ShareModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedUser: [],
            allUser: [],
            filter: '',
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.show !== this.props.show) {
            this.fetchUsers();
        }
    }

    fetchUsers = () => {
        AccountService.getAllUser().then(result => {
            this.setState({
                allUser: result.data,
            });
        })
    };

    handleSelect = (user) => {
        this.setState({
            selectedUser: [...this.state.selectedUser, user]
        });
    };

    handleRemove = (user) => {
        // Separate remove & select to reduce loop checking.
        this.setState({
            selectedUser: this.state.selectedUser.filter(each => each._id !== user._id)
        })
    };

    handleFilter = (event) => {
        this.setState({
            filter: event.target.value
        })
    };

    handleShare = () => {
        const { selectedUser } = this.state;
        const { file } = this.props;
        if(selectedUser.length > 0) {
            AccountService.shareFile(file, selectedUser).then(result => {
                console.log(result);
            }).catch(error => {
                this.props.showAlert(
                    'Error!',
                    'Uh oh, something is wrong',
                    'danger');
            });
        } else {
            this.props.showAlert(
                'Warning!',
                'You have to choose an user to share first',
                'danger');
        }
    };

    render() {
        const { selectedUser, filter } = this.state;
        return <Modal show={this.props.show} onHide={() => this.props.openModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Share file</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6>Type in the user's email you want to share with</h6>
                    <input type="text" className="form-control" placeholder="Recipient's username"
                           aria-label="Recipient's email" aria-describedby="basic-addon2"
                           onChange={this.handleFilter}/>
                    <div className="listUser">
                        {this.state.allUser.map((user, i) => {
                            const check = user.email.indexOf(filter) !== -1 ? "" : "none";
                            return (
                                <UserHolder user={user} key={i}
                                            select={this.handleSelect}
                                            remove={this.handleRemove}
                                            display={check}/>
                            )
                        })}
                    </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => this.props.openModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.handleShare}
                        disabled={selectedUser.length > 0 ? "": "disabled"}>
                    Share
                </Button>
            </Modal.Footer>
        </Modal>
    }
}
