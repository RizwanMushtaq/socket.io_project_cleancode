import React, {useState, useEffect} from 'react'
import Style from "./AppPage.module.scss"

import CompleteComponent from './command_components/CompleteComponent'
import DateComponent from './command_components/DateComponent'
import MapComponent from './command_components/MapComponent'
import RateComponent from './command_components/RateComponent'

export default function AppPage(
    { 
        userName, 
        socket, 
        setAppState,
    }) {

    console.log('In AppPage Component')
    //Hooks to keep track of visibilty of widgets
    let [isWidgetVisible, setIsWidgetVisible] = useState(true)

    //variable to assign type of command received from server
    let [commandType, setCommandType] = useState(null)
    let [commandData, setCommandData] = useState(null) 

    //Hooks to store for user response
    let [outputData, setOutputData] = useState(null)
    let [serverData, setServerData] = useState(null)

    const userResponseHandler = async (e) => {
        console.log(e.target.innerHTML)
        
        setOutputData({
            user: userName,
            selection: e.target.innerHTML
        })

        const data = {
            author: userName,
            message: e.target.innerHTML
        }
        await socket.emit('message' , data)
    }

    //Function to call when click on Send Command Button
    const sendCommandRequestHandler = async () => {
        console.log("In sendCommandRequestHandler function")
        await socket.emit('command')
    }

    //Logic To render different widgets in Viewer
    let componentShown = null
    if(commandType === "date"){
        componentShown = <DateComponent
                            commandData={commandData}
                            isWidgetVisible={isWidgetVisible}
                            outputData={outputData}
                            serverData={serverData}
                            userResponseHandler={userResponseHandler}
                        />
    } else if(commandType === "map"){
        componentShown = <MapComponent
                            commandData={commandData} 
                        />
    } else if(commandType === "rate"){
        componentShown = <RateComponent 
                            commandData={commandData}
                            isWidgetVisible={isWidgetVisible}
                            outputData={outputData}
                            serverData={serverData}
                            userResponseHandler={userResponseHandler}
                        />
    } else if(commandType === "complete"){
        componentShown = <CompleteComponent
                            commandData={commandData}
                            setAppState={setAppState}
                            isWidgetVisible={isWidgetVisible}
                            outputData={outputData}
                            serverData={serverData}
                            userResponseHandler={userResponseHandler}
                        />
    } else {
        componentShown = null
    }

    //Use Effect Hook
    useEffect( () => {
        console.log("In use Effect of AppPage Component")

        socket.on("command", (data) => {
            setCommandData(null)
            console.log("Command request response")
            console.log(data)
            setCommandType(data.command.type)
            setCommandData(data.command.data)
            setIsWidgetVisible(true)
        })

        socket.on("message", (data) => {
            console.log("message request response")
            console.log(data)
            setServerData(data)
            setIsWidgetVisible(false)
        })

    }, [socket])

    return (
        <div className={Style.container}>
            <div className={Style.header} >Welcome {userName} </div>
            <div className={Style.body} >
                <div className={Style.innercontainer}>
                    <button onClick={sendCommandRequestHandler}>Send Command</button>
                </div>
                <div className={Style.innercontainer}>
                    {
                        commandData && componentShown
                    }
                </div>
            </div>
        </div>
    )
}


