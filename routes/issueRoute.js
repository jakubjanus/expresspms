var service      = require('../service/issueService');

exports.show = function(req, res){		
	res.render('newissue')	
};

exports.issue_post_handler = function(req, res){
	title = req.body.title;
	content = req.body.content;		
	
	service.create({title:title, content:content});		
	
	res.redirect('/listissue');
}

exports.list = function(req, res){		
	var dataEventEmitterInstance = service.getDataEventEmiter();

	service.findAll(dataEventEmitterInstance);

	dataEventEmitterInstance.on('data', function(){
		//console.log('reciving event data in router '+ dataEventEmitterInstance.data);
		res.render('listissue', { listissues: dataEventEmitterInstance.data })	
	});		
};

exports.issue = function(req, res){
	var dataEventEmitterInstance = service.getDataEventEmiter();
	var id = req.params.id;

	console.log('id from url = '+id);

	service.findById(dataEventEmitterInstance, id);

	dataEventEmitterInstance.on('data', function(){
		console.log('reciving event data in router '+ dataEventEmitterInstance.data);
		res.render('issue', { issue: dataEventEmitterInstance.data })	
	});
}