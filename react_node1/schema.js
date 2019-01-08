const { gql } = require('apollo-server-express');

// GraphQL schema
const typeDefs = gql`
    type Query {
        "simple type (this is a comment)"
        hello: String
    }
`;

// map of functions which return data for the schema
const resolvers = {
    Query: {
        hello: () => 'world'
    }
};

module.exports = {
    typeDefs,
    resolvers,
};