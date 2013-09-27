var dao           = require('../dao/userDao');
var utils         = require('./utilService');

exports.create = function(eventEmitter, obj){
	dao.create(eventEmitter, obj);
};

exports.findAll = function(eventEmitter){
	dao.findAll(eventEmitter);
}

exports.findById = function(eventEmitter, id){
	dao.findById(eventEmitter, id);	
}

exports.findByLogin = function(eventEmitter, login){
	dao.findByLogin(eventEmitter, login);
}

exports.validate = function(eventEmitter, attributes){
  var errors = [];
  var helperEmitter = utils.getDataEventEmiter();
  checkRequiredAttributes(attributes, errors);
  checkPassword(attributes, errors);
  checkLoginUniqness(helperEmitter, attributes, errors);

  helperEmitter.on('data', function(){
    eventEmitter.emitData('data', errors);
  });
}

checkRequiredAttributes = function(attributes, errs){
  var valid = true;
  if (!attributes.login){
    errs.push("login attribute is required");
    valid = false;
  }
  if (!attributes.password){
    errs.push("password attribute is required");
    valid = false;
  }
  return valid;
}

checkPassword = function(attributes, errs){
  if (attributes.password && attributes.password.length < 5){
    errs.push("password should be at least 5 character length");
    return false;
  }else{
    return true;
  }
}

checkLoginUniqness = function(eventEmitter, attributes, errs){
  var helperEmitter = utils.getDataEventEmiter();
  dao.findByLogin(helperEmitter, attributes.login);
  helperEmitter.on('data', function(){
    var result = true;
    if (helperEmitter.data){
      errs.push("login is already taken");
      result = false;
    }
    eventEmitter.emitData('data', result);
  });
}