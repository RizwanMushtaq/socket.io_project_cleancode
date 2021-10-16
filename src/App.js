import React, {useState} from 'react'
import './App.css';
import LoginPage from './components/LoginPage';
import AppPage from './components/AppPage';
import EndPage from './components/EndPage';

// import { io } from "socket.io-client"
// const socket = io("https://demo-chat-server.on.ag/")

function App() {
  
  console.log('In App Component')

  let [appState, setAppState] = useState("LoginPage")
  let [userName, setUserName] = useState("")

  //Hook to store widget we get from backend and watch to make sure we see all wigets only one time
  // let [widgetArray, setWidgetArray] = useState([])

  

  //Function to call when click on Login Button
  const userLoginRequestHandler = () => {
    console.log('In userLoginRequestHandler function')

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

  //Return block is decided on the basis of appState Hook
  if(appState === 'LoginPage'){
    return (
      <div className="App">
        <LoginPage userLoginRequestHandler={userLoginRequestHandler}/>
      </div>
    )
  }else if(appState === 'AppPage'){
    return (
      <div className="App">
        <AppPage 
          userName={userName} 
          // socket={socket} 
          setAppState={setAppState}
        />
      </div>
    )
  }
  else if(appState === 'EndPage'){
    return (
      <div className="App">
        <EndPage 
          setAppState={setAppState}
        />
      </div>
    )
  }
}

export default App;
