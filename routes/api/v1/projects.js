var utils          = require('../../../service/utilService');
var projectService = require('../../../service/projectService');

// GET /projects
exports.index = function(req, res){
	var eventEmiter = utils.getDataEventEmiter();

	console.log("all projects");

	projectService.findAll(eventEmiter);

	eventEmiter.on('data', function(){
		res.contentType('json');
		res.send({
			projects: eventEmiter.data
		});
	});
};

// GET /projects/:id
exports.show = function(req, res){
	var eventEmiter = utils.getDataEventEmiter();
	var project_id = req.params.id;

	console.log('finding project with id: ' + project_id);

	projecService.findById(eventEmiter, project_id);

	eventEmiter.on('data', function(){
		res.contentType('json');
		res.send({
			project: eventEmiter.data
		});
	});
};