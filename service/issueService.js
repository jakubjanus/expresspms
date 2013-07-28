var dao          = require('../dao/issueDao');
var EventEmitter = require('events').EventEmitter,
    util         = require('util');

exports.getDataEventEmiter = function(){
	var DataEventEmitter = function(){
		this.data = Object;
	};
	util.inherits(DataEventEmitter, EventEmitter);	

	DataEventEmitter.prototype.emitData = function(eventName,data) {
		this.data = data;
		this.emit(eventName);
	}

	return new DataEventEmitter();
}

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



