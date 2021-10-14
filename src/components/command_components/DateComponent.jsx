import React from 'react'
import { set ,addDays, format } from 'date-fns'
import Style from './DateComponent.module.scss'

function DateComponent({commandData}) {
    console.log(commandData)

    let resultDate = set(new Date(commandData), { commandData })
    console.log(resultDate)
    let weekData = takeWeek(resultDate)()
    weekData.map((date) => 
        console.log(format(date, 'EEEE'))
    )
    let weekDays = []
    weekData.map((date) => 
        weekDays.push(format(date, 'EEEE'))
    )


    return (
        <div className={Style.container}>
            <div>Select Day of your choice to join Ottonova</div>
            <div className={Style.buttonContainer}>
                {
                    commandData && weekDays.map( (item) => (
                        <button key={item}>
                            {item}
                        </button>
                    ))
                }
            </div>
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