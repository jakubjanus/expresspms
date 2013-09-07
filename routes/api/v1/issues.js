var utils          = require('../../../service/utilService');
var projectService = require('../../../service/projectService');
var issueService   = require('../../../service/issueService');

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

exports.create = function(req, res){

};

exports.show = function(req, res){

};

exports.update = function(req, res){

};

exports.destroy = function(req, res){

};