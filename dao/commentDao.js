var dbManager = require('./connection');
var mongoose = require('mongoose');

var commentSchemaDef = {
		content: String,	
		//todo sekwencja - do zastanowienia	
		nb: Number,
		author_id: { type: mongoose.Schema.ObjectId, ref: 'user' },
		issue_id: { type: mongoose.Schema.ObjectId, ref: 'issue' },
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
			eventEmitter.emitErr('err',err);
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
			eventEmitter.emitErr('err',err);
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
			eventEmitter.emitErr('err',err);
		}else{					
			eventEmitter.emitData('data',data);
		}
	});	
}