const { gql } = require('apollo-server-express');

// GraphQL schema
const typeDefs = gql`
    type Query {
        "simple type (this is a comment)"
        hello: String,
        titles: [String],
    }
`;

// map of functions which return data for the schema
const resolvers = {
    Query: {
        hello: () => 'world',
        titles: () => [
           "Song 1", "Song 2", "Song 3"
        ],
    }
};

module.exports = {
    typeDefs,
    resolvers,
};