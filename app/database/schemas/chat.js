
const Mongoose = require('mongoose')

const ChatSchema = new Mongoose.Schema({
    roomId: { type: String, required: true },
    isMe: { type: Boolean, default: false },
    message: { type: String, required: true }
})

const chatModel = Mongoose.model('chat', ChatSchema);

module.exports = chatModel;
