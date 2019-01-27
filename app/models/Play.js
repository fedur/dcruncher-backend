var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../config/APP_CONFIG');

var PlaySchema   = new Schema(
	{
		// Drive & Play number, yardage at the beginning of play
		game_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Game'
		},
		drive_nb: Number,
		play_nb: Number,
		at_yard: Number,

		// Down & Distance
		down_nb: {
			type: Number,
			min: 1,
			max: config.NUMBER_OF_DOWNS
		},

		distance_to_first: {
			type: Number,
			min: 1
		},

		play_type: {
			type: String,
			enum: ['pass', 'run']
		},

		yard_completion: Number,
		general: Map,
		defense: Map,
		offense: Map
	}, 
	{
		strict: true
	}
);

module.exports = mongoose.model('Play', PlaySchema);