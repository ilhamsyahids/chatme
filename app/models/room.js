
const roomModel = require('../database').models.room;

const create = function (data, callback) {
    const newRoom = new roomModel(data);
    newRoom.save(callback);
}

const find = function (data, callback){
	roomModel.find(data, callback);
}

const findById = function (id, callback){
	roomModel.findById(id, callback);
}

const findAndPushChatsById = function (id, message, callback){
	roomModel.findByIdAndUpdate(id, { $push: { chats: message } }, callback);
}

module.exports = {
    create,
    find,
    findById,
    findAndPushChatsById
}