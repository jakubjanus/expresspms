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