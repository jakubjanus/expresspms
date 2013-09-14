var dao          = require('../dao/issueDao');

//może dodać emitery aby zwracać err
// TODO add emmiters for sure
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

exports.findByProject = function(eventEmitter, projectId){
	dao.findByProject(eventEmitter, projectId);
}

exports.delete = function(eventEmitter, id){
	dao.delete(eventEmitter, id);
};

exports.start = function(eventEmitter, id){
	issue_data = {
		_id: id,
		status: { name: 'in progress', weight: 1 }
	};
	dao.update(eventEmitter, issue_data)
};

exports.submit = function(eventEmitter, id){
	issue_data = {
		_id: id,
		status: { name: 'to accept', weight: 2 }
	};
	dao.update(eventEmitter, issue_data)
};

exports.accept = function(eventEmitter, id){
	issue_data = {
		_id: id,
		status: { name: 'done', weight: 3 }
	};
	dao.update(eventEmitter, issue_data)
};

exports.restart = function(eventEmitter, id){
	issue_data = {
		_id: id,
		status: { name: 'new', weight: 0 }
	};
	dao.update(eventEmitter, issue_data)
};