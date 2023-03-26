import Homepage from './components/Homepage';
import Header from './components/Header';
import * as React from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { ChakraProvider} from '@chakra-ui/react';

function App() {
  //state - allapot (count), ezt lehet valtoztatni a set fuggvennyel

  const navigate = useNavigate();

  const navigateToQRCodeGenerator = () => {
    navigate('/QRCodeGenerator');
  };

  return (
    <ChakraProvider>
      <Header/>

      <Routes>
        <Route path="/" element={<Homepage navigateToPath={navigateToQRCodeGenerator} />}/>
      </Routes>
    </ChakraProvider>
  )
}

export default App
