var express = require('express');
var Game = require('../models/Game');
var router = express.Router();
var controller = require('../controllers/gamesController');

// Converts possible HOME_AWAY_DATE to id 
router.param('gameid', function(req,res,next,id){
	var idElems = id.split('__');
	if (idElems.length === 3){
		var home = idElems[0];
		var away = idElems[1];
		var date = new Date(idElems[2]);
		console.log('a');
		Game.find({
			home: home,
			away: away,
			date: date
		})
			.then(game => {
				req.teamId=game[0]._id;
				return next();
			})
			.catch(error => next(new Error("Entry does not exist for " + id)));
	}

	else {
		req.teamId = id;
		return next();
	}
});

router.get('/', controller.getGames);
router.get('/:gameid', controller.getSingleGame);

module.exports = router;