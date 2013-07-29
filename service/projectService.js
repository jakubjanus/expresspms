var dao          = require('../dao/projectDao');

exports.create = function(obj){
	dao.create(obj);
};

exports.findAll = function(eventEmitter){
	dao.findAll(eventEmitter);
}

exports.findById = function(eventEmitter, id){
	dao.findById(eventEmitter, id);	
}