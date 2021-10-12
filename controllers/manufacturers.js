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


router.delete('/:id', (req, res) => {
    Manufacturer.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/manufacturers');
    });
});

router.post('/', (req, res) => {
    Manufacturer.create(req.body, (err, createdManufacturer) =>{
        res.redirect('/manufacturers');
    });
});


router.get('/:id', (req, res) =>{
    Manufacturer.findById(req.params.id, (err, foundManufacturer) =>{
        res.render('manufacturers/show.ejs', {
            manufacturer: foundManufacturer
        });
    });
});

module.exports = router