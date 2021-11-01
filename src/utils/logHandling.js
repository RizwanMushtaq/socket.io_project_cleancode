export function logWithDebug(message){
    if(localStorage.getItem('Ottonova.debug')) console.log(message)
}