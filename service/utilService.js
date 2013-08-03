var EventEmitter = require('events').EventEmitter,
    util         = require('util');

exports.getDataEventEmiter = function(){
	var DataEventEmitter = function(){
		this.data = Object;
		this.err = Object;
	};
	util.inherits(DataEventEmitter, EventEmitter);	

	DataEventEmitter.prototype.emitData = function(eventName, data) {
		this.data = data;
		this.emit(eventName);
	}

	DataEventEmitter.prototype.emitErr = function(eventName, err) {
		this.err = err;
		this.emit(eventName);
	}

	return new DataEventEmitter();
}

//emitter emituje zdarzenie 'Done' jeżeli wyemitował wszystkie zdarzenia (zewnętrzne) podane w parametrze 'events' - tablica stringów
// zastosowanie - kiedy chcemy otrzymać zdarzenie po ukończeniu wszystkich wcześniejszych (zewnętrznych) (param 'events')
//  flow: tworzymy emmitera z tablicą nazw zdarzeń 
//        w ich listnerach emitujemy zdarzenie o dopasowanej nazwie
//        rejestrujemy listnera finalnego (ten emiter) na zdarzenie o nazwie 'Done'
exports.getMultiEventEmitter = function(events){
	var MultiEventEmitter = function(){
		this.eventsStock = events;
	};
	util.inherits(MultiEventEmitter, EventEmitter);	

	MultiEventEmitter.prototype.emitEvent = function(eventName) {								

		delete this.eventsStock[this.eventsStock.indexOf(eventName)];	

		if (this.eventsStock.filter(String).length == 0){			
			this.emit('AllDone');
		}								
	}

	return new MultiEventEmitter();
}