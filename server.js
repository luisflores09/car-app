const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const expressSession = require('express-session');
const indexController = require('./controllers/index');

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


app.use('/', indexController);


app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));