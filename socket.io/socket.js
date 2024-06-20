const socketIO=require('socket.io')
const dotenv = require('dotenv')
dotenv.config()
const chatController=require('../controller/chatController')

function intializeSocket(server) {
    const io = socketIO(server, {
        pingTimeout: 60000,
        cors: {
            origin: 'http://localhost:4200'
        },
    });

    // Socket.io connections
    io.on('connection', (socket) => {
        socket.on('setup', (id) => {
            socket.join(id)
            socket.emit('connected')
            console.log('A user connected');
        });

        socket.on('privateChat', (message) => {
            console.log(message,"message private");
            const recevePrivateMessage=message.senderId
            console.log(recevePrivateMessage);
            io.emit(recevePrivateMessage, message);
             chatController.sendMessage(message)
     

        });
        socket.on('groupChat', (a) => {
            io.emit(a.groupId,a)
            chatController.sendGroupMessage(a)
        })

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

}
module.exports = intializeSocket