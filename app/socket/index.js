const session = require('../session');
const Room = require('../models/room');

const ioEvents = (io) => {

    // Chatroom namespace
    io.of('/chatroom').on('connection', (socket) => {
        socket.on('join', (roomId, cb) => {
            socket.join(roomId);
        })

        socket.on('newMessage', (roomId, message, cb) => {
            Room.findById(roomId, (err, room) => {
                if (socket.request.session.passport && socket.request.session.passport.user) {
                    message.username = socket.request.session.passport.user
                } else {
                    message.username = (room.user &&
                        (room.user.name || room.user.email.length > 30 ? room.user.email.substring(0, 30) + '...' : room.user.email))
                        || 'Anonymous'
                }
                Room.findAndPushChatsById(roomId, message, (error, updatedRoom) => {
                    cb(message)
                    socket.broadcast.to(roomId).emit('addMessage', message)
                })
            })
        })
    })
}

const init = (app) => {
    const server = require('http').Server(app)
    const io = require('socket.io')(server)

    // Allow sockets to access session data
    io.use((socket, next) => {
		session(socket.request, {}, next);
	});

    // Define all Events
    ioEvents(io);

    return server;
}

module.exports = init;