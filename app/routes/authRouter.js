var express = require('express');
var User = require('../models/User');
var router = express.Router();
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/APP_CONFIG');

router.post('/register', function(req, res, next){
	const { body: {name, password } } = req;

	if(!name) {
		return next(new Error('name is required'));
	}

	if(!password) {
		return next(new Error('password is required.'));
	}

	bcrypt.hash(password, SALT_ROUNDS, function(err, hash) {
		if (err)
			return ǹext(err);

		var user = new User(req.body);
		user.password = hash;

		user.save()
			.then(user => res.json(user))
			.catch(next);
	});
});

router.post('/login', function(req, res, next){
	const { body: {name, password } } = req;

	if(!name) {
		return next(new Error('name is required'));
	}

	if(!password) {
		return next(new Error('password is required.'));
	}

	User.findOne({name: name}, function(err,user){
		if (err)
			next(err);

		bcrypt.compare(password, user.password, function(err, isCorrect) {
			if (err)
				return ǹext(err);

			if (isCorrect){
				return res.send('wahoooo!');
			}
			else {
				return res.send('Boouuuuuh');
			}

		});
	});
});

module.exports = router;