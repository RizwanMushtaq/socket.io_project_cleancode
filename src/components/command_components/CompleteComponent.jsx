import React from 'react'
import Style from "./CompleteComponent.module.scss"
import UserActions from "./../../socket.io/socket"

function CompleteComponent(
    {
        commandDataFromServer,
        setAppState,
        isWidgetVisible, 
        userResponseData,
        messageDataFromServer, 
        userResponseHandler
    }) {
    
    let  commandData = commandDataFromServer.command.data
    console.log('In CompleteComponent')
    console.log(commandData)

    const userResponse = async (e) => {
        if(e.target.innerHTML === "Yes"){
            console.log('Yes Selected')
            UserActions.widgetArray = []
            setAppState('LoginPage')
        } else{
            userResponseHandler(e)
        }
    }

    return (
        <div className={Style.container}>
            {
                commandData && <div className={Style.container}>
                    {
                        isWidgetVisible && <div>
                            <div>
                                Do you want to close the conversation:
                            </div>
                            <div className={Style.buttonContainer}>
                                {
                                    commandData && commandData.map( (item) => (
                                                    <button key={item} onClick={userResponse}>
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

export default CompleteComponent
