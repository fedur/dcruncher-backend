var mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const UsersSchema = new Schema({
	name: String,
	password: String
});

UsersSchema.methods.setPassword = async function(password) {
	bcrypt.hash(password, SALT_ROUNDS, function(err, hash) {
		if (err)
			return ǹext(err);
		console.log(hash);
	  	return hash;
	});
};

UsersSchema.methods.validatePassword = function(password) {
	bcrypt.compare(plainTextPass, this.password, function(err, res) {
		if (err)
			return next(err);
		return res;
	});
};

module.exports = mongoose.model('User', UsersSchema);