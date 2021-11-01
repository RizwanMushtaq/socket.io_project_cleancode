import React, {useState} from 'react'
import Style from "./AppPage.module.scss"
import { logWithDebug } from '../utils/logHandling'
import UserActions from "./../socket.io/socket"
import {doesAllWidgetsShown, isCommandExecuted} from './appPage'

import CompleteComponent from '../components/command_components/CompleteComponent'
import DateComponent from '../components/command_components/DateComponent'
import MapComponent from '../components/command_components/MapComponent'
import RateComponent from '../components/command_components/RateComponent'

export default function AppPage(
    {   
        userName, 
        setAppState,
    }) {
    logWithDebug('In AppPage Component')
    
    //Hook to store data from user response
    let [userResponseData, setUserResponseData] = useState(null)
    //Hook to store if Widget(component) should be shown or not
    let [isWidgetVisible, setIsWidgetVisible] = useState(true)
    //Hook to store command data received from server
    let [commandDataFromServer, setCommandDataFromServer] = useState(null)
    //Hook to store message data from Server
    let [messageDataFromServer, setMessageDataFromServer] = useState(null)
    
    //Function to call when User click on "Send Command" Button
    const handleCommandRequest = async () => {
        logWithDebug("In handleCommandRequest function")

        if(doesAllWidgetsShown()){
            setAppState('EndPage')
            return
        }

        let result = await UserActions.getCommandResponse()
        logWithDebug('Result in AppPage.js')
        logWithDebug(result)
        logWithDebug(UserActions.widgetArray)

        if(!isCommandExecuted(result)){
            UserActions.widgetArray.push(result.command.type)
            logWithDebug('item pushed in Array')
            setCommandDataFromServer(result)
            setIsWidgetVisible(true)
            return
        }
        handleCommandRequest()   
    }

    //Function to call when user click on the buttons displayed on widget
    const userResponseHandler = async (e) => {
        logWithDebug("In userResponseHandler function")

        setUserResponseData({
            user: userName,
            selection: e.target.innerHTML
        })

        const data = {
            author: userName,
            message: e.target.innerHTML
        }

        let result = await UserActions.getMessageResponse(data)
        logWithDebug(result)

        setMessageDataFromServer(result)
        setIsWidgetVisible(false)
        return
    }

    //Logic To render different widgets in Viewer
    let componentShown = null
    if(commandDataFromServer){
        if(commandDataFromServer.command.type === "date"){
            componentShown = <DateComponent
                                commandDataFromServer={commandDataFromServer}
                                isWidgetVisible={isWidgetVisible}
                                userResponseData={userResponseData}
                                messageDataFromServer={messageDataFromServer}
                                userResponseHandler={userResponseHandler}
                            />
        } else if(commandDataFromServer.command.type === "map"){
            componentShown = <MapComponent
                                commandDataFromServer={commandDataFromServer}
                            />
        } else if(commandDataFromServer.command.type === "rate"){
            componentShown = <RateComponent
                                commandDataFromServer={commandDataFromServer} 
                                isWidgetVisible={isWidgetVisible}
                                userResponseData={userResponseData}
                                messageDataFromServer={messageDataFromServer}
                                userResponseHandler={userResponseHandler}
                            />
        } else if(commandDataFromServer.command.type === "complete"){
            componentShown = <CompleteComponent
                                commandDataFromServer={commandDataFromServer}
                                setAppState={setAppState}
                                isWidgetVisible={isWidgetVisible}
                                userResponseData={userResponseData}
                                messageDataFromServer={messageDataFromServer}
                                userResponseHandler={userResponseHandler}
                            />
        } else {
            componentShown = null
        }
    }

    return (
        <div className={Style.container}>
            <div className={Style.header} >Welcome {userName} </div>
            <div className={Style.body} >
                <div className={Style.innercontainer}>
                    <button onClick={handleCommandRequest}>Send Command</button>
                </div>
                <div className={Style.innercontainer}>
                    {
                        commandDataFromServer && componentShown
                    }
                </div>
            </div>
        </div>
    )
}
