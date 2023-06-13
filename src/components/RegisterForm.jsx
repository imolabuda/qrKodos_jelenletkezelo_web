import {useEffect, useState} from "react";
import {onAuthStateChanged, createUserWithEmailAndPassword} from "firebase/auth";
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

function RegisterForm(){

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [user, setUser] = useState({});
    const [showPasswordOrNot, setShowPasswordOrNot] = useState("password");

    useEffect(() => { //ha valami valtozik az oldalon
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
    }, []) //ha a szogletesben levo erteke valtozik, akkor meghivodik a felso par sor
        //ha ures, akkor akarmi is valtozik, meghivodik

    const register = async () => { //async - kulon fut es nem "fagy ki", lehet interaktalni a kinezettel
        try{
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword); //auth - firebase-configbol
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Flex align={"center"} justify={"center"} minH={"100vh"} bg={"cyan.100"}>
            <Stack spacing={10} py={10} bg={"gray.50"} border={'200'} rounded={'lg'} boxShadow={'2xl'} p={'10'}>
                <Stack>
                    <Heading align={'center'} fontSize={'2xl'}>Regisztráció</Heading>
                </Stack>
                <Stack>
                    <FormControl>
                        <FormLabel>E-mail cím..</FormLabel>
                        <Input borderColor={"black"} type='email' onChange={(event) => {
                            setRegisterEmail(event.target.value);
                        }}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Jelszó..</FormLabel>
                        <InputGroup>
                            <Input  borderColor={"black"} type={ showPasswordOrNot } onChange={(event) => {
                                setRegisterPassword(event.target.value);
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
                    <Button bg={"cyan.700"} onClick={register}>
                        Regisztrálok
                    </Button>
                </Stack>

                <Text fontSize={'15'}>
                    Ha van már felhasználód, lépj be!
                </Text>
            </Stack>
        </Flex>

    //     <div className="RegisterForm">
    //     <h3>
    //         Regisztráció
    //     </h3>
    //     <Input placeholder='E-mail cím..'
    //             size = 'sm'
    //             onChange={(event) => {
    //                 setRegisterEmail(event.target.value);
    //             }}/>
    
    //     <Input placeholder='Jelszó..'
    //             size = 'sm'
    //             onChange={(event) => {
    //                 setRegisterPassword(event.target.value);
    //             }}/>
        
    //     <button onClick={register}>
    //         Regisztráció
    //     </button>

    //     {/* <h3>
    //         Regisztrált felhasználó: {user?.email}
    //     </h3> */}

    // </div>
    )
}

export default RegisterForm;