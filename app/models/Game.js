var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PlaySchema = require('./Play').schema;

var GameSchema   = new Schema(
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
		strict: true,
		_id: true
	}
);

GameSchema.index({home: 1, away: 1, date: 1}, {unique: true});

// Set ID 
/*GameSchema.pre('save', function(next) {
	this._id = this.home + config.ID_SEPARATOR + 
		this.away + config.ID_SEPARATOR + 
		this.date.toISOString();
	next();
}); */

module.exports = mongoose.model('Game', GameSchema);