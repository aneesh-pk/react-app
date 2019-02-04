import React, {Component} from 'react';
import {Alert, Button} from "react-bootstrap";

export default class LandingPageAlert extends Component {

    constructor(props) {
        super(props);

        this.state = {
            show: (typeof props.message !== "undefined"),
            message: props.message ? props.message : '',
            variant: (props.success === true) ? 'success' : 'danger'
        };

    }

    render() {
        return (
            <>
                <Alert dismissible variant={this.state.variant}>
                    <p>
                        {this.state.message}
                    </p>
                </Alert>
            </>

        )
    }
}