import React from 'react'
import Style from './EndPage.module.scss'

function EndPage({userName ,setAppState}) {

    //Function to call when user click on "Back to Login Page" button
    const backToLoginPageHandler = () => {
        setAppState('LoginPage')
    }

    return (
        <div className={Style.container}>
            <div className={Style.header} >Hi {userName}</div>
            <div className={Style.header} >All Widgets are Shown</div>
            <div className={Style.body} >
                <div className={Style.innercontainer}>
                    <button onClick={backToLoginPageHandler}>Back to Login Page</button>
                </div>
            </div>
        </div>
    )
}

export default EndPage
