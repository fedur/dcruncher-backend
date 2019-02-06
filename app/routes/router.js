var express = require('express');
var app = express(); 
var router = express.Router();
var jwt = require('jsonwebtoken');
var { secret } = require("../config/APP_CONFIG");

// ROUTES FOR OUR API
// =============================================================================
var gamesRouter = require('./gamesRouter');
var playsRouter = require('./playsRouter');
var authRouter = require('./authRouter');
var User = require('../models/User');


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

router.use('/games', verifyToken, gamesRouter);
router.use('/plays', verifyToken, playsRouter);
router.use('/auth', authRouter);


module.exports = router;