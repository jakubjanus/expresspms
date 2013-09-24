/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , middleware = require('./config/middleware')
  , routes = require('./config/routes');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

middleware.initializeMiddleware(app);
routes.initializeRoutes(app);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
