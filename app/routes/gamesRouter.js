var express = require('express');
var Game = require('../models/Game');
var router = express.Router();
var controller = require('../controllers/gamesController');

// Converts possible HOME_AWAY_DATE to id 
router.param('gameId', function(req,res,next,id){
	var idElems = id.split('__');
	if (idElems.length === 3){
		var home = idElems[0];
		var away = idElems[1];
		var date = new Date(idElems[2]);
		Game.find({
			home: home,
			away: away,
			date: date
		})
			.then(game => {
				req.gameId=game[0]._id;
				return next();
			})
			.catch(error => next(new Error("Entry does not exist for " + id)));
	}

	else {
		req.gameId = id;
		return next();
	}
});

router.get('/', controller.getGames);
router.post('/', controller.createGame);

router.get('/:gameId', controller.getSingleGame);
router.post('/:gameId', controller.updateGame);

router.get('/:gameId/plays', controller.getPlaysByGame);
router.post('/:gameId/plays', controller.addPlaysToGame);
router.get('/:gameId/plays/:playNb', controller.getPlayByPlayNumber);

module.exports = router;