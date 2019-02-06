// server.js

// Express Stuff
var express = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var morgan = require('morgan');

// Our Stuff
var ErrorHandler = require('./util/ErrorMiddleWare');
const { secret } = require('./config/APP_CONFIG');

// APP SETUP 
//=================================================================================
var app = express(); 

// Parse Post Data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Mongoose Setup
const url = 'mongodb://datacruncher:bobthelifter001@ds159204.mlab.com:59204/games';
mongoose.set('debug', true);

// Consider setting useCreateIndex to False for production...
mongoose.connect(url, {useNewUrlParser: true, autoIndex: true})
	.then(res => console.log("Connected successfully to DB"))
	.catch(err => console.log(err));


var apiRouter = require('./routes/router');
app.use('/api', apiRouter);

// Error Handlers
app.use(ErrorHandler.handleMongoError);
app.use(ErrorHandler.handleDefaultError);

// START THE SERVER
// =============================================================================
var port = process.env.PORT || 8080;	// set our port
app.listen(port);
console.log('Magic happens on port ' + port);