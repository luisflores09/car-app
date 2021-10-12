const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    name: String,
    manufacturer: String,
    year: Number,
    color: String,
    horsepower: Number,
    transmissionType: String,
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;