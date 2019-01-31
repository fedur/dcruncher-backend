exports.handleMongoErrors = function(error, res, next) {
	// Duplicate Key Error
	if (error.name === 'MongoError') {
		if (error.code === 11000)
			next(new Error('Duplicate Key error');
		else {
			next(new Error('Error with Mongo Database [code ' + error.code + "]"));
		}
	} 
	else {
		next();
	}
};
