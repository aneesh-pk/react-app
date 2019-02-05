import React, { Component } from 'react';
import { Container, Form, Button, Card } from "react-bootstrap";
import LandingPageWrapper from '../components/LandingPageWrapper';
import { client } from "../config/apollo-client";
import gql from "graphql-tag";
import Router, { withRouter } from "next/router";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isLoading: false,
            authChecked: false,
            notifications: {
                type: null,
                message: null
            }
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
        this.setState({ [e.target.id]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        client.mutate({
            mutation: gql`
              mutation LoginRequest{
                login(user: {email: "${this.state.email}", password: "${this.state.password}"}) {
                  info
                  success
                  token
                  user{
                    id
                    name
                    email
                  }
                }
              }
            `
        }).then(result => {
            if (result.data.login.success) {
                window.localStorage.setItem('access_token', result.data.login.token);
                window.localStorage.setItem('user', JSON.stringify(result.data.login.user));
                Router.push("/dashboard");
            }
        }).catch(e => {
            //todo show message
            console.log(e)
        })
    }


    render() {

        return (
            <>
                {this.state.authChecked && (
                    <LandingPageWrapper notifications={this.state.notifications}>
                        <Card style={{ width: '25rem', margin: '0 auto' }}>
                            <Card.Body>

                                <Card.Title className="text-center">Login</Card.Title>

                                <Form onSubmit={this.handleSubmit} className="login-form">

                                    <Form.Group controlId="email" size="sm">
                                        <Form.Label>Username</Form.Label>
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

                                    <Button
                                        block
                                        size="sm"
                                        onClick={this.onSubmit}
                                        type="submit">
                                        Login
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

export default withRouter(Login);