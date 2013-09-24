var utils          = require('../service/utilService');
var userService = require('../service/userService');


exports.list = function(req, res){		
	var dataEventEmitterInstance = utils.getDataEventEmiter();

	userService.findAll(dataEventEmitterInstance);

	dataEventEmitterInstance.on('data', function(){		
		res.render('listusers', { listusers: dataEventEmitterInstance.data })	
	});		
};