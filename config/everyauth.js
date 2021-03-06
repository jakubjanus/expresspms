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
	    userService.login(emitter, login, password);
	    
	    emitter.on('data', function(){
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
	  .extractExtraRegistrationParams(function(req){
	  	return {
	  		email: 			req.body.email,
	  		firstName: 	req.body.firstName,
	  		lastName: 	req.body.lastName
	  	}
	  })
	  .validateRegistration(function(userAttributes){
	    var promise = this.Promise();
	    var emitter = utils.getDataEventEmiter();
	    userService.validate(emitter, userAttributes);

	    emitter.on('data', function(){
	    	promise.fulfill(emitter.data);
	    });
	    return promise;
	  })
	  .registerUser(function(userAttributes){
	  	var promise = this.Promise();
	  	var emitter = utils.getDataEventEmiter();
			userService.create(emitter, userAttributes);

			emitter.on('data', function(){
				promise.fulfill(emitter.data);
			});
			return promise;
	  })
	  .registerSuccessRedirect('/');

	  return everyauth;
};