import React, {useState} from 'react'
import { logWithDebug } from './utils/logHandling'
import { logError } from './utils/errorHandling'
import { isUserValid } from './auth/userAuth'
import { isInputEmpty } from './utils/inputHandling'

import LoginPage from './pages/LoginPage'
import AppPage from './pages/AppPage'
import EndPage from './pages/EndPage'

export default function App() {
  logWithDebug('In App Component')
  
  let [appState, setAppState] = useState("LoginPage")
  let [userName, setUserName] = useState("")

  const handleLoginRequest = () => {
    logWithDebug('In handleLoginRequest function')

    try {
      isInputEmpty()
      try {
        isUserValid()
        showAppPage()
      } catch (error) {
        logError(error)
      }
    } catch (error) {
      logError(error)
    }

  }

  const showAppPage = () => {
    const username = document.querySelector("#LoginFormUserInput").value
    setUserName(username)
    setAppState('AppPage')
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
  }else if(appState === 'EndPage'){
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

