export function consoleLogWhenVariableIsSet(message){
    if(localStorage.getItem('showConsoleLogs')) console.log(message)
}