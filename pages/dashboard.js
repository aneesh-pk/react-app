import React, { Component } from 'react';
import DasboardWrapper from "../components/DashboardWrapper";
import { client } from "../config/apollo-client";
import gql from "graphql-tag";
import { Query, ApolloProvider } from "react-apollo";
import Router from "next/router";
import { Row, Col, ListGroup, Container, Form, FormControl, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authChecked: false,
            list: this.refs.list,
            refetch: true,
            inputFile: null
        }
    }

    handleFileUpload = (e) => {
        e.preventDefault();
        if (this.state.inputFile) {
            this.setState({ refetch: false });
            client.mutate({
                mutation: gql`
                  mutation uploadFile{
                    upload_file(file: {name: "${this.state.inputFile.name}", mime: "${this.state.inputFile.mime}", blob: "${this.state.inputFile.blob}"}) {
                      info
                      success
                    }
                  }
                `
            }).then(result => {
                if (!result.data.upload_file.success) {
                    //todo show error
                    toast.error(result.data.upload_file.info);
                }
                else{
                    toast.success(result.data.upload_file.info);    
                }
            }).catch(e => {
                //todo show message
                toast.error(result.data.upload_file.info);
            }).finally(() => {
                this.setState({ refetch: true });
            })
        }

    }

    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    handleFileChange = async (files) => {
        if (files.length == 1) {
            let fileBase64 = await this.getBase64(files[0]);
            let file = files[0];
            this.setState({
                inputFile: {
                    name: file.name,
                    mime: file.type,
                    blob: fileBase64
                }
            });
        }

        else
            this.setState({ inputFile: null })
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

    render() {

        const GET_USER_FILES = gql`
        {
            user_files {
                success
                info
                files{
                    id
                    name
                    blob
                }
            }
        }`;

        const UserFiles = () => (

            <Query query={GET_USER_FILES}>
                {({ loading, error, data, refetch }) => {
                    if (loading)
                        return "Loading...";
                    if (error)
                        return `Error! ${error.message}`;

                    const handleFileDelete = (refetch, file_id) => {
                        client.mutate({
                            mutation: gql`
                              mutation deleteFile{
                                delete_file(file: {id: ${file_id}}) {
                                  info
                                  success
                                }
                              }
                            `
                        }).then(result => {
                            if(!result.data.delete_file.success){
                                toast.error(result.data.delete_file.info);
                            }
                            else{
                                toast.success(result.data.delete_file.info);
                            }
                        }).catch(e => {
                            toast.error(result.data.delete_file.info);
                        }).finally(() => {
                            refetch();
                        })
                    }

                    return (
                        <ListGroup>
                            {
                                data.user_files.success && data.user_files.files.length > 0 ? (
                                    data.user_files.files.map(user_file => (
                                        <ListGroup.Item key={user_file.id}>
                                            <Row>
                                                <Col sm={9}>
                                                    <a href={user_file.blob} download={user_file.name}>
                                                        {user_file.name}
                                                    </a>
                                                </Col>
                                                <Col sm={3}>
                                                    <i className="delete-file" style={{ "cursor": "pointer", "fontStyle": "normal", "float": "right" }} onClick={() => handleFileDelete(refetch, user_file.id)}>X</i>
                                                </Col>
                                            </Row>

                                        </ListGroup.Item>
                                    ))
                                ) : (<p>No user files found</p>)
                            }
                        </ListGroup>
                    );
                }}
            </Query>
        );

        return (
            <ApolloProvider client={client}>
                <DasboardWrapper authChecked={this.state.authChecked}>
                    <ToastContainer />
                    <Container>
                        <Row>
                            <Col sm={12}>
                                <h5>

                                </h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <h5>

                                </h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <h5>

                                </h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <h5>

                                </h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <h5>
                                    Upload File
                                </h5>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={12}>
                                <Row>
                                    <Col sm={6}>
                                        <FormControl type="file" placeholder="Select File" className="mr-sm-2" onChange={(e) => this.handleFileChange(e.target.files)} />
                                    </Col>
                                    <Col sm={6} className="text-left">
                                        <Button variant="outline-success" onClick={this.handleFileUpload}>Upload</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={12}>
                                <h5>

                                </h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <h5>

                                </h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <h5>

                                </h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <h5>

                                </h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <h5>
                                    Files List
                                </h5>
                            </Col>
                        </Row>

                        <Row>
                            {this.state.refetch && (
                                <>
                                    <UserFiles />
                                </>
                            )}
                        </Row>

                    </Container>
                </DasboardWrapper>
            </ApolloProvider>
        )
    }
}

export default Dashboard;