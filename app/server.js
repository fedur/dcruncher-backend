// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const url = 'mongodb://datacruncher:bobthelifter001@ds159204.mlab.com:59204/games';
mongoose.connect(url);

// ROUTES FOR OUR API
// =============================================================================
var gamesRouter = require('./routes/gamesRouter');
var indexRouter = require('./routes/indexRouter');

// Error Routes
app.use('/', indexRouter);
app.use('/api/', indexRouter);

// Valid Routes
app.use('/api/games', gamesRouter);

// START THE SERVER
// =============================================================================
var port = process.env.PORT || 8080;	// set our port
app.listen(port);
console.log('Magic happens on port ' + port);