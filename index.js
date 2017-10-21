/**
 * Module dependencies.
 */

var thunkify = require('thunkify');
var assert = require('assert');
var AWS = require('aws-sdk');

/**
 * Expose `CoAWS`.
 */

module.exports = CoAWS;

/**
 * CoAWS.
 */

function CoAWS() {
}

/**
 * Wrap AWS services sdk.
 */

var services = ['S3', 'SQS'];

services.forEach(function(service) {
  CoAWS[service] = function() {
    var serviceInstance = new AWS[service]();
    var wrapService = {};

    for(var key in serviceInstance){
      // if(key == 'constructor') continue;
      if(typeof serviceInstance[key] == 'function'){
        wrapService[key] = thunkify(serviceInstance[key].bind(serviceInstance));
      } else {
        wrapService[key] = serviceInstance[key];
      }
    }
    return wrapService;
  }
});
