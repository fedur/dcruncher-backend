var express = require('express');
var router = express.Router();
router.get('*', function(req,res) {
	res.send('invalid URL, use games or plays entry point (i.e /api/games)');
});


// Not for real build, only for some random tests
router.get('/test', function(req,res){
	
});

module.exports = router;