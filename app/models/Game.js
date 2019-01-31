var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PlaySchema = require('./Play').schema;

var schema   = new Schema(
	{
		type: mongoose.Schema.Types.ObjectId,
	    home: String,
	    away: String,
	    date: Date,
	    created_on: {
	    	type: Date,
	    	default: Date.now()
	    },
	    isAPractice: {
	    	type: Boolean,
	    	default: false
	    }
	}, 
	{
		strict: false,
		_id: true
	}
);
// Indexes
schema.index({home: 1, away: 1, date: 1}, {unique: true});
module.exports = mongoose.model('Game', schema);