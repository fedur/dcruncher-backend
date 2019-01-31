var Game = require('../models/Game');
const { MongoError } = require('mongodb');

// Directly takes query elements as fields for search in the database.
exports.getGames = function(req,res, next){
	Game.find(req.query, function(err,games) {
		if (err)
			next(err);
		res.json(games);
	})
}
// Get game corresponding to a certain Date.
exports.getSingleGame = function(req,res, next){
	var home = req.params.team1;
	var away = req.params.team2;
	var date = new Date(req.params.date);
	Game.find({
		home: home,
		away: away,
		date: date
	})
		.then(game => res.json(game))
		.catch(error => next(error));
}

// Get all games between two teams
var getMatchups = function(req,res, next){
	var team2 = req.params.team2;
	var team1 = req.params.team1;
	console.log(team1);
	console.log(team2);
	Game.find().or(
		[
			{home: team1, away: team2}, 
			{home: team2, away: team1}
		])
		.then(games => { res.json(games)})
		.catch(error => { next(error);
}

var getTeamGames = function(req,res){
	var team = req.params.team;
	Game.find().or(
		[
			{home: team}, 
			{away: team}
		])
		.then(games => { res.json(games)})
		.catch(error => { next(error)});
}


exports.createNewGame = function(req,res, next){
	var home = req.params.team1;
	var away = req.params.team2;
	var date = req.params.date;
	var game = new Game();
	game.set('home', home);
	game.set('away', away);
	game.set('date', date);
	game.save()
		.then(game => res.json(game))
		.catch(error => next(error));
}

exports.modifyGame = function(req,res){
	var home = req.params.team1;
	var away = req.params.team2;
	var date = req.params.date;
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