var everyauthConfig 	= require('./everyauth');
var express						= require('express');
var path 							= require('path');

exports.initializeMiddleware = function (app){
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(express.session());
	app.use(require('stylus').middleware(__dirname + '/../public'));
	app.use(express.static(path.join(__dirname, '/../public')));

	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}

	var everyauth = everyauthConfig.initializeEveryauth();
	app.use(everyauth.middleware(app));

	// in most cases router should be last middleware
	app.use(app.router);
};