import React, { Component } from 'react';
import { Container, Form, Button, Card } from "react-bootstrap";
import LandingPageWrapper from '../components/LandingPageWrapper';
import { client } from "../config/apollo-client";
import gql from "graphql-tag";
import Router, { withRouter } from "next/router";

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            isLoading: false,
            authChecked: false,
            formValid: false,
            submitted: false
        };
    }

    componentDidMount() {
        let inst = this;
        client.query({
            query: gql`
              query getUser{
                user{
                  id
                  name
                  email
                }
              }
            `
        }).then(result => {
            if (!result.errors && result.data.user.id) {
                // Router.push("/dashboard");
            }
        }).catch(err => {
            window.localStorage.clear();
        }).finally(() => {
            inst.setState({ authChecked: true });
        });
    }

    handleInputChange = (e) => {
        let inst = this;
        this.setState({ [e.target.id]: e.target.value }, () => {
            let valid = inst.isFormValid();
            if (valid) {
                inst.setState({ formValid: true });
            }
        })

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        client.mutate({
            mutation: gql`
              mutation RegisterUser{
                create_user(user: {email: "${this.state.email}", password: "${this.state.password}", name: "${this.state.name}"}) {
                  info
                  success
                  user{
                    id
                    name
                    email
                  }
                }
              }
            `
        }).then(result => {
            if (result.data.create_user.success) {
                Router.push("/login");
            }
        }).catch(e => {
            //todo show message
            console.log(e)
        })
    }

    isFormValid() {
        return (this.state.name.trim().length > 0 && this.state.email.trim().length > 0 && this.state.password.trim().length > 0 && this.state.confirmPassword.trim().length && this.state.confirmPassword === this.state.password);
    }

    render() {
        return (
            <>
                {this.state.authChecked && (
                    <LandingPageWrapper>
                        <Card style={{ width: '30rem', margin: '0 auto' }}>
                            <Card.Body>

                                <Card.Title className="text-center">Sign Up</Card.Title>

                                <Form className="login-form" onSubmit={this.handleSubmit}>

                                    <Form.Group controlId="name" size="sm">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            autoFocus
                                            type="text"
                                            value={this.state.name}
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="email" size="sm">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            autoFocus
                                            type="email"
                                            value={this.state.email}
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>


                                    <Form.Group controlId="password" size="sm">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            value={this.state.password}
                                            type="password"
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="confirmPassword" size="sm">
                                        <Form.Label>Confirm password</Form.Label>
                                        <Form.Control
                                            value={this.state.confirmPassword}
                                            type="password"
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>

                                    <Button
                                        block
                                        size="sm"
                                        onClick={this.onSubmit}
                                        disabled={!this.state.formValid ? true : false}
                                        type="submit">
                                        Register
                                    </Button>

                                </Form>
                            </Card.Body>
                        </Card>
                    </LandingPageWrapper>
                )}
            </>
        );
    }
}

export default withRouter(SignUp);