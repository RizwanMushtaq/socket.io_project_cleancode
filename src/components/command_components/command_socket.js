import { io } from "socket.io-client"
const socket = io("https://demo-chat-server.on.ag/")

// socket.on("connect", () => {
//     console.log('User Connected ' + socket.id); // x8WIv7-mJelg7on_ALbx
// })

const Command = {}

Command.getResponse = async () => {
    console.log('In getResponse function')
    socket.emit('command')
    
    return new Promise( (resolve, reject) => {
        socket.on("command", (data) => {
            resolve(data)
        })
    })
}

Command.getMessageResponse = async (data) => {
    console.log('In getMessageResponse function')
    socket.emit('message', data)
    
    return new Promise( (resolve, reject) => {
        socket.on("message", (data) => {
            resolve(data)
        })
    })
}

Command.widgetArray = []


export default Command