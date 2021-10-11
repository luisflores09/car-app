const express = require('express');
const router = express.Router();
const Car = require('../models/car');
const Manufacturer = require('../models/manufacturer');


router.get('/', (req, res) =>{
    Car.find({}, (err, foundCars) => {
        res.render('cars/index.ejs', {
            cars: foundCars
        });
    });
});


router.get('/new', (req, res) => {
    Manufacturer.find({}, (err, foundManufacturers) => {
        res.render('cars/new.ejs', {
            manufacturers: foundManufacturers
        });
    });
});

router.post('/', (req, res) => {
    Car.create(req.body, (err, createdCar) => {
        res.redirect('/cars');
    });
});

module.exports = router