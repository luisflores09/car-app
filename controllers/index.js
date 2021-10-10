const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.session);
    res.render('home.ejs', {user: req.session.user});
});

module.exports = router;