const express = require('express');
const router = express.Router();
const Car = require('../models/car');


router.get('/', (req, res) =>{
    Car.find({}, (err, foundCars) => {
        res.render('cars/index.ejs', {
            cars: foundCars
        });
    });
});

module.exports = router