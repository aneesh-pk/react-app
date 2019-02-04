import Head from 'next/head'
import React, {Component} from 'react';


export default class LandingPageHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Head>
                    <title>My page title</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport"/>
                </Head>
                <Head>
                    <meta name="viewport" content="initial-scale=1.2, width=device-width" key="viewport"/>
                </Head>
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
                        integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
                        crossOrigin="anonymous"
                    />
                </Head>
            </div>
        )
    }

}