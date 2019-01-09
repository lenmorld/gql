import React from 'react';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_TITLES = gql`
    {
        titles
    }
`;

const List = () => (
    <div>
        <Query
            query={GET_TITLES}
        >
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :( </p>;
                console.log(data);
                return data.titles.map((item, index) => (
                    <div key={index}>
                        <p>{item}</p>
                    </div>
                ));
            }}
        </Query>

        <hr />

        <Query
            query={gql`
                {
                    list {
                        id
                        artist
                        album
                        title
                    }
                }
            `
            }
        >
           {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :( </p>;
                console.log(data);
                return data.list.map(({id, artist, album, title}) => (
                    <div key={id}>
                        <p>{artist} - {album} - {title}</p>
                    </div>
                ));
            }}
        </Query>
    </div>

);

export default List;