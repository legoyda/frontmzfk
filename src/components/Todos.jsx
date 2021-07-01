import React, {useEffect, useState,} from "react";
import {
    Box,
    Button,
    IconButton,
    Flex,
    Input,
    InputGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Divider,
    Text,
    Center,
    useDisclosure, Container, Heading, InputLeftAddon,
} from "@chakra-ui/react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    useMutation,
    gql
} from "@apollo/client";


const EXCHANGE_RATES = gql`
    query{
        getNotes{
            id
            title
            description
        }
    }              
`;
const CREATE_NOTE = gql`
    mutation($title: String, $description: String){
        createNote(
            title: $title
            description: $description
        ) {
            title
            description
        }
}
`
const DELETE_NOTE = gql`
    mutation($id: String) {
        deleteNote(id: $id) {
            id
        }
    }
`

function Todos() {
    const {loading, error, data, refetch} = useQuery(EXCHANGE_RATES);
    const [createNote, {err}] = useMutation(CREATE_NOTE);
    const [deleteNote, {errr}] = useMutation(DELETE_NOTE);
    const [title, setTitle] = useState([]);
    const [description, setDescription] = useState([]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const addNote = () => {
        createNote({
            variables: {
                title: title,
                description: description,
            }
        }).then((res) =>{
            refetch()
        });
    };


    const removeNote = (id) => {
        deleteNote({
            variables: {
                id: id,
            },
        }).then((res) => {
            refetch()
        });
    };
    return (
        <div className="Todos">
            {data.getNotes.map((data) => <>
                <p key={data.title}>
                    {data.title}:{data.description}:{data.id}
                </p>
                <button onClick={() => removeNote(data.id)}> Delete it</button>
            </>)}
            <br/>
            Title><input onChange={(e) => setTitle(e.target.value)}/>
            <br/>
            Description >
            <input onChange={(e) => setDescription(e.target.value)}/>
            <br/>
            <button onClick={() => addNote()}>Add Post</button>
        </div>);
}

export default Todos;

/*
return data.getNotes.map(({id, title, description}) =>
           <Box>
               <Center bg="silver">
                   <div key={id}>
                       {title}: {description}
                   </div>
               </Center>
           </Box>
*/