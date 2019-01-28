var express = require('express');
var router = express.Router();
var controller = require('../controllers/playsController');
router.get('/:team1/:team2/:date', controller.getPlays);

module.exports = router;