var Game = require('../models/Game');
var Play = require('../models/Play');

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

exports.getPlays = function(req,res,next) {
	Play.find(req.query, function(err,games) {
		if (err)
			return next(err);
		res.json(games);
	})
}

exports.addPlays = function(req,res,next) {
	Play.findOneAndUpdate(
		{
			game_id: req.body.game_id,
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

exports.getPlayById = function(req,res,next) {
	Play.find({_id: req.params.playId})
		.then(game => res.json(game))
		.catch(error=> next(error));
}