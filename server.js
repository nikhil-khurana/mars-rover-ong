// server.js (Express 4.0)
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();

app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 					// log every request to the console
app.use(bodyParser()); 						// pull information from html in POST
app.use(methodOverride()); 					// simulate DELETE and PUT

app.use(function(req, res, next){
	next()
})

var router = express.Router(); 				// get an instance of the express Router

app.listen(process.env.PORT || 8080)
console.log('Magic happens on port:'+ process.env.PORT); 			// shoutout to the user

// load the routes
require('./app/routes')(app, router);