var Game = require('../models/Game');

// Directly takes query elements as fields for search in the database.
exports.getGames = function(req,res){
	Game.find(req.query, function(err,games) {
		if (err)
			res.send(err);

		res.json(games);
	});
}

// Opponent defined by req.query.opponent
// Scouting team as defined by req.params.teamID
exports.getTeamGames = function(req,res){
	var opponent = req.query['opponent'];
	var scoutedTeam = req.params.teamID;
	console.log(scoutedTeam);

	if (opponent == undefined) {
		Game.find().or(
			[
				{home: scoutedTeam}, 
				{away: scoutedTeam}
			])
			.then(games => { res.json(games)})
			.catch(error => { res.send(error)});
	}
	else {
		Game.find().or(
			[
				{home: scoutedTeam, away: opponent}, 
				{away: scoutedTeam, home: opponent}
			])
			.then(games => { res.json(games)})
			.catch(error => { res.send(error)});
	}
}

exports.createNewGame = function(req,res){
	let homeTeam = req.query['home'];
	let awayTeam = req.query['away'];
	let date = req.query['date'];
	var game = new Game();
	game.set('home_team', homeTeam);
	game.set('away_team', awayTeam);
	game.set('date', date);
	game.save()
		.then(game => res.json(game))
		.catch(error => res.send(error));
}