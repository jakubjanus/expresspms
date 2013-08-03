var dbManager = require('./connection');
var mongoose = require('mongoose');

var groupSchemaDef = {
		title: String,
		content: String,
		project_id : { type: mongoose.Schema.ObjectId, ref: 'project' },
		author_id: { type: mongoose.Schema.ObjectId, ref: 'user' },		
		created: { type: Date, default: Date.now }
	};

var Group = dbManager.initModel(groupSchemaDef,'group');

exports.create = function(obj){    
	
	var group = new Group(obj);
	
	group.save(function(err, group){
		if (err){
			console.log('error while saving group');
		}else{
			console.log('save completed');
		}
	});	
}

exports.findAll = function(eventEmitter){  	
	
	Group.find({}, function(err, data){
		if (err){
			console.log('error while finding groups');
			eventEmitter.emitErr('err',err);
		}else{					
			eventEmitter.emitData('data',data);
		}
	});		
}

exports.findById = function(eventEmitter, id){	

	var query = Group.find({'_id' : id});

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

exports.findByProject = function(eventEmitter, project_id){
		
	Group.find({'project_id':project_id}, function(err, data){
		if (err){
			console.log('error while finding groups');
			eventEmitter.emitErr('err',err);
		}else{					
			eventEmitter.emitData('data',data);
		}
	});	
}