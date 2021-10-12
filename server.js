const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const expressSession = require('express-session');
const indexController = require('./controllers/index');
const userController = require('./controllers/users');
const carsController = require('./controllers/cars');
const manufacturersController = require('./controllers/manufacturers');
const carSeed = require('./models/carseed');
const Car = require('./models/car');
const Manufacturer = require('./models/manufacturer');
const manufacturerSeed = require('./models/manufacturerseed');

require('dotenv').config();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;


mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err.message + ' is MONGODB not running?'));
db.on('connected', () => console.log('MONGO DB Connected', MONGODB_URL));
db.on('disconnected', () => console.log('MONGODB Disconnected'));


app.use(expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(morgan('dev'));

app.use(express.urlencoded({
    extended: false
}));

app.get('/cars/seed', (req, res) => {
    Car.deleteMany({}, (error, allCars) => {})
    Car.create(carSeed, (error, data) => {
        res.redirect('/cars')
    });
});

app.get('/manufacturers/seed', (req, res) => {
    Manufacturer.deleteMany({}, (error, allManufacturers) => {})
    Manufacturer.create(manufacturerSeed, (error, data) => {
        res.redirect('/manufacturers')
    });
});

app.use('/', indexController);

app.use('/', userController);

app.use('/cars', carsController);

app.use('/manufacturers', manufacturersController);


app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));