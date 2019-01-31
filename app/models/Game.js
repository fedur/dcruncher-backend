var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PlaySchema = require('./Play').schema;
var ErrorLib = require('./ModelErrorHandling');

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
		strict: true,
		_id: true
	}
);
// Indexes
schema.index({home: 1, away: 1, date: 1}, {unique: true});

// ErrorHandling
//schema.post('save', ErrorLib.handleMongoErrors);
schema.post('update', ErrorLib.handleMongoErrors);
schema.post('findOneAndUpdate', ErrorLib.handleMongoErrors);
schema.post('insertMany', ErrorLib.handleMongoErrors);

//Error Handling


module.exports = mongoose.model('Game', schema);