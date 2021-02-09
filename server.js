const io = require('socket.io')(3000)

const users = {}

io.on('connection',socket=>{
    socket.on('new-user',name =>{
        users[socket.id]= name
        socket.broadcost.emit('user-connected',name)
    })
    console.log('new User')
    socket.emit('chat-message','Hello World')
    socket.on('send-chat-message',message=>{
        socket.broadcost.emit('chat-message',{message:message,
            name:users[socket.id] })
    })
    socket.on('disconnect',() =>{
        socket.broadcost.emit('user-disconnected',users[socket.id])
        delete users[socket.id]
        
    })
})