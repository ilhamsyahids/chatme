
const roomModel = require('../database').models.room;

const create = function (data, callback) {
    const newRoom = new roomModel(data);
    newRoom.save(callback);
}

const findById = function (id, callback){
	roomModel.findById(id, callback);
}

module.exports = {
    create,
    findById
}