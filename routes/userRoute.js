var utils          = require('../service/utilService');
var userService = require('../service/userService');

exports.newuser = function(req, res){	
	
	res.render('newuser');	
	
};

exports.user_create = function(req, res){

	login = req.body.login;
	password = req.body.password;
	email = req.body.email;
	firstName = req.body.firstName;
	lastName = req.body.lastName;
	
	userService.create({login:login, password:password, email:email, firstName:firstName, lastName:lastName});		
	
	res.redirect('/listusers');
};

exports.list = function(req, res){		
	var dataEventEmitterInstance = utils.getDataEventEmiter();

	userService.findAll(dataEventEmitterInstance);

	dataEventEmitterInstance.on('data', function(){		
		res.render('listusers', { listusers: dataEventEmitterInstance.data })	
	});		
};