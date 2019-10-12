import React, { Component } from 'react';
export default class UserHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        }
    }

    handleClick = (user) => {
        const { toggle } = this.state;
        if(toggle) {
            this.props.remove(user);
        } else {
            this.props.select(user);
        }
        this.setState({toggle: !toggle});
    };

    render() {
        const { toggle } = this.state;
        const { user, display } = this.props;

        return <div className={"userHolder"} style={{display: display}}>
            <span>{user.email}</span>
            <button className={"btn" + (toggle ? " btn-secondary": " btn-outline-secondary")}
                    onClick={() => this.handleClick(user)}>Select</button>
        </div>
    }
}