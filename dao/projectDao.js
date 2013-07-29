var dbManager = require('./connection');
var mongoose = require('mongoose');

var projectSchemaDef = {
		name: String,
		created: Date,
		author_id : { type: mongoose.Schema.ObjectId, ref: 'User' }		
	};

var Project = dbManager.initModel(projectSchemaDef,'project');

exports.create = function(obj){    

	var project = new Project(obj);
	
	project.save(function(err, project){
		if (err){
			console.log('error while saving project');
		}else{
			console.log('save completed');
		}
	});	
}

exports.findAll = function(eventEmitter){  	
	
	Project.find({}, function(err, data){
		if (err){
			console.log('error while finding projects');
		}else{					
			eventEmitter.emitData('data',data);
		}
	});		
}

exports.findById = function(eventEmitter, id){	

	var query = Project.find({'_id' : id});

	query.findOne(function (err, data){
		if (err){
			console.log('error while finding by id');
		}else{
			console.log('found in db '+data);
			eventEmitter.emitData('data',data);
		}
	});
}
