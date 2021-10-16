import React from 'react'

function EndPage({setAppState}) {


    const backToLoginPageHandler = () => {
        setAppState('LoginPage')
    }

    return (
        <div>
            <div>
                All Widgets are Shown
            </div>
            <div>
                Click on button below to Login Page
            </div>
            <div>
                <button onClick={backToLoginPageHandler}>Back to Login Page</button>
            </div>
        </div>
    )
}

export default EndPage
