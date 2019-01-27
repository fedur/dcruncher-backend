var express = require('express');
var router = express.Router();
var controller = require('../controllers/playsController');
router.post('/:team1/:team2/:date', controller.createAPlay);
router.get('/:team1/:team2/:date', controller.createAPlay);

module.exports = router;