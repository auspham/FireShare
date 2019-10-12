import React, { Component } from 'react';
export default class UserHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: this.props.shared
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.shared !== this.props.shared) {
            this.setState({toggle: nextProps.shared})
        }
    }

    handleClick = (user) => {
        console.log(user.email);
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
        const { user, display, shared } = this.props;

        return <div className={"userHolder"} style={{display: display}}>
            <span>{user.email}</span>
            <button className={"btn" + (toggle ? " btn-secondary": " btn-outline-secondary")}
                    onClick={() => this.handleClick(user)}>{ toggle ? "Remove" : "Select" }</button>
        </div>
    }
}