import {  Image, Flex, Button,  HStack , chakra } from '@chakra-ui/react';
import {Link} from 'react-scroll';
// import data from './header.data';
import React from "react";
import {Heading} from '@chakra-ui/react'

const CTA = "Regisztráció"
const CTA2 = "Bejelentkezés"

function Header() {
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
        <Heading fontSize={'xl'} color="white">ide valami logó</Heading>
        <HStack as="nav" spacing="5">
          {/* {data.map((item, i) => (
            <Link key={i}>
              <Button variant="nav"> {item.label} </Button>
            </Link>
          ))} */}
        </HStack>

        <HStack>
        <Button bg="pink.400">
            {CTA2}
          </Button>
          <Button bg="pink.100">
            {CTA}
          </Button>
        </HStack>
        
      </Flex>
    </chakra.header>
  );
}

export default Header;

