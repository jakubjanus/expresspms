var utils          = require('../../../service/utilService');
var commentService = require('../../../service/commentService');

// GET /issues/:issueId/comments
exports.index = function(req, res){
	var eventEmitter 	= utils.getDataEventEmiter();
	var issueId			= req.params.issueId;

	console.log("comments for issue with id: " + issueId)

	commentService.findByIssue(eventEmitter, req.params.issueId);

	eventEmitter.on('data', function(){
		res.contentType('json');
		res.send({
			comments: eventEmitter.data
		});
	});
};

// POST /issues/:issueId
exports.create = function(req, res){
	var eventEmitter 	= utils.getDataEventEmiter();
	var issueId			= req.params.issueId;

	console.log("creating new comment for issue with id: " + issueId);
	console.log("  with comment params:\n" + JSON.stringify(req.body));

	// TODO add author_id assignment
	commentData = {
		issue_id: issueId,
		content: req.body.content
	}

	// TODO implement emiters suport !!!
	commentService.create(commentData);
	
	res.contentType('json');
	res.send({
		status: 'created'
	});
};