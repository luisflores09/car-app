const express = require('express');
const router = express.Router();
const Manufacturer = require('../models/manufacturer');

router.get('/', (req, res) => {
    Manufacturer.find({}, (err, foundManufacturers) => {
        res.render('manufacturers/index.ejs', {
            manufacturers: foundManufacturers
        });
    });
});


router.get('/new', (req, res) => {
    res.render('manufacturers/new.ejs');
});


router.post('/', (req, res) => {
    Manufacturer.create(req.body, (err, createdManufacturer) =>{
        res.redirect('/manufacturers');
    });
});

module.exports = router