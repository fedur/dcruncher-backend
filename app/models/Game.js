var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema   = new Schema(
	{
	    home: String,
	    away: String,
	    date: Date
	}, 
	{
		strict: true
	}
);

module.exports = mongoose.model('Game', GameSchema);