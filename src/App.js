import React, {useState} from 'react'
import './App.css'
import { consoleLogWhenVariableIsSet } from './utils/logHandling'
import LoginPage from './pages/LoginPage'
import AppPage from './pages/AppPage'
import EndPage from './pages/EndPage'

export default function App() {
  consoleLogWhenVariableIsSet('In App Component')
  
  let [appState, setAppState] = useState("LoginPage")
  let [userName, setUserName] = useState("")

  const handleLoginRequest = () => {
    consoleLogWhenVariableIsSet('In handleLoginRequest function')

    let username = document.querySelector("#LoginFormUserInput").value
    let password = document.querySelector("#LoginFormPasswordInput").value

    if(username.trim() === ""){
      document.querySelector("#LoginFormUserInput").parentElement.style.border = '2px solid red'
    }
    if(password.trim() === ""){
      document.querySelector("#LoginFormPasswordInput").parentElement.style.border = '2px solid red'
    }
    if(username.trim() !== ""){
      document.querySelector("#LoginFormUserInput").parentElement.style.border = '1px solid black'
    }
    if(password.trim() !== ""){
      document.querySelector("#LoginFormPasswordInput").parentElement.style.border = '1px solid black'
    }
    if(username.trim() !== "" && password.trim() !== ""){
      if(username === 'admin' && password === 'admin'){
        setUserName(username)
        setAppState('AppPage')
        console.log('Login Successful')
      } else{
        alert("Incorrect username or password")
      }
    }
  }

  if(appState === 'LoginPage'){
    return (
      <div className="App">
        <LoginPage handleLoginRequest={handleLoginRequest}/>
      </div>
    )
  }else if(appState === 'AppPage'){
    return (
      <div className="App">
        <AppPage 
          userName={userName} 
          setAppState={setAppState}
        />
      </div>
    )
  }
  else if(appState === 'EndPage'){
    return (
      <div className="App">
        <EndPage 
          userName={userName} 
          setAppState={setAppState}
        />
      </div>
    )
  }
}

