import { QRCodeSVG } from 'qrcode.react';
import { Flex, Heading, Stack, } from '@chakra-ui/react';
import * as React from 'react';
import { getAuth, onAuthStateChanged, } from "firebase/auth";
import { useState, useEffect } from 'react';
import { getFunctions, httpsCallable, } from "firebase/functions";

function QRCodeGenerator(){
    //const token = "3njlx894ujefx3uejo99wf89sjge";

    const [qrCode, setQrCode] = useState("");
    const auth = getAuth();

    useEffect(() => {        
        const fetchQrCode = async () => {
            try {
                const user = auth.currentUser;
                const functions = getFunctions();
                const getNextQrCode = httpsCallable(functions, 'getNextQrCode');
                // console.log(user.email);

                await Promise.all([auth, user, functions, getNextQrCode]);

                getNextQrCode({ email: user.email })
                    .then((result) => {
                    setQrCode(result.data);
                    console.log(result.data);
                    // console.log('setqrcode: ' + qrCode)
                });
            } catch(error) {
                console.log('Error fetching: ' + error);
            }
        }

        onAuthStateChanged(auth, (user) => {
            if (user) {
            // User is signed in
                fetchQrCode();
            } else {
            // User is signed out  
                console.log('not logged in');
            }
        });
    }, []);

    return (
        <Flex align={"center"} justify={"center"} minH={"100vh"} bg="cyan.100" >
            {qrCode ?
            <Stack>
                <Stack>
                    <Heading align={'center'} fontSize={'2xl'}>Szkenneld le a QR kódot!</Heading>
                </Stack>
                <Stack>
                    <Flex border={'100'} rounded={'xl'} boxShadow={'2xl'} p={'5'} bg="pink.100">
                        <QRCodeSVG value={qrCode} size="256"/>
                    </Flex>
                </Stack>
            </Stack>
        
            : null}
            
        </Flex>
    )
}

export default QRCodeGenerator;

