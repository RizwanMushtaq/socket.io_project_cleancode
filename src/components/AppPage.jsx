import React, {useState, useEffect} from 'react'
import Style from "./AppPage.module.scss"

import Command from "./command_components/command_socket"

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
    let [commandCompleteData, setCommandCompleteData] = useState(null)


    //Hooks to store for user response
    let [outputData, setOutputData] = useState(null)
    let [serverData, setServerData] = useState(null)
    
    //Function to call when user click on the buttons displayed on widget
    const userResponseHandler = async (e) => {
        console.log("In userResponseHandler function")

        setOutputData({
            user: userName,
            selection: e.target.innerHTML
        })

        const data = {
            author: userName,
            message: e.target.innerHTML
        }
        let result = await Command.getMessageResponse(data)
        console.log(result)
        setServerData(result)
        setIsWidgetVisible(false)
        return
    }

    //Function to call when click on Send Command Button
    const sendCommandRequestHandler = async () => {
        console.log("In sendCommandRequestHandler function")
        // await socket.emit('command')
        let result = await Command.getResponse()
        console.log('Result in AppPage.js')
        console.log(result)
        console.log(Command.widgetArray)

        if(Command.widgetArray.length < 4){

            let breakLoop = false

            for(let i = 0; i<Command.widgetArray.length; i++){
                if(Command.widgetArray[i] === result.command.type){
                    console.log('item is equal to data')
                    breakLoop = true
                    break
                } else {
                    console.log('item is not equal to data')
                }
            }

            if(breakLoop){
                sendCommandRequestHandler()
                return
            } else {
                Command.widgetArray.push(result.command.type)
                console.log('item pushed in Array')
                setCommandCompleteData(result)
                setIsWidgetVisible(true)
                return
            }
            

        } else {
            console.log('All widgets are shown to user')
            Command.widgetArray = []
            setAppState('EndPage')
            console.log(Command.widgetArray)
            return
        } 

    }

    //Logic To render different widgets in Viewer
    let componentShown = null
    if(commandCompleteData){
        if(commandCompleteData.command.type === "date"){
            componentShown = <DateComponent
                                commandCompleteData={commandCompleteData}
                                isWidgetVisible={isWidgetVisible}
                                outputData={outputData}
                                serverData={serverData}
                                userResponseHandler={userResponseHandler}
                            />
        } else if(commandCompleteData.command.type === "map"){
            componentShown = <MapComponent
                                commandCompleteData={commandCompleteData}
                            />
        } else if(commandCompleteData.command.type === "rate"){
            componentShown = <RateComponent
                                commandCompleteData={commandCompleteData} 
                                isWidgetVisible={isWidgetVisible}
                                outputData={outputData}
                                serverData={serverData}
                                userResponseHandler={userResponseHandler}
                            />
        } else if(commandCompleteData.command.type === "complete"){
            componentShown = <CompleteComponent
                                commandCompleteData={commandCompleteData}
                                setAppState={setAppState}
                                isWidgetVisible={isWidgetVisible}
                                outputData={outputData}
                                serverData={serverData}
                                userResponseHandler={userResponseHandler}
                            />
        } else {
            componentShown = null
        }
    }

    //Use Effect Hook
    useEffect( () => {
        console.log("In use Effect of AppPage Component")

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
                        commandCompleteData && componentShown
                    }
                </div>
            </div>
        </div>
    )
}
