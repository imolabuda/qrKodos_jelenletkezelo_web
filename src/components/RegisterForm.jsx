import {useEffect, useState, useRef, } from "react";
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
    Text, 
    Link, } from '@chakra-ui/react';
import {ViewIcon, ViewOffIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { getFirestore, collection, getDocs, doc, setDoc, addDoc } from 'firebase/firestore/lite';
import LoginForm from "./LoginForm";
import format from 'date-fns/format';
import { Calendar } from 'react-date-range';
import { Routes, Route, useNavigate, } from 'react-router-dom';
import { db } from '../firebase-config';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

function RegisterForm(){

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [user, setUser] = useState({});
    const [showPasswordOrNot, setShowPasswordOrNot] = useState("password");
    const [name, setName] = useState("");
    const [calendar, setCalendar] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => { //ha valami valtozik az oldalon
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
    }, []) //ha a szogletesben levo erteke valtozik, akkor meghivodik a felso par sor
        //ha ures, akkor akarmi is valtozik, meghivodik

    const navigate = useNavigate();

    const navigateToLoginForm = () => {
        navigate('/LoginForm');
    }

    const register = async () => { //async - kulon fut es nem "fagy ki", lehet interaktalni a kinezettel
        try{
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword); //auth - firebase-configbol
            console.log(user);
            getData();
            navigateToLoginForm();
        } catch (error) {
            console.log(error.message);
        }
    }

    const getData = async () => {
        try {
          const document = await addDoc(collection(db, "Teachers"), {
            dateOfBirth: calendar,
            teacherEmail: registerEmail,
            teacherName: name,
          });
          console.log("Document written with ID: ", document.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
    }

    const handleSelect = (date) => {
        console.log(date);
        //console.log(format(date, "MM/dd/yyyy"))
        setCalendar(format(date, "MM/dd/yyyy"));
    }

    useEffect (() => {
        //set current date on component load
        setCalendar(format(new Date(), "MM/dd/yyyy"));
        document.addEventListener("keydown", hideOnEscape, true);
        document.addEventListener("click", hideOnClickOutside, true);
    }, [])

    const hideOnEscape = (e) => {
        if(e.key === "Escape"){
            setOpen(false);
        }
    }

    const refOne = useRef(null);

    const hideOnClickOutside = (e) => {
        // console.log(refOne.current);
        // console.log(e.target);
        if(refOne.current && !refOne.current.contains(e.target)){
            setOpen(false);
        }
    }

    return (
        <Flex align={"center"} justify={"center"} minH={"100vh"} bg={"cyan.100"}>
            <Stack spacing={3} py={10} bg={"gray.50"} border={'200'} rounded={'lg'} boxShadow={'2xl'} p={'10'}>
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
                        <FormLabel>Teljes név..</FormLabel>
                        <Input borderColor={"black"} type='name' onChange={(event) => {
                            setName(event.target.value);
                        }}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Születési dátum..</FormLabel>
                        <Input
                            value={calendar}
                            readOnly
                            className="inputBox"
                            onClick={() => setOpen(open => !open)}/>
                        <Flex ref={refOne} className="calendarWrap">
                            {open && <Calendar
                                date = {new Date()}
                                onChange = {handleSelect}
                                className="calendarElement"
                                style={{ position: "center", border: "1px solid",
                                }}
                                >
                                </Calendar>
                            }
                        </Flex>
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
                {/* <Routes>
                    <Route path="/" element={<RegisterForm navigateToLoginForm={navigateToLoginForm}/>}/>
                    <Route path="/LoginForm" element={<LoginForm/>}/>
                </Routes> */}
                <Stack>
                    <Button bg={"cyan.700"} onClick={register}>
                        Regisztrálok
                    </Button>
                </Stack>

                <Text fontSize={'15'}>
                    Ha van már felhasználód, <Link color="cyan.700" href='/LoginForm'>lépj be!</Link>
                </Text>
            </Stack>
        </Flex>
    )
}

export default RegisterForm;