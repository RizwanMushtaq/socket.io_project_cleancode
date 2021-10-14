import React, {useState, useEffect} from 'react'
import Style from "./AppPage.module.scss"


import CompleteComponent from './command_components/CompleteComponent'
import DateComponent from './command_components/DateComponent'
import MapComponent from './command_components/MapComponent'
import RateComponent from './command_components/RateComponent'

export default function AppPage({ userName, socket}) {

    // let [message, setMessage] = useState("")
    // let [messagedataArray, setMessagedataArray] = useState([])
    
    //variable to assign type of command received from server
    let [commandType, setCommandType] = useState(null)
    let [commandData, setCommandData] = useState(null) 

    //Function to call when click on Send Message Button
    // const sendMessageRequestHandler = async () => {
    //     console.log("In sendMessageRequestHandler function")

    //     if(message.trim() !== ""){
    //         const data = {
    //             author: userName,
    //             message: message
    //         }
    //         console.log(data)
    //         await socket.emit('message' , data)
    //     } else {
    //         alert("Mesaage Input is empty")
    //     }
    // }

    //Function to call when click on Send Command Button
    const sendCommandRequestHandler = async () => {
        console.log("In sendCommandRequestHandler function")
        await socket.emit('command')
    }

    let componentShown = null
    if(commandType === "date"){
        componentShown = <DateComponent
                            commandData={commandData} 
                        />
    } else if(commandType === "map"){
        componentShown = <MapComponent
                            commandData={commandData} 
                        />
    } else if(commandType === "rate"){
        componentShown = <RateComponent 
                            commandData={commandData}
                        />
    } else if(commandType === "complete"){
        componentShown = <CompleteComponent
                            commandData={commandData}
                        />
    } else {
        componentShown = null
    }

    //Use Effect Hook
    useEffect( () => {

        console.log("In use Effect of AppPage Component")

        // socket.on("message", (data) => {
        //     console.log(data)
        //     setMessagedataArray([...messagedataArray, {
        //         responseSender: data.author,
        //         response: data.message
        //     }])
        // })

        
        socket.on("command", (data) => {
            setCommandData(null)
            console.log("Command request response")
            console.log(data)
            setCommandType(data.command.type)
            setCommandData(data.command.data)
        })

    }, [socket])

    return (
        <div className={Style.container}>
            <div className={Style.header} >Welcome {userName} </div>

            <div className={Style.body} >

                {/* <div className={Style.innercontainer}>

                    <div className={Style.topLabel}> Message Events Section </div>
                    <div className={Style.outputDiv}>{
                        messagedataArray.map( (item) => (
                            <div className={Style.outputDivInner}>
                                <div className={Style.outputDivInnerA}>{item.responseSender + ": "}</div>
                                <div className={Style.outputDivInnerB}>{item.response}</div>
                            </div>
                            
                        ))}
                    </div>
                    
                    <textarea 
                        placeholder="Type your message here"
                        rows="3"
                        cols="25"
                        onChange={ (event) => {
                            setMessage(event.target.value)
                        }}
                    />
                    <button onClick={sendMessageRequestHandler} >Send Message</button>
                </div> */}

                <div className={Style.innercontainer}>
                    {/* <div className={Style.topLabel}> Command Events Section </div>
                    <div className={Style.outputDiv}></div> */}
                    <button onClick={sendCommandRequestHandler}>Send Command</button>
                </div>

                <div className={Style.innercontainer}>
                    {
                        commandType && componentShown
                    }
                </div>

            </div>
        </div>
    )
}


