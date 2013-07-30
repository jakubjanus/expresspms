var dbManager = require('./connection');
var mongoose = require('mongoose');

var commentSchemaDef = {
		content: String,		
		author_id: { type: mongoose.Schema.ObjectId, ref: 'User' },
		issue_id: { type: mongoose.Schema.ObjectId, ref: 'Issue' },
		created: { type: Date, default: Date.now }
	};

var Comment = dbManager.initModel(commentSchemaDef,'comment');

exports.create = function(obj){    
	
	var comment = new Comment(obj);
	
	comment.save(function(err, comment){
		if (err){
			console.log('error while saving comment');
		}else{
			console.log('save completed');
		}
	});	
}

exports.findAll = function(eventEmitter){  	
	
	Comment.find({}, function(err, data){
		if (err){
			console.log('error while finding comments');
		}else{					
			eventEmitter.emitData('data',data);
		}
	});		
}

exports.findById = function(eventEmitter, id){	

	var query = Comment.find({'_id' : id});

	query.findOne(function (err, data){
		if (err){
			console.log('error while finding by id');
		}else{
			console.log('found in db '+data);
			eventEmitter.emitData('data',data);
		}
	});
}

exports.findByIssue = function(eventEmitter, issue_id){
		
	Comment.find({'issue_id':issue_id}, function(err, data){
		if (err){
			console.log('error while finding comments');
		}else{					
			eventEmitter.emitData('data',data);
		}
	});	
}