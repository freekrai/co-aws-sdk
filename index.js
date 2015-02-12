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

var services = ['S3'];

services.forEach(function(service) {
    CoAWS[service] = function() {
        var serviceInstance = new AWS[service]();
        var operations = serviceInstance.api.operations;

        assert(typeof operations === 'object', 'AWS sdk "' + service + '" api no operations.' )

        Object.keys(operations).forEach(function(key) {
            serviceInstance[key] = thunkify(serviceInstance[key])
        });

        return serviceInstance;
    }
});