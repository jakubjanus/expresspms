var routes = require('../routes')
  , users = require('../routes/userRoute')
  , issues = require('../routes/issueRoute')
  , projects = require('../routes/projectRoute')
  , apiV1Issues = require('../routes/api/v1/issues')
  , apiV1Comments = require('../routes/api/v1/comments')
  , apiV1Projects = require('../routes/api/v1/projects')

exports.initializeRoutes = function (app){
	initializeHTMLRoutes(app);
	initializeAPIRoutes(app);
};

// ==========================================================
//     					html routes
// ==========================================================
initializeHTMLRoutes = function(app){
	app.get('/', 													routes.index);

	app.get(	'/newissue', 									issues.newissue);
	app.post(	'/newissue', 									issues.issue_create);

	app.get(	'/listissue', 								issues.list);
	app.get(	'/issue/:id', 								issues.issue);

	app.get(	'/newproject', 								projects.newproject);
	app.post(	'/newproject', 								projects.project_create);
	app.get(	'/listprojects', 							projects.list);

	app.get(	'/listusers', 								users.list);

	//  TODO think about some other solution to change projects
	app.post(	'/changeProject', 						projects.changeProjectAJAX);
	app.post(	'/getProjectNameInSession', 	projects.projectNameInSessionAJAX);
};

// ==========================================================
//     					REST json api
// ==========================================================
initializeAPIRoutes = function(app){
	// issues
	app.get(		'/projects/:projectId/issues', 		apiV1Issues.index);
	app.post(		'/projects/:projectId/issues', 		apiV1Issues.create);
	app.get(		'/issues/:id', 										apiV1Issues.show);
	app.put(		'/issues/:id', 										apiV1Issues.update);
	app.put(		'/issues/:id/start', 							apiV1Issues.start);
	app.put(		'/issues/:id/submit', 						apiV1Issues.submit);
	app.put(		'/issues/:id/accept', 						apiV1Issues.accept);
	app.put(		'/issues/:id/restart', 						apiV1Issues.restart);
	app.delete(	'/issues/:id', 										apiV1Issues.destroy);

	// comments
	app.get(		'/issues/:issueId/comments', 			apiV1Comments.index);
	app.post(		'/issues/:issueId/comments', 			apiV1Comments.create);

	// projects
	app.get(		'/projects', 											apiV1Projects.index);
	app.get(		'/projects/:id',									apiV1Projects.show);
};