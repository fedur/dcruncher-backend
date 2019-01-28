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
	}).exec()
		.then(game => fetchPlays(game,req.query))
		.catch(error => res.send(error));

	var fetchPlays = function(game, query) {
		Play.find().and(
		[
			{game_id: game['_id']}, 
			query
		])
			.then(games => { res.json(games)})
			.catch(error => { res.send(error)});
	}
}

exports.addPlays = function(req,res) {
	var home = req.params.team1;
	var away = req.params.team2;
	var date = new Date(req.params.date);

	Game.findOne({
		home: home,
		away: away,
		date: date
	}).exec()
		.then(game => savePlay(game['_id'],req))
		.catch(error => res.send(error));

	var savePlay = function(gameId,req){
		var play = new Play(req.body);
		play.set('game_id', gameId);
		play.save()
			.then(play => res.json(play))
			.catch(err => res.send(err));
	}


}