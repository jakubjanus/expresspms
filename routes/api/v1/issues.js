var utils          = require('../../../service/utilService');
var projectService = require('../../../service/projectService');
var issueService   = require('../../../service/issueService');

// TODO handle errors !!
// TODO make some issues(and other resources also) json data presenters for api calls,
//		for now every db field is returned
// TODO think about some logger implementation, this is not a place to handle this
// TODO think about make controllers code more dry, 
//		here's a lot repeated code (some kind of before filters would be helpful)

// GET /projects/:projectId/issues
exports.index = function(req, res){
	var eventEmiter = utils.getDataEventEmiter();
	console.log("issues for project with id: " + req.params.projectId)
	issueService.findByProject(eventEmiter, req.params.projectId);

	eventEmiter.on('data', function(){
		res.contentType('json');
  		res.send({
  			issues: eventEmiter.data
  		});
	});
};

// POST /projects/:projectId/issues
exports.create = function(req, res){
	// TODO add required params check
	// TODO what is assigned_id for ??
	var projectId = req.params.projectId;
	console.log("creating new issue for project with id: " + projectId);
	console.log("  with issue params:\n" + JSON.stringify(req.body));
	issueData = {
		title: 			req.body.title,
		content: 		req.body.content,
		project_id: 	projectId,
		status: 		{ name: 'new', weight: 0 }
	};
	// TODO implement emmiters support for issueService#create function to handle saving errors,
	//		so for now create action always return success status, as its no way to check if saving was successful
	issueService.create(issueData);

	res.contentType('json');
	res.send({
		status: 'created'
	});
};

// GET /issues/:id
exports.show = function(req, res){
	var eventEmiter = utils.getDataEventEmiter();
	var id = req.params.id;
	issueService.findById(eventEmiter, id);

	console.log("finding issue with id: " + id);

	eventEmiter.on('data', function(){
		res.contentType('json');
		res.send({
			issue: eventEmiter.data
		});
	});
};

// PUT /issues/:id
exports.update = function(req, res){
	var eventEmiter = utils.getDataEventEmiter();
	var id = req.params.id;

	console.log("updating issue with id: " + id);

	issueData = { _id: id };
	if (req.body.title){
		issueData.title = req.body.title;
	};
	if (req.body.content){
		issueData.content = req.body.content;
	};
	issueService.update(eventEmiter, issueData);

	eventEmiter.on('data', function(){
		res.contentType('json');
		res.send({
			status: 'updated'
		});
	});
};

// DELETE /issues/:id
exports.destroy = function(req, res){
	// TODO implement delete function in issue service (better in another branch)
};