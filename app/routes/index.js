
const express = require('express');
const router = express.Router();
const faker = require('faker');
const passport = require('passport');

const Room = require('../models/room');
const Chat = require('../models/chat');

router.get('/', (req, res) => {
    const data = {
        isMe: false,
        success: req.flash('success')[0],
        errors: req.flash('error'),
    }
    if (req.isAuthenticated()){
        data.isMe = true
    }
    res.render('home', data);
})

router.get('/chat/:id', (req, res) => {
    const roomId = req.params.id;
    Room.findById(roomId, function (err, room) {
        if (err) {
            req.flash('error', "Invalid Room");
            return res.redirect('/');
        }
        if (!room) {
            return next();
        }
        console.log(room)
        const data = {
            isMe: false,
            room: room
        }
        if (req.isAuthenticated()) {
            data.isMe = true
        }
        res.render('chatroom', data);
    });
})

// Login
router.get('/login', function(req, res, next) {
    // If user is already logged in, then redirect to root page
    if (req.isAuthenticated()){
        res.redirect('/');
    }
    else{
        res.render('login', {
            success: req.flash('success')[0],
            errors: req.flash('error'), 
            showRegisterForm: req.flash('showRegisterForm')[0]
        });
    }
});

router.post('/login', passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

// Logout
router.get('/logout', function(req, res, next) {
    // remove the req.user property and clear the login session
    req.logout();

    // destroy session data
    req.session = null;

    // redirect to homepage
    res.redirect('/');
});

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