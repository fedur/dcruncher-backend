var Game = require('../models/Game');
var Play = require('../models/Play');

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