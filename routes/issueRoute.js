var service        = require('../service/issueService');
var utils          = require('../service/utilService');
var projectService = require('../service/projectService');

exports.newissue = function(req, res){	
	var dataEventEmitterInstance = utils.getDataEventEmiter();
	projectService.findAll(dataEventEmitterInstance);	

	dataEventEmitterInstance.on('data', function(){				
		res.render('newissue', {projects: dataEventEmitterInstance.data});	
	});	
};

exports.issue_post_handler = function(req, res){

	title = req.body.title;
	content = req.body.content;	
	projectId = req.body.projectId;
	createDate = new Date();	
	
	service.create({title:title, content:content, project_id:projectId, created:createDate});		
	
	res.redirect('/listissue');
}

exports.list = function(req, res){		
	var dataEventEmitterInstance = utils.getDataEventEmiter();

	service.findAll(dataEventEmitterInstance);

	dataEventEmitterInstance.on('data', function(){
		//console.log('reciving event data in router '+ dataEventEmitterInstance.data);
		res.render('listissue', { listissues: dataEventEmitterInstance.data })	
	});		
};

exports.issue = function(req, res){
	var dataEventEmitterInstance = utils.getDataEventEmiter();
	var id = req.params.id;

	console.log('id from url = '+id);

	service.findById(dataEventEmitterInstance, id);

	dataEventEmitterInstance.on('data', function(){
		console.log('reciving event data in router '+ dataEventEmitterInstance.data);
		res.render('issue', { issue: dataEventEmitterInstance.data })	
	});
}