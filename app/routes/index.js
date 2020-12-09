
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', {
        success: null,
        errors: null
    });
})

module.exports = router;