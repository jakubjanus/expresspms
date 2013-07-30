var service        = require('../service/issueService');
var utils          = require('../service/utilService');
var projectService = require('../service/projectService');
var commentService = require('../service/commentService');

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
};

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
};

exports.updateTitleAJAX = function(req, res) {  
 console.log('update issue title');
  var dataEventEmitterInstance = utils.getDataEventEmiter();  

  service.update(dataEventEmitterInstance, {_id:req.body.id, title: req.body.title});

  dataEventEmitterInstance.on('data', function(){						
		res.contentType('json');
  		res.send({ some: JSON.stringify({response:'json'}) });
	});	
  
};

exports.updateContentAJAX = function(req, res) {  
  console.log('update issue content');
  var dataEventEmitterInstance = utils.getDataEventEmiter();  

  service.update(dataEventEmitterInstance, {_id:req.body.id, content: req.body.content});

  dataEventEmitterInstance.on('data', function(){						
		res.contentType('json');
  		res.send({ some: JSON.stringify({response:'json'}) });
  });	
  
};

exports.getCommentsAJAX = function(req, res) {
	var dataEventEmitterInstance = utils.getDataEventEmiter(); 	

	commentService.findByIssue(dataEventEmitterInstance, req.body.issue_id);

	dataEventEmitterInstance.on('data', function(){						
		res.contentType('json');		
  		res.send(dataEventEmitterInstance.data);
  	});	
}