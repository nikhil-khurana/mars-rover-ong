'use strict'; 

var Rover = require('../classes/Rover');
var Position = require('../classes/Position');
var Map = require('../classes/Map');

var rover;

exports.init = function(req, res){
	var map = new Map(req.body.width*1, req.body.height*1);
	rover = new Rover({start: new Position(0, 0, 'north'), map: map});
	res.jsonp(rover.getPosition());
}

exports.move = function(req, res){
	rover.move(req.body); 
	res.jsonp(rover.getPosition());		
}