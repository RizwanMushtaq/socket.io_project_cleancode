import UserActions from "../socket.io/socket"
import { logWithDebug } from '../utils/logHandling'

export const doesAllWidgetsShown = () => {
    if(UserActions.widgetArray.length >= 4){
        logWithDebug('All widgets are shown to user')
        UserActions.widgetArray = []
        return true
    }
    return false
} 

export const isCommandExecuted = (result) => {
    let flag = false
    for(let i = 0; i<UserActions.widgetArray.length; i++){
        if(UserActions.widgetArray[i] === result.command.type){
            logWithDebug('item is equal to data')
            flag = true
            break
        } else {
            logWithDebug('item is not equal to data')
        }
    }
    return flag
}