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

exports.updateGame = function(req,res,next){
	Game.findOneAndUpdate(
		{_id: req.teamId}, 
		req.body,
		{
			upsert: false,
			new: true
		})
		.then(game=>res.json(game))
		.catch(error=> next(error));
}

exports.createGame = function(req,res,next){
	var game = new Game(req.body);
	game.save()
		.then(game => res.json(game))
		.catch(error => next(error));
}