exports.initializeEveryauth = function (){
	var everyauth 			= require('everyauth');
	var userService     = require('../service/userService');
	var utils           = require('../service/utilService');
	var emitter         = utils.getDataEventEmiter();

	// everyauth user find helper method
	everyauth.everymodule.findUserById( function(req, userId, callback){
	  var userEmitter = utils.getDataEventEmiter();
	  userService.findById(userEmitter, userId);
	  
	  userEmitter.on('data', function(){
	    callback(null, userEmitter.data);
	  });
	});

	everyauth.password
	  .getLoginPath('/login')
	  .postLoginPath('/login')
	  .loginView('login.jade')
	  .authenticate(function(login, password){
	    var promise = this.Promise();
	    userService.findByLogin(emitter, login);
	    emitter.on('data', function(){
	      // TODO implement password check !!!!
	      promise.fulfill(emitter.data);
	    });
	    emitter.on('err', function(){
	      promise.fulfill([emitter.err])
	    })
	    return promise;
	  })
	  .loginSuccessRedirect('/')
	  .getRegisterPath('/register')
	  .postRegisterPath('/register')
	  .registerView('newuser.jade')
	  .validateRegistration(function(userAttributes){
	    // TODO implement
	  })
	  .registerUser(function(userAttributes){
	    // TODO implement
	  })
	  .registerSuccessRedirect('/');

	  return everyauth;
};