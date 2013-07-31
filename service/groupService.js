var dao          = require('../dao/groupDao');

//może dodać emitery aby zwracać err
exports.create = function(obj){
	dao.create(obj);
};

exports.findAll = function(eventEmitter){
	dao.findAll(eventEmitter);
}

exports.findById = function(eventEmitter, id){
	dao.findById(eventEmitter, id);	
}

exports.findByProject = function(eventEmitter, project_id){
	dao.findByProject(eventEmitter, project_id);
}