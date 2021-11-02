export function logWithDebug(message){
    if(localStorage.getItem('Ottonova.debug') === true) {
        console.log(message)
    } 
}