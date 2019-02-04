var Game = require('../models/Game');
var Play = require('../models/Play');

// ************ IMPORTANT  ************
// SEE gamesRouter for first MiddleWare
// req.gameId contains the game ID in all :id routes
// *****************************************

exports.getGames = function(req,res, next){
	Game.find(req.query, function(err,games) {
		if (err)
			next(err);
		res.json(games);
	})
}

exports.getSingleGame = function(req,res,next){
	Game.findById(req.gameId)
		.then(game=> res.json(game))
		.catch(error => {
			next(new Error('No game was found matching id ' + req.gameId));
		});
}

exports.updateGame = function(req,res,next){
	Game.findOneAndUpdate(
		{_id: req.gameId}, 
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


exports.addPlaysToGame = function(req,res, next) {
	var play = new Play(req.body);
	play.game_id = req.gameId;

	Play.findOneAndUpdate(
		{
			game_id: req.gameId,
			play_nb: req.body.play_nb
		}, 
		req.body,
		{
			upsert: true,
			new: true
		})
		.then(game=>res.json(game))
		.catch(error=> next(error));
}

exports.getPlaysByGame = function(req,res, next) {
	Play.find().and(
		[
			{game_id: req.gameId}, 
			req.query
		]).exec()
			.then(games => { res.json(games)})
			.catch(error => { next(error)});
}

exports.getPlayByPlayNumber = function(req,res,next) {
	Play.findOne(
		{
			game_id: req.gameId,
			play_nb: req.params.playNb
		})
			.then(game => res.json(game))
			.catch(error => next(error));
}