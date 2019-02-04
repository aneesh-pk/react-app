import React, {Component} from 'react';
import {Container, Form, Button, Card} from "react-bootstrap";
import LandingPageWrapper from '../components/LandingPageWrapper';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        };
    }

    handleInputChange = (e) => {
        this.setState({[e.target.id]: e.target.value});
    }

    render() {
        return (
            <LandingPageWrapper>
                <Card style={{width: '30rem', margin: '0 auto'}}>
                    <Card.Body>

                        <Card.Title className="text-center">Sign Up</Card.Title>

                        <Form className="login-form">

                            <Form.Group controlId="name" size="sm">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    autoFocus
                                    type="text"
                                    value={this.state.name}
                                />
                            </Form.Group>

                            <Form.Group controlId="email" size="sm">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    autoFocus
                                    type="email"
                                    value={this.state.email}
                                />
                            </Form.Group>


                            <Form.Group controlId="password" size="sm">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    value={this.state.password}
                                    type="password"
                                />
                            </Form.Group>

                            <Form.Group controlId="confirmPassword" size="sm">
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control
                                    value={this.state.confirmPassword}
                                    type="password"
                                />
                            </Form.Group>

                            <Button
                                block
                                size="sm"
                                type="submit">
                                Login
                            </Button>

                        </Form>
                    </Card.Body>
                </Card>
            </LandingPageWrapper>
        );
    }
}