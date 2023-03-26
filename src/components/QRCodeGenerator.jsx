import { QRCodeSVG } from 'qrcode.react';
import { Flex, Heading, Stack, } from '@chakra-ui/react';
import * as React from 'react';

function QRCodeGenerator(){
    const token = "3njlx894ujefx3uejo99wf89sjge";

    return (
        <Flex align={"center"} justify={"center"} minH={"100vh"} bg="cyan.100" >
            <Stack>
                <Stack>
                    <Heading align={'center'} fontSize={'2xl'}>Szkenneld le a QR kódot!</Heading>
                </Stack>
                <Stack>
                    <Flex border={'100'} rounded={'xl'} boxShadow={'2xl'} p={'5'} bg="pink.100">
                        <QRCodeSVG value={token} size="256"/>
                    </Flex>
                </Stack>
            </Stack>
        </Flex>
    )
}

export default QRCodeGenerator;

