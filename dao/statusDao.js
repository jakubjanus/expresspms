var dbManager = require('./connection');
var mongoose = require('mongoose');

var statusSchemaDef = {
		name: String,
		weight: Number,
		project_id : { type: mongoose.Schema.ObjectId, ref: 'project' }
	};

var Status = dbManager.initModel(statusSchemaDef,'status');

exports.create = function(obj){    
	
	var status = new Status(obj);
	
	status.save(function(err, status){
		if (err){
			console.log('error while saving status');
		}else{
			console.log('save completed');
		}
	});	
}

exports.findAll = function(eventEmitter){  	
	
	Status.find({}, function(err, data){
		if (err){
			console.log('error while finding statuses');
		}else{					
			eventEmitter.emitData('data',data);
		}
	});		
}

exports.findById = function(eventEmitter, id){	

	var query = Status.find({'_id' : id});

	query.findOne(function (err, data){
		if (err){
			console.log('error while finding by id');
		}else{
			console.log('found in db '+data);
			eventEmitter.emitData('data',data);
		}
	});
}