var utils          = require('../../../service/utilService');
var projectService = require('../../../service/projectService');
var issueService   = require('../../../service/issueService');

// GET /projects/:projectId/issues
exports.index = function(req, res){
	var eventEmiter = utils.getDataEventEmiter();
	issueService.findByProject(eventEmiter, req.body.projectId);

	eventEmiter.on('data', function(){
		res.contentType('json');
  		res.send({
  			issues: eventEmiter.data
  		});
	});
};

// POST /projects/:projectId/issues
exports.create = function(req, res){

};

// GET /projects/:projectId/issues/:id
exports.show = function(req, res){

};

// PUT /projects/:projectId/issues/:id
exports.update = function(req, res){

};

// DELETE /projects/:projectId/issues/:id
exports.destroy = function(req, res){

};