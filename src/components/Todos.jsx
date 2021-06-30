import React, {useEffect, useState} from "react";
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
            title:"$title"
            description:"$description"
  ) 
}
`
const DELETE_NOTE = gql`
    mutation{
        deleteNote(
        id:"11"
        )        
    }
`

function Todos() {
    const {loading, error, data} = useQuery(EXCHANGE_RATES);
    const [createNote, {err}] = useMutation(CREATE_NOTE);
    const [deleteNote, {errr}] = useMutation(DELETE_NOTE);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    const addNote = () => {
        createNote({
            variables: {
                title: title,
                description: description,

            }
        });
    };
    const removeNote = (id) => {
        deleteNote({
            variables: {
                id: id,
            },
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