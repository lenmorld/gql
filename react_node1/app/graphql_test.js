import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

export function GraphqlTest() {

    //defaults to /graphql too

    const client = new ApolloClient({
        uri: '/graphql'
    });

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