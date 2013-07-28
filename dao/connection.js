var mongoose = require('mongoose');
var dbConnection = 'undefined';

var establish = function(){	
	mongoose.connect('mongodb://localhost/pms');
	dbConnection = mongoose.connection;
	dbConnection.on('error', console.error.bind(console, 'connection error:'));	
	dbConnection.once('open', function(){
		console.log('open the connection');
	});
};

if (dbConnection === 'undefined'){
	establish();
}

exports.initModel = function(schemaDef, name){
	console.log('init schema ' + name);
	
	var schema = mongoose.Schema(schemaDef,{collection:name});
	var Model = mongoose.model(name, schema);
	
	return Model;	
}
