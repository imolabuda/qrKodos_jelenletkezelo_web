import Homepage from './components/Homepage';
import Header from './components/Header';
import QRCodeGenerator from './components/QRCodeGenerator';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import * as React from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { ChakraProvider} from '@chakra-ui/react';
import { useState } from 'react';

function App() {
  //state - allapot (count), ezt lehet valtoztatni a set fuggvennyel

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // const navigateToQRCodeGenerator = () => {
  //   navigate('/QRCodeGenerator');
  // };

  const navigateToRegisterForm = () => {
    navigate('/RegisterForm');
  }

  const navigateToLoginForm = () => {
    navigate('/LoginForm');
  }

  return (
    <ChakraProvider>

      <Header navigateToLoginForm={navigateToLoginForm}
            navigateToRegisterForm={navigateToRegisterForm}/>

      <Routes>
      
        <Route path="/" element={<Homepage/>}/>
        <Route path="/QRCodeGenerator" element={<QRCodeGenerator/>}/>
        {/* <Route path="/" element={<Homepage navigateToPath1={navigateToRegisterForm}/>}/> */}
        <Route path="/RegisterForm" element={<RegisterForm/>}/>
        {/* <Route path="/" element={<Homepage navigateToPath2={navigateToLoginForm}/>}/> */}
        <Route path="/LoginForm" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}/>
        <Route path="/Homepage" element={<Homepage isLoggedIn={isLoggedIn} />}/>
      </Routes>

      {/* <RegisterForm/> */}
      {/* <LoginForm/> */}
    </ChakraProvider>
  )
}

export default App
