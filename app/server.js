// server.js

// BASE SETUP
// =============================================================================
// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var morgan = require('morgan');
var ErrorHandler = require('./util/ErrorMiddleWare');
var passport = require('passport');
const jwt = require('jsonwebtoken');
const { secret } = require('./config/APP_CONFIG');
var User = require('./models/User');

// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const url = 'mongodb://datacruncher:bobthelifter001@ds159204.mlab.com:59204/games';
mongoose.set('debug', true);

// Consider setting useCreateIndex to False for production...
mongoose.connect(url, {useNewUrlParser: true, autoIndex: true})
	.then(res => console.log("Connected successfully to DB"))
	.catch(err => console.log(err));

// HTTP LOGGER
app.use(morgan('dev'));
require('./config/passport');


// ROUTES FOR OUR API
// =============================================================================
var gamesRouter = require('./routes/gamesRouter');
var playsRouter = require('./routes/playsRouter');
var authRouter = require('./routes/authRouter');

var verifyToken = function(req,res,next) {
	const { headers: { authorization } } = req;
	var token = null;
	if(authorization && authorization.split(' ')[0] === 'Bearer') {
		token = authorization.split(' ')[1];
	}
	else {
		next(new Error("Token wasn't included properly in headers. (i.e Authorization: Bearer <token>)"));
	}
	console.log(token);
	var result = jwt.verify(token, secret);
	User.find({username: result})
		.then(user => { 
			if (!user) {
				return next(new Error('Token did not Match any Registered User'));
			}
			else{
				next();
			}
		}).catch(error => next(error));
}

// Valid Routes
app.use('/api/games', verifyToken, gamesRouter);
app.use('/api/plays', verifyToken, playsRouter);
app.use('/api/auth', authRouter);


// Default Middleware Error Handling Function
// HandleDefaultError always has to be last
app.use(ErrorHandler.handleMongoError);
app.use(ErrorHandler.handleDefaultError);



// START THE SERVER
// =============================================================================
var port = process.env.PORT || 8080;	// set our port
app.listen(port);
console.log('Magic happens on port ' + port);