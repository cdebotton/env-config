'use strict';

var path = require('path');
var fs = require('fs');
var yaml = require('js-yaml');

var yamlRe = /\.yaml$/;
sadada
if (! Object.assign) {
  Object.assign = require('object-assign');
}

module.exports = function (cfgDir) {
  return fs.readdirSync(cfgDir).filter(function(file) {
    return yamlRe.test(file);
  }).reduce(reduceYaml(cfgDir), {});
};

function reduceYaml(cfgDir) {
  return function(cfg, file) {
    var buffer = fs.readFileSync(path.join(cfgDir,file), 'utf8');
    var opts = {};
    var key = file.match(/^(.+)\.yaml$/)[1];
    opts[key] = yaml.safeLoad(buffer);
    return opts[key] ? Object.assign(cfg, opts) : cfg;
  };
}
