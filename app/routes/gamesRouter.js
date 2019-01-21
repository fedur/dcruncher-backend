var express = require('express');
var router = express.Router();
var gamesCtrl = require('../controllers/gamesController');

router.get('/', gamesCtrl.getGames);
router.get('/:teamID', gamesCtrl.getTeamGames);
router.post('/', gamesCtrl.createNewGame);

module.exports = router;