
const Mongoose = require('mongoose')

const RoomSchema = new Mongoose.Schema({
    title: { type: String, default: Date.now() },
    user: {
        type: {
            name: { type: String, default: null },
            email: { type: String, default: null }
        }
    },
    chats: {
        type: [{
            username: { type: String, default: 'You' },
            content: { type: String, required: true },
            date: { type: Number, required: true, default: Date.now() }
        }],
        default: []
    },
    notification: { type: Boolean, default: false }
})

const roomModel = Mongoose.model('room', RoomSchema);

module.exports = roomModel;
