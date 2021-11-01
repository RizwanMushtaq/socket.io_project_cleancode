import React from 'react'
import Style from "./RateComponent.module.scss"

function RateComponent(
    {
        commandDataFromServer,
        isWidgetVisible, 
        userResponseData,
        messageDataFromServer,
        userResponseHandler
    }) {
    
    let commandData = commandDataFromServer.command.data
    console.log('In RateComponent')
    console.log(commandData)
    let dataArray = []

    if(commandData){
        for(let i= commandData[0]; i <= commandData[1]; i++){
            dataArray.push(i)
        }
    }

    return (
        <div className={Style.container}>
            {
                commandData && <div className={Style.container}>
                    {
                        isWidgetVisible && <div>
                            <div>Rate your experience with App</div>
                            <div className={Style.buttonContainer}>
                                {
                                    commandData && dataArray.map( (item) => (
                                        <button key={item} onClick={userResponseHandler}>
                                            {item}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>
                    }
                    {
                        !isWidgetVisible && <div>
                            <div>
                                {
                                    userResponseData && 
                                        <div className={Style.outputDiv}>
                                            <div>{userResponseData.user}&nbsp;:</div>
                                            <div>&nbsp;{userResponseData.selection}</div>
                                        </div>
                                }
                            </div>
                            <div>
                                {
                                    messageDataFromServer && 
                                        <div className={Style.outputDiv}>
                                            <div>{messageDataFromServer.author}&nbsp;:</div>
                                            <div>&nbsp;{messageDataFromServer.message}</div>
                                        </div>
                                }
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default RateComponent
