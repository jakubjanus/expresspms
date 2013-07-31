
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , issues = require('./routes/issueRoute')
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

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/newissue', issues.newissue);
app.post('/newissue', issues.issue_post_handler);

app.get('/listissue', issues.list);

app.get('/issue/:id', issues.issue);

app.post('/editIssueTitle', issues.updateTitleAJAX);

app.post('/editIssueContent', issues.updateContentAJAX);

app.post('/getIssueComments', issues.getCommentsAJAX);

app.post('/addComment', issues.addCommentAJAX);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
