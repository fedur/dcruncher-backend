var Game = require('../models/Game');
var Play = require('../models/Play');

exports.getPlays = function(req,res) {
	var home = req.params.home;
	var away = req.params.away;
	var date = req.params.date;
	Game.findOne({
		home: home,
		away: away,
		date: date
	}).

}