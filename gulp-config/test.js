/* jshint node:true, laxbreak: true */
'use strict';

// Sets up tasks to run the Karma Framework.
// @task: /gulp-config/test.js

///////////////////////////////////////////////////////////////////////////
// Required modules.
///////////////////////////////////////////////////////////////////////////
var karma = require('karma').server;
var path = require('path');
var buildConfig = require('./../build-config');

///////////////////////////////////////////////////////////////////////////
// Create Tasks
///////////////////////////////////////////////////////////////////////////

/**
 * The class that holds all of our gulp tasks for this configuration.
 *
 * @class GulpTask
 * @param {gulp} gulp
 * @param {object} buildEnv
 * @constructor
 */
var GulpTask = function(gulp, buildEnv) {
    /**
     * The GulpJS object.
     *
     * @default null
     * @property {gulp}
     * @type {gulp}
     */
    this.gulp = gulp;

    /**
     * The build environment info.
     *
     * @default null
     * @property buildEnv
     * @type {object}
     */
    this.buildEnv = buildEnv;

    // Initialize the gulp tasks.
    this.init();
};

var proto = GulpTask.prototype;

/**
 * Initializes the gulp tasks.
 *
 * @method init
 * @returns void
 */
proto.init = function() {
    this.gulp.task('test', this.test.bind(this));
};

/**
 * Goes through test files using Karma
 *
 * @method test
 * @returns {gulp}
 */
proto.test = function(done) {
    karma.start({
        configFile: path.join(__dirname, '../karma.config.js'),
        singleRun: true
    }, done);
};


///////////////////////////////////////////////////////////////////////////
// Export object
///////////////////////////////////////////////////////////////////////////
module.exports = GulpTask;
