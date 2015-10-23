'use strict';

var minimist = require('minimist');
var path = require('path');
var nconf = require('nconf');
var EnvironmentName = require('./EnvironmentName');

module.exports = Environment;
function Environment() {

}

Environment.getEnvironmentForProcess = function(process) {
    var argv = minimist(process.argv.slice(2));
    var currentEnv = argv.env || EnvironmentName.Local;

    return currentEnv;
};

Environment.getConfigForEnvironment = function(env) {
    // todo display or throw error when env file not found, it's silent in the current state
    nconf.reset();

    if(env !== 'base') {
        nconf.add(env, { type: 'file', file: path.join(process.cwd(), 'tgconfig.' + env + '.json') });
    }

    nconf.add('base', { type: 'file', file: path.join(process.cwd(), 'tgconfig.json') });

    return nconf.get();
};
