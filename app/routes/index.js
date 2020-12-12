
const express = require('express');
const router = express.Router();
const faker = require('faker');

const Room = require('../models/room');
const Chat = require('../models/chat');

router.get('/', (req, res) => {
    res.render('home', {
        success: null,
        errors: null
    });
})

router.get('/chat/:id', (req, res) => {
    const roomId = req.params.id;
    Room.findById(roomId, function (err, room) {
        if (err) throw err;
        if (!room) {
            return next();
        }
        console.log(room)
        res.render('chatroom', { user: room.user, room: room });
    });
})

router.post('/send', (req, res) => {
    const { title, name, email, message } = req.body
    const user = {}
    const fakerTitle = faker.git.shortSha()

    if (!!name) user.name = name
    if (!!email) user.email = email

    console.log(user)
    Room.create({
        title: title ? title : fakerTitle,
        user: user
    }, function (err, newRoom) {
        if (err) throw err;
        console.log(newRoom)
        Chat.create({
            roomId: newRoom.id,
            message
        }, function (err) {
            if (err) throw err;
            res.redirect('/');
        })
    });
})

module.exports = router;