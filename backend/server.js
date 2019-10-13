const http = require('http');
const app = require('./app');

const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = require('socket.io')(server);
global.connectedUser = {};

io.on('connection', socket => {
    const { id } = socket;
    let user;
    socket.on('register', (userId) => {
        user = userId;
        connectedUser[userId] = id;
    });

    socket.on('disconnect', () => {
        delete connectedUser[user];
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