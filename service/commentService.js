var dao          = require('../dao/commentDao');


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

exports.findByIssue = function(eventEmitter, issue_id){
	dao.findByIssue(eventEmitter, issue_id);
}