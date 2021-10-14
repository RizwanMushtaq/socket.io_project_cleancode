import React from 'react'
import Style from "./CompleteComponent.module.scss"

function CompleteComponent(
    {
        commandData, 
        setAppState,
        isWidgetVisible, 
        outputData,
        serverData, 
        userResponseHandler
    }) {
    // console.log(commandData)

    const userResponse = async (e) => {
        if(e.target.innerHTML === "Yes"){
            console.log('Yes Selected')
            setAppState('LoginPage')
        } else{
            userResponseHandler(e)
        }
    }

    return (
        <div className={Style.container}>
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
                    <div>User Selection</div>
                    <div>
                        {
                            outputData && 
                                <div className={Style.outputDiv}>
                                    <div>{outputData.user}&nbsp;:</div>
                                    <div>&nbsp;{outputData.selection}</div>
                                </div>
                        }
                    </div>
                    <div>Server Response</div>
                    <div>
                        {
                            serverData && 
                                <div className={Style.outputDiv}>
                                    <div>{serverData.author}&nbsp;:</div>
                                    <div>&nbsp;{serverData.message}</div>
                                </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default CompleteComponent
