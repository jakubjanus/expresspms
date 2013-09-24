// TODO devide this file into smaller ones, this could grow quite big as app goes bigger

/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , users = require('./routes/userRoute')
  // , issues = require('./routes/issueRoute')
  , projects = require('./routes/projectRoute')
  , apiV1Issues = require('./routes/api/v1/issues')
  , apiV1Comments = require('./routes/api/v1/comments')
  , apiV1Projects = require('./routes/api/v1/projects')
  , http = require('http')
  , path = require('path')
  , everyauth = require('everyauth');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());

// app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


var userService     = require('./service/userService');
var utils           = require('./service/utilService');
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

app.use(everyauth.middleware(app));
app.use(app.router);


var issues = require('./routes/issueRoute');

// ==========================================================
//     					html routes
// ==========================================================

app.get('/', routes.index);

app.get('/newissue', issues.newissue);
app.post('/newissue', issues.issue_create);

app.get('/listissue', issues.list);
app.get('/issue/:id', issues.issue);

// TODO delete all ajax action from this section,
// 	and replace with appropriate REST api actions
// app.post('/editIssueTitle', issues.updateTitleAJAX);
// app.post('/editIssueContent', issues.updateContentAJAX);
// app.post('/changeIssueStatus', issues.updateStatusAJAX);

// app.post('/getIssueComments', issues.getCommentsAJAX);
// app.post('/addComment', issues.addCommentAJAX);

app.get('/newproject', projects.newproject);
app.post('/newproject', projects.project_create);
app.get('/listprojects', projects.list);

app.get('/newuser', users.newuser);
app.post('/newuser', users.user_create);
app.get('/listusers', users.list);

// app.post('/getProjects', projects.getProjectsAJAX);

//  TODO think about some other solution to change projects
app.post('/changeProject', projects.changeProjectAJAX);
app.post('/getProjectNameInSession', projects.projectNameInSessionAJAX);


// ==========================================================
//     					REST json api
// ==========================================================

// issues
app.get(	'/projects/:projectId/issues', 		apiV1Issues.index);
app.post(	'/projects/:projectId/issues', 		apiV1Issues.create);
app.get(	'/issues/:id', 						apiV1Issues.show);
app.put(	'/issues/:id', 						apiV1Issues.update);
app.put(	'/issues/:id/start', 				apiV1Issues.start);
app.put(	'/issues/:id/submit', 				apiV1Issues.submit);
app.put(	'/issues/:id/accept', 				apiV1Issues.accept);
app.put(	'/issues/:id/restart', 				apiV1Issues.restart);
app.delete(	'/issues/:id', 						apiV1Issues.destroy);

// comments
app.get(	'/issues/:issueId/comments', 		apiV1Comments.index);
app.post(	'/issues/:issueId/comments', 		apiV1Comments.create);

// projects
app.get(	'/projects', 						apiV1Projects.index);
app.get(	'/projects/:id',					apiV1Projects.show);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
