// load the app model

var Rover = require('./controllers/Rover');
// expose the routes to our app with module.exports
module.exports = function (app, router) {

	router.post('/init', Rover.init);

	router.post('/move', Rover.move);

	app.use('/', router);
};