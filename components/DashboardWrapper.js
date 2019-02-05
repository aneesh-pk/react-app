import React, { Component } from 'react';
import { Container, Navbar, NavDropdown, Nav, Form, FormControl, Button } from "react-bootstrap";
import DashboardHeader from "./DashboardHeader";
import Router, { withRouter } from 'next/router';
import { client } from "../config/apollo-client";
import gql from "graphql-tag";

class DashboardWrapper extends Component {

    constructor(props) {
        super(props);
    }

    deleteAccount = (e) => {
        e.preventDefault();
        client.mutate({
            mutation: gql`
              mutation deleteUser{
                delete_user {
                  info
                  success
                }
              }
            `
        }).then(result => {
            window.localStorage.clear();
            Router.push("/login");
        }).catch(e => {
            //todo show message
            console.log(e);
        });
    }

    logout = (e) => {
        e.preventDefault();
        window.localStorage.clear();
        Router.push("/login");
    }

    goToUser = (e) => {
        e.preventDefault();
        Router.push("/user");
    }

    goToHome = (e) =>{
        e.preventDefault();
        Router.push("/dashboard");
    }
    

    render() {
        return (
            <>
                {this.props.authChecked && (
                    <Container className="main-content" style={{ height: '100vh' }}>
                        <DashboardHeader />
                        <Navbar bg="light" expand="sm">
                            <Navbar.Brand href="#home" onClick={this.goToHome}>Home</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">

                                </Nav>
                                <NavDropdown title="Account" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1" onClick={this.goToUser}>Details</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2" onClick={this.deleteAccount}>Delete Account</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3" onClick={this.logout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Navbar.Collapse>
                        </Navbar>
                        {this.props.children}
                    </Container>
                )}
            </>
        )
    }
}

export default withRouter(DashboardWrapper);