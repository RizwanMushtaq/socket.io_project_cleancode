import React from 'react'
import { set ,addDays, format } from 'date-fns'
import Style from './DateComponent.module.scss'

function DateComponent(
    {
        commandDataFromServer,
        isWidgetVisible, 
        userResponseData,
        messageDataFromServer,
        userResponseHandler
    }) {

    console.log("In DateComponent")
    console.log(commandDataFromServer)
    
    let resultDate = null
    let weekData = null
    let weekDays = []
    let date = commandDataFromServer.command.data
    if(commandDataFromServer){
        resultDate = set(new Date(date), { hours: 0 })
        console.log(resultDate)
        weekData = takeWeek(resultDate)()
        weekData.map((date) => 
            weekDays.push(format(date, 'EEEE'))
        )
    }
    

    return (
        <div className={Style.container}>
            {
                commandDataFromServer && <div className={Style.container}>
                    {
                        isWidgetVisible && <div>
                            <div>Select Day of your choice to join Ottonova</div>
                            <div className={Style.buttonContainer}>
                                {
                                    commandDataFromServer && weekDays.map( (item) => (
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

export default DateComponent


function takeWeek(start) {
    let date = start

    return function() {
        const week = [...Array(7)].map( (_, i) => addDays(date, i))
        // date = addDays(week[6], 1)
        return week
    }
}