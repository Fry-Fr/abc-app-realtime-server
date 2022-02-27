require('dotenv').config();
const { Server } = require('socket.io');

const clients = require('./clients');

const io = new Server({cors: '*'});

io.on("connection", (socket) => {

    socket.on("setClient", (usrObj) => {
        socket.name = usrObj.name;
        clients[usrObj.name] = usrObj.letter;
        io.emit("clientList", clients)
        console.log('connected', clients)
    })
    
    socket.on("disconnect", () => {
        delete clients[socket.name]
        io.emit("clientList", clients)
        console.log('user disconnected', socket.name)
    })
})

io.listen(process.env.SOCKETPORT || 3333);
console.log(`**listening on port ${process.env.PORT || 3333}`)
