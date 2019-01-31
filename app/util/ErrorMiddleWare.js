exports.handleMongoError = function(error, req, res, next) {
	if (error.name === 'MongoError') {
		console.log(error);
		if (error.code === 11000) {
			return res.status(400).json(getErrorMsg(
				error.name,"Duplicate key already in database"));
		}
		else {
			return res.status(400).json(
				getErrorMsg(error.name, Default_Client_error));
		}
	}
	next(error);
}

exports.handleDefaultError = function(error, req, res, next) {
	return res.status(500).json(
		getErrorMsg(error.name, error.message));
}

var getErrorMsg = function(type, message) {
	return {
		error: {
			message: message,
			type: type
		}
	};
}

var Default_Error_Text = "The service could not process your request.";
var Default_Client_error = "Invalid Entry Point";
