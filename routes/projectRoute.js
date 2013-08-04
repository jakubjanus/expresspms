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

exports.getProjectsAJAX = function(req, res) {
	var dataEventEmitterInstance = utils.getDataEventEmiter(); 	

	projectService.findAll(dataEventEmitterInstance);

	dataEventEmitterInstance.on('data', function(){						
		res.contentType('json');		
  		res.send(dataEventEmitterInstance.data);
  	});	
}

exports.changeProjectAJAX = function(req, res) {
	console.log('set project id in session ' + req.body.project_id);
	req.session.projectId = req.body.project_id;

	res.contentType('json');
  	res.send({ some: JSON.stringify({response:'json'}) });
}

exports.projectNameInSessionAJAX = function(req, res) {
	if (req.session.projectId){
		console.log('project id is in session, try find ' + req.session.projectId);
		var dataEventEmitterInstance = utils.getDataEventEmiter();

		projectService.findById(dataEventEmitterInstance, req.session.projectId);

		dataEventEmitterInstance.on('data', function(){
			res.contentType('json');	
			var projectName = dataEventEmitterInstance.data.name;
			console.log('sending project name ' + projectName)
			res.send({name:projectName});
		});		
	}else{
		console.log('no project in session ' + req.session.projectId);
		res.send(500);
	}
}