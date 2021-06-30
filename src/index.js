import React from 'react';
import {render} from 'react-dom';
import {Box, ChakraProvider} from "@chakra-ui/react";
import {Center} from "@chakra-ui/react"
import Header from './components/Header'
import Todos from './components/Todos'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://localhost:8000',
    cache: new InMemoryCache()
});

function App() {
    return (
        <Box>
            <div>
                <Center><Header/></Center>
                <Todos/>
            </div>
        </Box>

    )
}

render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('root'),
);