var Game = require('../models/Game');


// ************ IMPORTANT  ************
// SEE gamesRouter for first MiddleWare
// req.teamId contains the game ID in all :id routes
// *****************************************

exports.getGames = function(req,res, next){
	Game.find(req.query, function(err,games) {
		if (err)
			next(err);
		res.json(games);
	})
}

exports.getSingleGame = function(req,res,next){
	Game.findById(req.teamId)
		.then(game=> res.json(game))
		.catch(error => {
			next(new Error('No game was found matching id ' + req.teamId));
		});
}

exports.createGame = function(req,res,next){
	var id = req.params.teamid;
	Game.findOneAndUpdate(
		{ home: home, away: away, date: date},
		{$set: req.body},
		{new: true},
		function(err,person) {
			if (err)
				res.send(error);
			else 
				res.json(person);
		}
	);
}