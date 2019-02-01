var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PlaySchema = require('./Play').schema;

var schema   = new Schema(
	{
		type: mongoose.Schema.Types.ObjectId,
	    home: String,
	    away: String,
	    date: Date,
	    is_a_practice: {
	    	type: Boolean,
	    	default: false
	    },
	    created_on: {
	    	type: Date,
	    	default: Date.now()
	    },

	    last_modified: {
	    	type: Date,
	    	default: Date.now()
	    }
	}, 
	{
		strict: false,
		_id: true
	}
);

schema.pre('save', function(next){
	this.last_modified = Date.now();
	return next();
});

// Indexes
schema.index({home: 1, away: 1, date: 1}, {unique: true});
module.exports = mongoose.model('Game', schema);