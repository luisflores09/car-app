const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    name: String,

});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;