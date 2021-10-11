const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');


router.get('/login', (req, res) => {
    res.render('login.ejs', { error: ''});
});


router.get('/signup', (req, res) => {
    res.render('signup.ejs');
});


router.post('/signup', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, user) => {
        console.log(user);
        res.redirect('/login');
    });
});

module.exports = router;