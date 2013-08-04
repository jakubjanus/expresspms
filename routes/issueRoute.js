var service        = require('../service/issueService');
var utils          = require('../service/utilService');
var projectService = require('../service/projectService');
var userService    = require('../service/userService');
var commentService = require('../service/commentService');

exports.newissue = function(req, res){		
	var projects;
	var users;

	var multiEventEmitter = utils.getMultiEventEmitter(['projectsDone','usersDone']);

	var projectsDataEventEmitter = utils.getDataEventEmiter();
	projectService.findAll(projectsDataEventEmitter);		

	projectsDataEventEmitter.on('data', function(){				
		projects = projectsDataEventEmitter.data;		
		multiEventEmitter.emitEvent('projectsDone');		
	});	

	var usersDataEventEmitter = utils.getDataEventEmiter();
	userService.findAll(usersDataEventEmitter);		

	usersDataEventEmitter.on('data', function(){				
		users = usersDataEventEmitter.data;				
		multiEventEmitter.emitEvent('usersDone');		
	});	

	multiEventEmitter.on('AllDone', function(){				
		res.render('newissue', {projects: projects, listusers: users});	
	});
	
};

exports.issue_create = function(req, res){

	title = req.body.title;
	content = req.body.content;	
	projectId = req.body.projectId;	
	assignedId = req.body.assignedId;
	
	service.create({title:title, content:content, project_id:projectId, status: {name:'new', weight: 0}, assigned_id:assignedId});		
	
	res.redirect('/listissue');
};

exports.list = function(req, res){		

	console.log('project id in session ' + req.session.projectId);
	var projectId = req.session.projectId;

	var dataEventEmitterInstance = utils.getDataEventEmiter();

	service.findByProject(dataEventEmitterInstance, projectId);

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

exports.addCommentAJAX = function(req, res) {
	var dataEventEmitterInstance = utils.getDataEventEmiter(); 	

	commentService.create({issue_id:req.body.issue_id ,content:req.body.comment_content});

	res.contentType('json');
  	res.send({ some: JSON.stringify({response:'json'}) });
}