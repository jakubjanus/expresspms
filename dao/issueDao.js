var dbManager = require('./connection');
var mongoose = require('mongoose');

var issueSchemaDef = {
		title: String,
		content: String,
		created: Date,
		modyfied: Date,
		//dodać ref status
		
		project_id : { type: mongoose.Schema.ObjectId, ref: 'Project' },
		author_id : { type: mongoose.Schema.ObjectId, ref: 'User' },	
		assigned_id : { type: mongoose.Schema.ObjectId, ref: 'User' }			
	};

var Issue = dbManager.initModel(issueSchemaDef,'issue');

exports.create = function(obj){    

	var issue = new Issue(obj);
	
	issue.save(function(err, issue){
		if (err){
			console.log('error while saving issue');
		}else{
			console.log('save completed');
		}
	});	
}

exports.update = function(eventEmitter, obj){
	console.log('update obj _id='+obj._id);

	var query = {"_id": obj._id};
	var options = {new: true, upsert: true};

	delete obj._id;

	Issue.findOneAndUpdate(query, obj, options, function(err, data) {
		if(err){
			console.log('error while updating issue'+err);
		}else{
			console.log('issue updated '+data);
			eventEmitter.emitData('data',data);
		}

	});
}

exports.findAll = function(eventEmitter){  	
	
	Issue.find({}, function(err, data){
		if (err){
			console.log('error while finding issues');
		}else{					
			eventEmitter.emitData('data',data);
		}
	});		
}

exports.findById = function(eventEmitter, id){	

	var query = Issue.find({'_id' : id});

	query.findOne(function (err, data){
		if (err){
			console.log('error while finding by id');
		}else{
			console.log('found in db '+data);
			eventEmitter.emitData('data',data);
		}
	});
}




