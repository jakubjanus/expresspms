var dao          = require('../dao/issueDao');

exports.create = function(obj){
	dao.create(obj);
};

exports.update = function(eventEmitter, obj){
	dao.update(eventEmitter, obj);
}

exports.findAll = function(eventEmitter){
	dao.findAll(eventEmitter);
}

exports.findById = function(eventEmitter, id){
	dao.findById(eventEmitter, id);	
}



