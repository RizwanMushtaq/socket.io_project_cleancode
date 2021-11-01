export function LogWithDebug(message){
    if(localStorage.getItem('Ottonova.debug')) console.log(message)
}