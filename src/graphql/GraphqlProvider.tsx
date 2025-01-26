'use client'
import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { URL_BACKEND } from '@env';

interface GraphqlProviderProps {
    children: React.ReactNode;
}

const client = new ApolloClient({
    uri: URL_BACKEND + '/graphql',
    cache: new InMemoryCache()
});

const GraphqlProvider: React.FC<GraphqlProviderProps> = ({ children }) => {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
}

export default GraphqlProvider;