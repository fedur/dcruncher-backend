const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

var User = require('../models/User');

/*passport.use(new LocalStrategy(
	{
		usernameField: 'user[name]',
		passwordField: 'user[password]'
	},
	(name, password, next) => {
		Users.findOne({ name })
			.then((user) => {

				if(!user || !user.validatePassword(password)) {
					return next(null, false, { errors: { 'email or password': 'is invalid' } });
				}

				return next(null, user);
	    	}).catch(next);
})); */