var Game = require('../models/Game');
var Play = require('../models/Play');

exports.getPlays = function(req,res) {
	var home = req.params.team1;
	var away = req.params.team2;
	var date = new Date(req.params.date);
	var gameID = "";
	Game.findOne({
		home: home,
		away: away,
		date: date
	}, function(err,game){
		if (err)
			res.send(err);

		gameID = game['_id'];
	});
}