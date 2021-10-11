const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');


router.get('/login', (req, res) => {
    res.render('auth/login.ejs', { error: ''});
});


router.post('/login', (req, res) => {
    User.findOne({username: req.body.username}, (err, foundUser) =>{
        if(!foundUser) {
            return res.render('login.ejs', {error: 'Invalid Credentials'});
        }
        const isMatched = bcrypt.compareSync(req.body.password, foundUser.password);
        if(!isMatched) {
            return res.render('login.ejs', {error: 'Invalid Credentials'});
        }
        req.session.user = foundUser._id;
        res.redirect('/dashboard');
    });
});


router.get('/signup', (req, res) => {
    res.render('auth/signup.ejs');
});


router.post('/signup', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, user) => {
        console.log(user);
        res.redirect('/login');
    });
});


router.get('/logout', (req, res) => {
    req.session.destroy(() =>{
        res.redirect('/');
    });
});


router.get('/dashboard', isAuthenticated, (req, res) => {
    User.findById(req.session.user, (err, user) => {
        res.render('dashboard.ejs', {user});
    });
});


function isAuthenticated(req, res, next) {
    if(!req.session.user){
        return res.redirect('/login')
    }
    next();
}

module.exports = router;