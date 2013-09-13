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

// TODO remove log functions from here(take them to upper abstract levels)

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
	}).populate('author_id').populate('assigned_id').populate('project_id');		
}

exports.findById = function(eventEmitter, id){	

	var query = Issue.find({'_id' : id}).populate('author_id').populate('assigned_id').populate('project_id');

	query.findOne(function (err, data){
		if (err){
			console.log('error while finding by id');
			eventEmitter.emitErr('err',err);
		}else{	
			data.project_id.statuses.sort(function(a, b) {
			    var textA = a.weight;
			    var textB = b.weight;
			    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
			});		
			eventEmitter.emitData('data',data);
		}
	});
}

exports.findByProject = function(eventEmitter, projectId){

	var query = Issue.find({'project_id': projectId}).populate('author_id').populate('assigned_id').populate('project_id');

	query.find(function(err, data){
		if (err){
			console.log('error while finding by project id');
			eventEmitter.emitErr('err',err);
		}else{			
			eventEmitter.emitData('data',data);
		}
	});

}

exports.delete = function (eventEmitter, id){
	Issue.remove({ _id: id }, function(err, data){
		if (err){
			eventEmitter.emitErr('err', err);
		}else{
			eventEmitter.emitData('data', data)
		}
	});
};




