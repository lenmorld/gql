import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

import { ApolloProvider } from 'react-apollo';

import List from './graphql/List';

// put this in a HoC e.g. withData
const client = new ApolloClient({
    uri: '/graphql'
});


class ApolloApp extends React.Component {
    componentDidMount() {
        // TEST
        // test query with plain JS
        client.query({
            query: gql `
            {
                hello
            }
        `
        }).then(result => {
            console.log(result);
        });
    }
    
    render() {
        return (
            <ApolloProvider client={client}>
                <div>
                    <h2>My first Apollo app</h2>
                    <List />
                </div>
            </ApolloProvider>
        )
    }

}


export default ApolloApp;