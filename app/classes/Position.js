'use strict';

// include some common libs
var _ = require('underscore');

// include required classes
var DIRECTIONS = require('./Directions.js');

// ## Position class definition
function Position(x, y, direction) {
  this.x = undefined;
  this.y = undefined;
  this.direction = undefined;

  this.setX(x);
  this.setY(y);
  this.setDirection(direction);
}

// clone current instance of Position and return it
Position.prototype.clone = function() {
  return new Position(this.x, this.y, this.direction);
};

// setter for x coordinate
Position.prototype.setX = function(x) {
  if (!_.isNumber(x)) throw new Error('invalid x coordinate');
  this.x = x;
};
// add x to this.x coordinate
Position.prototype.addX = function(x) {
  if (!_.isNumber(x)) throw new Error('invalid value');
  this.x = this.x + x;
};

// setter for y coordinate
Position.prototype.setY = function(y) {
  if (!_.isNumber(y)) throw new Error('invalid y coordinate');
  this.y = y;
};
// add y to this.y coordinate
Position.prototype.addY = function(y) {
  if (!_.isNumber(y)) throw new Error('invalid value');
  this.y = this.y + y;
};

// setter for direction
Position.prototype.setDirection = function(direction) {
  if (!direction || !~DIRECTIONS.indexOf(direction))
    throw new Error('missing or invalid direction (' + DIRECTIONS.join('|') + ')');
  this.direction = direction;
};

module.exports = Position;
