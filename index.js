'use strict';

var fs = require('fs');
var path = require('path');
var callsite = require('callsite');
var merge = require('deepmerge');
var reduceYaml = require('./lib/reduce-yaml');
var env = process.env.NODE_ENV || 'development';

var cache = null;

module.exports = function(configLocation, params) {
  params || (params = {});

  if (cache) return cache;

  if (typeof configLocation !== 'string') {
    throw new TypeError('You must provide relative path to your configuration as a string');
  }

  if (params.absolute) {
    var cfgDir = configLocation;
  }
  else {
    var stack = callsite();
    var callee = stack[1].getFileName();
    var dirname = path.dirname(callee);
    var cfgDir = path.join(dirname, configLocation);
  }

  if (! fs.existsSync(cfgDir)) {
    throw new ReferenceError('The configuration path provided does not exist');
  }

  var options = reduceYaml(cfgDir);

  var envDir = path.join(cfgDir, env);
  if (fs.existsSync(envDir)) {
    var envOptions = reduceYaml(envDir);

    options = merge(options, envOptions);
  }

  cache = options;

  return options;
};
