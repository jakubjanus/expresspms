var dbManager = require('./connection');
var mongoose = require('mongoose');

var userSchemaDef = {
		login: String,
		password: String,
		email: String,
		firstName: String,
		lastName: String,
		created: { type: Date, default: Date.now }
	};

var User = dbManager.initModel(userSchemaDef,'user');

exports.create = function(obj){    
	
	var user = new User(obj);
	
	user.save(function(err, user){
		if (err){
			console.log('error while saving user');
		}else{
			console.log('save completed');
		}
	});	
}

exports.findAll = function(eventEmitter){  	
	
	User.find({}, function(err, data){
		if (err){
			console.log('error while finding users');
		}else{					
			eventEmitter.emitData('data',data);
		}
	});		
}

exports.findById = function(eventEmitter, id){	

	var query = User.find({'_id' : id});

	query.findOne(function (err, data){
		if (err){
			console.log('error while finding by id');
		}else{
			console.log('found in db '+data);
			eventEmitter.emitData('data',data);
		}
	});
}