import React from 'react'
import { set ,addDays, format } from 'date-fns'
import Style from './DateComponent.module.scss'

function DateComponent(
    {
        commandCompleteData,
        isWidgetVisible, 
        outputData,
        serverData,
        userResponseHandler
    }) {

    console.log("In DateComponent")
    console.log(commandCompleteData)
    
    let resultDate = null
    let weekData = null
    let weekDays = []
    let date = commandCompleteData.command.data
    if(commandCompleteData){
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
                commandCompleteData && <div className={Style.container}>
                    {
                        isWidgetVisible && <div>
                            <div>Select Day of your choice to join Ottonova</div>
                            <div className={Style.buttonContainer}>
                                {
                                    commandCompleteData && weekDays.map( (item) => (
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
                                    outputData && 
                                        <div className={Style.outputDiv}>
                                            <div>{outputData.user}&nbsp;:</div>
                                            <div>&nbsp;{outputData.selection}</div>
                                        </div>
                                }
                            </div>
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
            }
        </div>   
    )
}

export default DateComponent


function takeWeek(start) {
    let date = start

    return function() {
        const week = [...Array(7)].map( (_, i) => addDays(date, i))
        date = addDays(week[6], 1)
        return week
    }
}