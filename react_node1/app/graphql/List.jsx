import React from 'react';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const List = () => (
    <Query
        query={gql`
            {
                titles
            }
        `}
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
);

export default List;