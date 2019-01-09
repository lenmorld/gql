const { gql } = require('apollo-server-express');

// GraphQL schema
const typeDefs = gql`
    # object type
    type Item {
        id: String
        artist: String
        album: String
        title: String
    }

    type Query {
        "simple type (this is a comment)"
        hello: String,
        titles: [String],
        list: [Item],
    }
`;

// map of functions which return data for the schema
const resolvers = {
    Query: {
        hello: () => 'world',
        titles: () => [
           "Song 1", "Song 2", "Song 3"
        ],
        list: () => [
            {
                "id": "0c4IEciLCDdXEhhKxj4ThA",
                "artist": "Muse",
                "title": "Madness",
                "album": "The 2nd Law"
              },
              {
                "id": "2QAHN4C4M8D8E8eiQvQW6a",
                "artist": "One Republic",
                "title": "I Lived",
                "album": "Native"
              },
              {
                "id": "5VnDkUNyX6u5Sk0yZiP8XB",
                "artist": "Imagine Dragons",
                "title": "Thunder",
                "album": "Evolve"
              }
        ],
    }
};

module.exports = {
    typeDefs,
    resolvers,
};