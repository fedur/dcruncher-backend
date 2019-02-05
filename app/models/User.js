var mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/APP_CONFIG');

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		index: {unique: true}
	},
	password: {
		type: String,
		required: true
	}
});

UserSchema.methods.generateJWT = function() {
	console.log('A');
}

UserSchema.methods.toAuthJSON = function() {
	return {
		success: true,
		user: {
			_id: this._id,
			username: this.username,
			token: this.generateJWT(),
		}
	};
};

UserSchema.index({username: 1}, {unique:true});

module.exports = mongoose.model('User', UserSchema);