var express = require('express');
var router = express.Router();
var gamesCtrl = require('../controllers/gamesController');

router.get('/', gamesCtrl.getGames);
router.get('/:team1/:team2', gamesCtrl.getTeamGames);
router.post('/:team1/:team2/:date', gamesCtrl.createNewGame);

module.exports = router;