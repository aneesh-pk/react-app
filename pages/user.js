import React, { Component } from 'react';
import { Row, Button, Col, Card, Form } from "react-bootstrap";
import DasboardWrapper from "../components/DashboardWrapper";
import { client } from "../config/apollo-client";
import gql from "graphql-tag";
import Router from "next/router";
import { from } from 'zen-observable';


class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authChecked: false,
            user: {},
            name: "",
            isValid: false
        }
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
                inst.setState({ user: result.data.user });
                inst.setState({ name: result.data.user.name });
            } else {
                window.localStorage.clear();
                Router.push("/login");
            }

        }).catch(err => {
            window.localStorage.clear();
            Router.push("/login");
        }).finally(() => {
            inst.setState({ authChecked: true });
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        client.mutate({
            mutation: gql`
              mutation updateUser{
                update_user(user: {name: "${this.state.name}"}) {
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
            if (!result.errors && result.data.user.id) {
                inst.setState({ user: result.data.user });
                inst.setState({ name: result.data.user.name });
            } else {
                
            }
        }).catch(e => {
            //todo show message
            console.log(e)
        })
    }

    handleInputChange = (e) => {
        this.setState({isValid: false});
        this.setState({ [e.target.id]: e.target.value }, () => {
            if (this.state.name.trim().length > 0 && this.state.name !== this.state.user.name){
                this.setState({isValid: true});
            }
        });

    }

    render() {
        return (
            <>
                <DasboardWrapper authChecked={this.state.authChecked}>
                    <Form onSubmit={this.handleSubmit}>


                        <Card>
                            <Row>
                                <Col sm={12}>
                                    <h4>
                                        User Details
                                    </h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <p></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={3}>
                                    <p>Id</p>
                                </Col>
                                <Col sm={3}>
                                    <Form.Group controlId="id" size="sm">
                                        <Form.Control
                                            value={this.state.user.id}
                                            disabled
                                            type="text"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={3}>
                                    <p>Name</p>
                                </Col>
                                <Col sm={3}>
                                    <Form.Group controlId="name" size="sm">
                                        <Form.Control
                                            value={this.state.name}
                                            onChange={this.handleInputChange}
                                            type="text"
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={3}>
                                    <p>Email</p>
                                </Col>
                                <Col sm={3}>
                                    <Form.Group controlId="email" size="sm">
                                        <Form.Control
                                            value={this.state.user.email}
                                            type="text"
                                            disabled
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <Row>
                                        <Col sm={6}>
                                        </Col>
                                        <Col sm={6} className="text-left">
                                            <Button
                                                block
                                                size="sm"
                                                disabled={!this.state.isValid}
                                                type="submit">
                                                Update
                                        </Button>
                                        </Col>
                                    </Row>

                                </Col>
                                <Col sm={6}>


                                </Col>

                            </Row>

                            <Row>
                                <Col sm={12}>
                                    <p></p>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={12}>
                                    <p></p>
                                </Col>
                            </Row>

                        </Card>
                    </Form>

                </DasboardWrapper>
            </>
        )
    }
}

export default User;