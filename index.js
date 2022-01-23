//node server which will handle socket to connections
const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined' , cname =>{
        console.log("New user",cname)
        users[socket.id] = cname;
        socket.broadcast.emit('user-joined',cname);

    });

    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message: message , cname : users[socket.id]})
    });
});