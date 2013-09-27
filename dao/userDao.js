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

// TODO think about getting rid of login(maybe email is enough)
// 			- password must be present
// 			- uniq login
// 			- uniq email
exports.create = function(eventEmitter, obj){    
	var user = new User(obj);
	
	user.save(function(err, user){
		if (err){
			console.log('error while saving user');
			eventEmitter.emitErr('err', err);
		}else{
			console.log('save completed');
			eventEmitter.emitData('data', user);
		}
	});	
}

exports.findAll = function(eventEmitter){  	
	
	User.find({}, function(err, data){
		if (err){
			console.log('error while finding users');
			eventEmitter.emitErr('err',err);
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
			eventEmitter.emitErr('err',err);
		}else{
			console.log('found in db '+data);
			eventEmitter.emitData('data',data);
		}
	});
}

exports.findByLogin = function(eventEmitter, login){
	User.find({'login': login}).findOne(function (err, data){
		if (err){
			eventEmitter.emitErr('err', err);
		}else{
			eventEmitter.emitData('data', data)
		}
	});
}