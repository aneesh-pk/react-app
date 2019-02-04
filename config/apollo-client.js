import 'cross-fetch/polyfill';
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    uri: "http://localhost:4000",
    headers: {
        authorization: (typeof window !== 'undefined' && window.localStorage.getItem('access_token'))? `Bearer ${window.localStorage.getItem('access_token')}` : ""
    }
});

export {client};