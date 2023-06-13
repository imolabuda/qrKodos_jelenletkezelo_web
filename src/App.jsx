import Homepage from './components/Homepage';
import Header from './components/Header';
import QRCodeGenerator from './components/QRCodeGenerator';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import * as React from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { ChakraProvider} from '@chakra-ui/react';

function App() {
  //state - allapot (count), ezt lehet valtoztatni a set fuggvennyel

  const navigate = useNavigate();

  const navigateToQRCodeGenerator = () => {
    navigate('/QRCodeGenerator');
  };

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
      

        <Route path="/" element={<Homepage navigateToQRCodeGenerator={navigateToQRCodeGenerator}/>}/>
        <Route path="/QRCodeGenerator" element={<QRCodeGenerator/>}/>
        {/* <Route path="/" element={<Homepage navigateToPath1={navigateToRegisterForm}/>}/> */}
        <Route path="/RegisterForm" element={<RegisterForm/>}/>
        {/* <Route path="/" element={<Homepage navigateToPath2={navigateToLoginForm}/>}/> */}
        <Route path="/LoginForm" element={<LoginForm/>}/>
      </Routes>

      {/* <RegisterForm/> */}
      {/* <LoginForm/> */}
    </ChakraProvider>
  )
}

export default App
