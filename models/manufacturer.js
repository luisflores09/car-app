const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const manufacturerSchema = new Schema({
    name: String,
    yearFounded: Number,
    country: String,
    image: String,
}, {
    timestamps: true
});

const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);

module.exports = Manufacturer;