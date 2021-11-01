import { io } from "socket.io-client"
import { logWithDebug } from './../utils/logHandling'
const socket = io("https://demo-chat-server.on.ag/")

socket.on("connect", () => {
    logWithDebug('User Connected ' + socket.id); // x8WIv7-mJelg7on_ALbx
})

const UserActions = {}

UserActions.getCommandResponse = async () => {
    logWithDebug('In getResponse function')
    socket.emit('command')
    
    return new Promise( (resolve, reject) => {
        socket.on("command", (data) => {
            resolve(data)
        })
    })
}

UserActions.getMessageResponse = async (data) => {
    logWithDebug('In getMessageResponse function')
    socket.emit('message', data)
    
    return new Promise( (resolve, reject) => {
        socket.on("message", (data) => {
            resolve(data)
        })
    })
}

UserActions.widgetArray = []

export default UserActions