import React, {Component} from 'react';
import {Container} from "react-bootstrap";
import LandingPageHeader from "./LandingPageHeader";
import LandingPageAlert from "./LandingPageAlert";

export default class LandingPageWrapper extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container className="main-content" style={{height: '100vh'}}>
                <LandingPageHeader/>
                <LandingPageAlert/>
                {this.props.children}
            </Container>
        )
    }
}