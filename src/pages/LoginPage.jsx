import React from 'react'
import Style from "./LoginPage.module.scss"

import UserLogo from './../assets/images/Benutzer.svg'
import PasswordLogo from './../assets/images/Passwortschloss.svg'

export default function LoginForm({forgotPasswordRequestHandler, handleLoginRequest}) {
    return (
        <div className={Style.container}>
            <div className={Style.formContainer}>
                <div className={Style.InputContainer}>
                    
                    <div className={Style.InputContainerInner}>
                        <div>
                            <img src={UserLogo} alt='UserLogo'></img>
                        </div>
                        <input type='text' id='LoginFormUserInput' placeholder='username'></input>
                    </div>
            
                
                    <div className={Style.InputContainerInner}>
                        <div>
                            <img src={PasswordLogo} alt='PasswordLogo'></img>
                        </div>
                        <input type='password' id='LoginFormPasswordInput' placeholder='password'></input>
                    </div>
                    <p className={Style.forgotPasswordLabel} onClick={forgotPasswordRequestHandler}>Forgot password?</p>
                    
                </div>
                
                <div className={Style.buttonContainer}>
                    <button onClick={handleLoginRequest}>Login</button>
                </div>
            </div>
        </div>
    )
}


