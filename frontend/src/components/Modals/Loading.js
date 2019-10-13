import React, { Component } from 'react';
import { ReactComponent as LoadingSVG} from "./assets/loading.svg";
import './styles/Loading.scss'
export default class Loading extends Component{
    constructor(props) {
        super(props);
        this.state = {
            display: false
        }
    }

    componentDidMount() {
        this.setState({ display: this.props.display });
    }

    render() {
        return (
            <div className={"loading"}>
                <LoadingSVG/>
            </div>
        );
    }
}