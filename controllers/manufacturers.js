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

module.exports = router