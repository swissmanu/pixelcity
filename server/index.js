var express = require('express')
	, app = express();

app.use(function staticsPlaceholder(req, res, next) {
	return next();
});

module.exports = app;