
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
            date: { type: Date, required: true, default: Date.now }
        }],
        default: []
    },
    updatedAt: { type: Date, expires: 30 * 24 * 3600, default: Date.now }, // Expired after 30 days
    notification: { type: Boolean, default: false }
}, { 'timestamps': true })

const roomModel = Mongoose.model('room', RoomSchema);

module.exports = roomModel;
