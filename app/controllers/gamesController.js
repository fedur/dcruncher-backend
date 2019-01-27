var Game = require('../models/Game');

// Directly takes query elements as fields for search in the database.
exports.getGames = function(req,res){
	Game.find(req.query, function(err,games) {
	console.log("Ye?");
		if (err)
			res.send(err);

		res.json(games);
	});
}

// Get all games between two teams
exports.getTeamGames = function(req,res){
	console.log("Ya?");
	var team2 = req.params.team2;
	var team1 = req.params.team1;
	Game.find().or(
		[
			{home: team1, away: team2}, 
			{away: team2, home: team1}
		])
		.then(games => { res.json(games)})
		.catch(error => { res.send(error)});
}

// Get game corresponding to a certain Date.
exports.getSingleGame = function(req,res){
	var home = req.params.team2;
	var away = req.params.team1;
	var date = req.params.date;
	Game.find({
		home: home,
		away: away,
		date: date 
	})
		.then(game => res.json(game))
		.catch(error => res.send(error));
}

exports.createNewGame = function(req,res){
	var home = req.params.team1;
	var away = req.params.team2;
	var date = req.params.date;
	var game = new Game();
	game.set('home', home);
	game.set('away', away);
	game.set('date', date);
	game.save()
		.then(game => res.json(game))
		.catch(error => res.send(error));
}