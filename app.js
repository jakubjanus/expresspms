
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , users = require('./routes/userRoute')
  , issues = require('./routes/issueRoute')
  , projects = require('./routes/projectRoute')
  , apiV1Issues = require('./routes/api/v1/issues')
  , http = require('http')
  , path = require('path');

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
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

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
app.post('/editIssueTitle', issues.updateTitleAJAX);
app.post('/editIssueContent', issues.updateContentAJAX);
app.post('/changeIssueStatus', issues.updateStatusAJAX);

app.post('/getIssueComments', issues.getCommentsAJAX);
app.post('/addComment', issues.addCommentAJAX);

app.get('/newproject', projects.newproject);
app.post('/newproject', projects.project_create);
app.get('/listprojects', projects.list);

app.get('/newuser', users.newuser);
app.post('/newuser', users.user_create);
app.get('/listusers', users.list);

app.post('/getProjects', projects.getProjectsAJAX);

app.post('/changeProject', projects.changeProjectAJAX);
app.post('/getProjectNameInSession', projects.projectNameInSessionAJAX);


// ==========================================================
//     					REST json api
// ==========================================================

// issues
app.get('/projects/:projectId/issues', apiV1Issues.index);
app.post('/projects/:projectId/issues', apiV1Issues.create);
app.get('/issues/:id', apiV1Issues.show);
app.put('/issues/:id', apiV1Issues.update);
app.delete('/issues/:id', apiV1Issues.destroy);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
