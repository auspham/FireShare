import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import './styles/DragDrop.scss';
import AccountService from "../../api/AccountService";
import UserHolder from "./UserHolder";



export default class ShareModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedUser: [],
            allUser: [],
            shared: [],
            filter: '',
            wasSharing: false
        }
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = () => {
        const { file } = this.props;

        AccountService.getAllUser().then(result => {
            this.setState({
                allUser: result.data,
            });
        });
        AccountService.retrieveSharedUser(file).then(result => {
            this.setState({
                selectedUser: result.data,
                wasSharing: (result.data.length > 0) ? true : false
            });
        }).catch(error => {
            console.error(error);
        });
    };

    handleSelect = (user) => {
        this.setState({
            selectedUser: [...this.state.selectedUser, user._id]
        });
    };

    handleRemove = (user) => {
        // Separate remove & select to reduce loop checking.
        this.setState({
            selectedUser: this.state.selectedUser.filter(each => each !== user._id)
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

        AccountService.shareFile(file, selectedUser).then(result => {
            this.props.showAlert(
                'Success!',
                `Done, you have shared your file with ${selectedUser.length} people`,
                'success');
            this.props.openModal(false);
        }).catch(error => {
            this.props.showAlert(
                'Error!',
                'Uh oh, something is wrong',
                'danger');
        });
    };

    sortFunc = (a,b) => {
        const { selectedUser } = this.state;
        let indexA = selectedUser.indexOf(a._id);
        let indexB = selectedUser.indexOf(b._id);

        if(indexA < indexB) {
            return 1;
        } else if(indexA > indexB) {
            return -1;
        }

        return 0;
    };


    render() {
        const { selectedUser, filter, wasSharing } = this.state;
        const noShare = selectedUser.length == 0 && wasSharing;
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
                        {this.state.allUser.sort(this.sortFunc).map((user, i) => {
                            const check = user.email.indexOf(filter) !== -1 ? "" : "none";
                            const checkShare = selectedUser.includes(user._id);

                            return (
                                <UserHolder user={user} key={user._id}
                                            select={this.handleSelect}
                                            remove={this.handleRemove}
                                            display={check} shared={checkShare}/>
                            )
                        })}
                    </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => this.props.openModal(false)}>
                    Close
                </Button>
                <Button variant={noShare ? "danger" : "primary"} onClick={this.handleShare}
                        disabled={selectedUser.length > 0 || wasSharing ? "" : "disabled"}>
                    { noShare ? "Don't Share" : "Share" }
                </Button>
            </Modal.Footer>
        </Modal>
    }
}
