import {useEffect, useState} from "react";
import {onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase-config";
import { Input,
    FormControl, 
    Flex, 
    Heading, 
    Stack, 
    Button, 
    InputGroup, 
    InputRightElement,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Text, } from '@chakra-ui/react';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';

function LoginForm(){

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] =  useState("");
    const [user, setUser] = useState({});
    const [showPasswordOrNot, setShowPasswordOrNot] = useState("password");

    useEffect(() => { //ha valami valtozik az oldalon
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
    }, [])

    const login = async () => { //async - kulon fut es nem "fagy ki", lehet interaktalni a kinezettel
        try{
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword); //auth - firebase-configbol
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Flex align={"center"} justify={"center"} minH={"100vh"} bg={"cyan.100"}>
            <Stack spacing={10} py={10} bg={"gray.50"} border={'200'} rounded={'xl'} boxShadow={'2xl'} p={'10'}>
                <Stack>
                    <Heading align={'center'} fontSize={'2xl'}>Bejelentkezés</Heading>
                </Stack>
                <Stack>
                    <FormControl>
                        <FormLabel>E-mail cím..</FormLabel>
                        <Input borderColor={"black"} type='email' onChange={(event) => {
                            setLoginEmail(event.target.value);
                        }}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Jelszó..</FormLabel>
                        <InputGroup>
                            <Input  borderColor={"black"} type={ showPasswordOrNot } onChange={(event) => {
                                setLoginPassword(event.target.value);
                            }}/>
                            <InputRightElement>
                                <Button variant='outline' borderColor={"black"} onClick={ () =>
                                    showPasswordOrNot==="text" ? setShowPasswordOrNot("password") : setShowPasswordOrNot("text")
                                }>
                                    { showPasswordOrNot==="text" ? <ViewIcon/> : <ViewOffIcon/>}

                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                </Stack>
                <Stack>
                    <Button bg={"cyan.700"} onClick={login}>
                        Belépés
                    </Button>
                </Stack>

                <Text fontSize={'15'}>
                    Ha még nincs felhasználód, regisztrálj!
                    Bejelentkezett felhasználó: {user?.email}
                </Text>
            </Stack>
        </Flex>

        /* <Div className="LoginForm">
            { <Flex>
                <h3>
                    Belépés
                </h3>
                <Input placeholder="E-mail cím.." 
                        width='300px'
                        size = 'sm'
                        onChange={(event) => {
                            setLoginEmail(event.target.value);
                        }}/>
            
                <Input placeholder="Jelszó.."
                        width='300px'
                        size = 'sm'
                        onChange={(event) => {
                            setLoginPassword(event.target.value);
                        }}/>
                
                <Button onClick={login}>
                    Belépés
                </Button>

                <h3>
                    Bejelentkezett felhasználó: {user?.email}
                </h3>
            </Flex> }
        </Div>*/


    )
}

export default LoginForm; //emiatt lehet egyszeruen importalni