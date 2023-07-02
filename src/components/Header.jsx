import {  Image, Flex, Button,  HStack , chakra } from '@chakra-ui/react';
import {Link} from 'react-scroll';
// import data from './header.data';
import React from "react";
import {Heading} from '@chakra-ui/react'
import { signOut, } from 'firebase/auth';
import { auth } from "../firebase-config"

const CTA = "Regisztráció"
const CTA2 = "Bejelentkezés"
const CTA3 = "Kijelentkezés"

function Header({navigateToLoginForm, navigateToRegisterForm, isLoggedIn, setIsLoggedIn}) {

  const handleLogout =() => {
    signOut(auth).then(() => {
      console.log('sign out successful')
      setIsLoggedIn(false);
    }).catch(error => console.log(error))
  }

  return (
    <chakra.header id="header" bg="cyan.700">
      <Flex
        w="100%"
        px="6"
        py="5"
        align="center"
        justify="space-between"
      >
        {/* <Image src={"logo.png"} h="50px" /> */}
        <Heading fontSize={'xl'} color="black">AttendEase</Heading>
        <HStack as="nav" spacing="5">
          {/* {data.map((item, i) => (
            <Link key={i}>
              <Button variant="nav"> {item.label} </Button>
            </Link>
          ))} */}
        </HStack>

        <HStack>
          {isLoggedIn ? <Button bg="pink.100" onClick={handleLogout}> {CTA3}</Button> :
            <>
               <Button bg="pink.400" onClick={navigateToLoginForm}>
              {CTA2}
                </Button>
                <Button bg="pink.100" onClick={navigateToRegisterForm}>
                  {CTA}
                </Button>
            </>
          }
             
              
        </HStack>
        
      </Flex>
    </chakra.header>
  );
}

export default Header;

