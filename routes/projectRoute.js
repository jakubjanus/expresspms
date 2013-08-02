var utils          = require('../service/utilService');
var projectService = require('../service/projectService');

exports.newproject = function(req, res){	
	
	res.render('newproject');	
	
};

exports.project_create = function(req, res){

	name = req.body.name;
	
	projectService.create({name:name});		
	
	res.redirect('/listprojects');
};

exports.list = function(req, res){		
	var dataEventEmitterInstance = utils.getDataEventEmiter();

	projectService.findAll(dataEventEmitterInstance);

	dataEventEmitterInstance.on('data', function(){		
		res.render('listprojects', { listprojects: dataEventEmitterInstance.data })	
	});		
};