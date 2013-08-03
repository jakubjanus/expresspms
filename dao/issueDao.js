var dbManager = require('./connection');
var mongoose = require('mongoose');

var issueSchemaDef = {
		title: String,
		content: String,
		created: { type: Date, default: Date.now },
		modyfied: Date,
		status: {name:String, weight: Number},
		priority: {name:String, weight: Number},
		project_id : { type: mongoose.Schema.ObjectId, ref: 'project' },
		group_id : { type: mongoose.Schema.ObjectId, ref: 'group' },
		author_id : { type: mongoose.Schema.ObjectId, ref: 'user' },	
		assigned_id : { type: mongoose.Schema.ObjectId, ref: 'user' }			
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
			eventEmitter.emitErr('err',err);
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
			eventEmitter.emitErr('err',err);
		}else{					
			eventEmitter.emitData('data',data);
		}
	}).populate('author_id').populate('assigned_id');		
}

exports.findById = function(eventEmitter, id){	

	var query = Issue.find({'_id' : id}).populate('author_id').populate('assigned_id');

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




