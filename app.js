var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();

var indexRouter = require('./routes/index');

var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Configurations
console.log("");
console.log("***CONFIGURATIONS***")
let config = require('./config');
console.table(config)

app.use('/api', indexRouter);

app.listen(process.env.PORT, () => {
    console.log(`Listeitng in port ${process.env.PORT}`);
})