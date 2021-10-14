import React from 'react'
import Style from "./CompleteComponent.module.scss"

function CompleteComponent({commandData}) {
    // console.log(commandData)

    return (
        <div className={Style.container}>
            <div>
                Do you want to close the conversation:
            </div>
            <div className={Style.buttonContainer}>
                {
                    commandData && commandData.map( (item) => (
                                    <button key={item}>
                                        {item}
                                    </button>
                                ))
                }
            </div>
        </div>
    )
}

export default CompleteComponent
