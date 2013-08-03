var dbManager = require('./connection');
var mongoose = require('mongoose');

var projectSchemaDef = {
		name: String,
		created: { type: Date, default: Date.now },
		author_id: { type: mongoose.Schema.ObjectId, ref: 'user' },
		statuses:  [{name:String, weight: Number}],
		users : [{ type: mongoose.Schema.ObjectId, ref: 'user' }]
	};	

var Project = dbManager.initModel(projectSchemaDef,'project');

exports.getInitialStatuses = function(){
	var initialStatuses = [
		{name: 'new', weight: 0},
		{name: 'in progress', weight: 1},
		{name: 'done', weight: 2}
	];			
	return initialStatuses;
}

console.log('initialStatuses '+this.getInitialStatuses());

exports.create = function(obj){    

	var project = new Project(obj);
	
	if(obj.statuses === undefined){		
		project.statuses = this.getInitialStatuses();	
	}
	
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
			eventEmitter.emitErr('err',err);
		}else{					
			eventEmitter.emitData('data',data);
		}
	}).populate('users');		
}

exports.findById = function(eventEmitter, id){	

	var query = Project.find({'_id' : id});

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
