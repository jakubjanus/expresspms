var dao           = require('../dao/userDao');
var utils         = require('./utilService');
var bcrypt        = require('bcrypt');
var _             = require('underscore');

exports.create = function(eventEmitter, obj){
	attributes = _.clone(obj);
  attributes.password = encryptPassword(attributes.password);
  dao.create(eventEmitter, attributes);
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
  checkPasswordParam(attributes, errors);
  checkLoginUniqness(helperEmitter, attributes, errors);

  helperEmitter.on('data', function(){
    eventEmitter.emitData('data', errors);
  });
}

exports.login = function(eventEmitter, login, password){
  var helperEmitter = utils.getDataEventEmiter();
  this.findByLogin(helperEmitter, login);

  helperEmitter.on('data', function(){
    var user = helperEmitter.data;
    if (password && checkPassword(user, password)){
      eventEmitter.emitData('data', user);
    }else{
      eventEmitter.emitData('data', ['incorrect password']);
    }
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

checkPasswordParam = function(attributes, errs){
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

encryptPassword = function(password){
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

checkPassword = function(user, passwordToCheck){
  return bcrypt.compareSync(passwordToCheck, user.password);
}