const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

// ===== graphql side ====

// data
const places = [
    {
        name: "La Banquise",
        address: "Parc la fontaine"
    },
    {
        name: "La belle province",
        address: "1234 Fake Street"
    },
];

// GraphQL schema in string form
const typeDefs = `
    type Query { places: [Place] }
    type Place { name: String, address: String }
`;

// resolvers
const resolvers = {
    Query: { places: () => places}
}

// schema for frontend
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

// ===== Node-express server ===

// init. app
const app = express();

// GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// start server
app.listen(3000, () => {
    console.log('Started GraphQL server at /graphiql');
});