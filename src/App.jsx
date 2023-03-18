import { useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

function App() {
  //state - allapot (count), ezt lehet valtoztatni a set fuggvennyel

  return (
    <div className="App">
      <LoginForm/>
    </div>
  )
}

export default App
