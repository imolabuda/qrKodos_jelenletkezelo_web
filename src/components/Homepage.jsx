import { Button,
        Flex,
        HStack, 
        Image,
        Stack,
        Heading,
       } from '@chakra-ui/react';
import {Routes, Route, useNavigate} from 'react-router-dom';

function Homepage(){

  const navigate = useNavigate();

  const navigateToQRCodeGenerator = () => {
    navigate('/QRCodeGenerator');
  };

    return(
        <Flex align={"center"} justify={"center"} minH={"100vh"} bg={"cyan.100"}>
          <HStack as="nav" spacing="10">
            <Button onClick={navigateToQRCodeGenerator} size='md' height='340px' width='320px' border='2px' bg="white">
              <Stack>
              <Image src="qr-code-scan.png" align={'center'}></Image>
                <Heading align={'center'} fontSize={'xl'}>Jelenléti ív vezetés</Heading>
              </Stack>
            </Button>

            <Button size='md' height='340px' width='320px' border='2px' bg="white">
              <Stack>
              <Image src="statistics.png" align={'center'}></Image>
              <Heading align={'center'} fontSize={'xl'}>Statisztikák</Heading>
              </Stack>
            </Button>
          </HStack>
        </Flex>
    )
}

export default Homepage;