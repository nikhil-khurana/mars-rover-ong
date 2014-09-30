'use strict';

// include some common libs
var _ = require('underscore');

// ## Map class definition
function Map(width, height) {
  this.width = undefined;
  this.height = undefined;

  // it spans a coordinate system into positive and negative direction
  this.setWidth(width);
  this.setHeight(height);
}

// setter for width
Map.prototype.setWidth = function(width) {
  if (!_.isNumber(width)) throw new Error('invalid width');
  this.width = width;
};

// setter for height
Map.prototype.setHeight = function(height) {
  if (!_.isNumber(height)) throw new Error('invalid height');
  this.height = height;
};

module.exports = Map;
