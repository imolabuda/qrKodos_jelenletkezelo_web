import { QRCodeSVG } from 'qrcode.react';
import { Flex, Heading, Stack, Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    position, } from '@chakra-ui/react';
import * as React from 'react';
import { getAuth, onAuthStateChanged, } from "firebase/auth";
import { useState, useEffect } from 'react';
import { getFunctions, httpsCallable, } from "firebase/functions";

function QRCodeGenerator(){
    const [qrCode, setQrCode] = useState("");
    const auth = getAuth();
    const [checking, setChecking] = useState(false);
    
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);

    setTimeout(check, 1500);
    
    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLongitude(longitude);
        setLatitude(latitude);
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }
    
    function error() {
        console.log("Unable to retrieve your location");
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("Geolocation not supported");
        }
    }, []);

    function check(){
        if (checking == false){
            setChecking(true);
        }else{
            setChecking(false);
        }
    }

    useEffect(() => {
        const fetchQrCode = async () => {
            try {
                const user = auth.currentUser;
                const functions = getFunctions();
                const getNextQrCode = httpsCallable(functions, 'getNextQrCode');

                await Promise.all([auth, user, functions, getNextQrCode]);

                getNextQrCode({ email: user.email, token:qrCode, webLatitude: latitude, webLongitude: longitude })
                    .then((result) => {
                    setQrCode(result.data);
                    console.log(result.data);
                });
            } catch(error) {
                showAlert = true;
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
    }, [checking]);

    return (
        <Flex align={"center"} justify={"center"} minH={"100vh"} bg="cyan.100" >
            {/* {showAlert === true ?
                <Alert status='error'>
                <AlertIcon />
                    There was an error processing your request
                </Alert> :  */}
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

