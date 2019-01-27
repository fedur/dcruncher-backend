var express = require('express');
var router = express.Router();
var gamesCtrl = require('../controllers/gamesController');

router.get('/', gamesCtrl.getGames);
router.get('/:team', gamesCtrl.getTeamGames)
router.get('/:team1/:team2', gamesCtrl.getMatchups);
router.get('/:team1/:team2/:date', gamesCtrl.getSingleGame);
router.post('/:team1/:team2/:date', gamesCtrl.createNewGame);

module.exports = router;