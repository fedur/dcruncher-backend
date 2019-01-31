// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var ErrorHandler = require('./util/ErrorMiddleWare');

// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const url = 'mongodb://datacruncher:bobthelifter001@ds159204.mlab.com:59204/games';

// Consider setting useCreateIndex to False for production...
mongoose.connect(url, {useNewUrlParser: true})
	.then(res => console.log("Connected successfully to DB"))
	.catch(err => console.log(err));


// ROUTES FOR OUR API
// =============================================================================
var gamesRouter = require('./routes/gamesRouter');
var playsRouter = require('./routes/playsRouter');
var indexRouter = require('./routes/indexRouter');

// Valid Routes
app.use('/api/games', gamesRouter);
app.use('/api/plays', playsRouter);

// Error Routes
app.use('/', indexRouter);
app.use('/api/', indexRouter);


// Default Middleware Error Handling Function
// HandleDefaultError always has to be last
app.use(ErrorHandler.handleMongoError);
app.use(ErrorHandler.handleDefaultError);



// START THE SERVER
// =============================================================================
var port = process.env.PORT || 8080;	// set our port
app.listen(port);
console.log('Magic happens on port ' + port);