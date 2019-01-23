var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PlaySchema = require('./Play').schema;

var GameSchema   = new Schema(
	{
	    home: String,
	    away: String,
	    date: Date,
	    plays: [PlaySchema]
	}, 
	{
		strict: true
	}
);

module.exports = mongoose.model('Game', GameSchema);