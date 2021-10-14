import React from 'react'
import Style from "./RateComponent.module.scss"

function RateComponent(
    {
        commandData,
        isWidgetVisible, 
        outputData,
        serverData,
        userResponseHandler
    }) {

    // console.log(commandData)
    let dataArray = []

    if(commandData){
        for(let i= commandData[0]; i <= commandData[1]; i++){
            dataArray.push(i)
        }
    }
    

    return (
        <div className={Style.container}>
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

export default RateComponent
