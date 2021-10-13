const express = require('express');
const router = express.Router();
const Car = require('../models/car');
const Manufacturer = require('../models/manufacturer');


router.get('/', (req, res) => {
    Car.find({}, (err, foundCars) => {
        res.render('cars/index.ejs', {
            cars: foundCars,
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


router.delete('/:id', (req, res) => {
    Car.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/cars')
    });
});


router.put('/:id', (req, res) => {
    Car.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new: true,
        },
        (error, updatedCar) => {
            res.redirect(`/cars/${req.params.id}`)
        }
    )
});


router.post('/', (req, res) => {
    Car.create(req.body, (err, createdCar) => {
        res.redirect('/cars');
    });
});


router.get('/:id/edit', (req, res) => {
    Car.findById(req.params.id, (error, foundCar) => {
        Manufacturer.find({}, (err, foundManufacturers) => {
            res.render('cars/edit.ejs', {
                car: foundCar,
                manufacturers: foundManufacturers
            });
        });
    });
});

router.get('/:id', (req, res) => {
    Car.findById(req.params.id, (err, foundCar) => {
        Manufacturer.findById(foundCar.manufacturer, (err, foundManufacturer) => {
            res.render('cars/show.ejs', {
                car: foundCar,
                manufacturer: foundManufacturer
            });
        });
    });
});

module.exports = router