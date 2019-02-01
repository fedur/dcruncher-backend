var express = require('express');
var router = express.Router();
var controller = require('../controllers/playsController');
module.exports = router;

router.get('/', controller.getPlays);
router.post('/', controller.addPlays);
router.get('/:playId', controller.getPlayById);