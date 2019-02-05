import React, { Component } from 'react';
import { Alert, Button } from "react-bootstrap";

export default class LandingPageAlert extends Component {

    constructor(props) {
        super(props);

        this.state = {
            show: (props.notification && typeof props.notification.message !== "undefined"),
            message: (props.notification && props.notification.message) ? props.notification.message : '',
            variant: (props.notification && props.notification.success === true) ? 'success' : 'danger'
        };

    }

    render() {
        return (
            <>
                {this.props.notification && (
                    <Alert dismissible variant={this.state.variant}>
                        <Alert.Heading>{this.state.variant === "success" ? "Success" : "Error"}</Alert.Heading>
                        <p>
                            {this.state.message}
                        </p>
                    </Alert>
                )}
            </>

        )
    }
}