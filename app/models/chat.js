
const chatModel = require('../database').models.chat;

const create = function (data, callback) {
    const newChat = new chatModel(data);
    newChat.save(callback);
}

module.exports = {
    create
}