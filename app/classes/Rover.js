'use strict';

// include some common libs
var _ = require('underscore');

// include required classes
var Position = require('./Position.js');
var Map = require('./Map.js');
var DIRECTIONS = require('./Directions.js');

// ## Rover class definition
function Rover(options) {
  var defaults = {

    // assign default starting position  
    // @todo within map boundaries?
    start: new Position(0, 0, 'north'), 

    // assign map instance undefined
    map: undefined 
  };

  // overwrite defaults with values given from options object
  if (!options) options = {};
  options = _.defaults(options, defaults);

  // init pathStack and add startint position as first path item
  this.pathStack = [];
  this.addPosition(options.start);

  // if there is a map available, we should use it
  // for boundaries and obstacles checks
  if (options.map) this.setMap(options.map);
}

// set map aka data for navigation system
Rover.prototype.setMap = function(map) {
  if (!map instanceof Map) throw new Error('invalid map');
  this.map = map;
  return true;
};

// get last Position of rover
Rover.prototype.getPosition = function(index) {
  if (!index) index = 0;
  if (this.pathStack.length === 0) return false;
  return this.pathStack[this.pathStack.length - index - 1];
};

// add new Position to rover path
Rover.prototype.addPosition = function(position) {
  if (!position instanceof Position) throw new Error('invalid position');
  this.pathStack.push(position);
  return true;
};

// move rover according to commandString `f|b|l|r
Rover.prototype.move = function(movePositon) {
  if (!_.isObject(movePositon) && movePositon.action == undefined) throw new Error('invalid input data');
  var direction;
  if(movePositon.direction == undefined ){
    var position = this.getPosition().clone();
    direction = position.direction
  }
  else{
    direction = movePositon.direction;
  }
  this._move(direction);

  return true;
};



Rover.prototype._move = function(direction) {

  // get last Position and clone a new Position
  var position = this.getPosition().clone();

  // move the rover according to its direction it is facing
  switch (direction) {
    case 'north': position.addY(1); break;
    case 'south': position.addY(-1); break;
    case 'west': position.addX(-1); break;
    case 'east': position.addX(1); break;
  }

  position.setDirection(direction);

  // if map is present ...
  if (this.map) {
    // moves within map boundaries only  
    // make sure rover stays within boundaries of map
    var _mapWrapper = function(position, map) {
      if (position.x > map.width) {
        position.setX(-map.width);
      } else if (position.x < -map.width) {
        position.setX(map.width);
      } else if (position.y > map.height) {
        position.setY(-map.height);
      } else if (position.y < -map.height) {
        position.setY(map.height);
      }
    };
    _mapWrapper(position, this.map);
  }

  // okay, finally add the new (cloned) Position to the pathStack
  this.addPosition(position);
  return true;
};

module.exports = Rover;
