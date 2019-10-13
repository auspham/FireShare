const http = require('http');
const app = require('./app');

const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = require('socket.io')(server);
let connectedUser = [];

io.on('connection', socket => {
    const { id } = socket;
    connectedUser.push(id);

    socket.on('disconnect', () => {
        let index = connectedUser.indexOf(id);
        if (index > -1) connectedUser.splice(index, 1);
    });

    socket.on('subscribe', file => {
        socket.join(file);
    });

    socket.on('unsubscribe', file => {
        socket.leave(file);
    })
});

server.listen(port, () => {
    console.log(`Server is listening to port ${port}`);
});

module.exports.io = io;