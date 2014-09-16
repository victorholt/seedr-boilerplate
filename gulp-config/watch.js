/* jshint node:true, laxbreak: true */
'use strict';

// Sets up the tasks to watch files.
// @task: /gulp-config/watch.js

///////////////////////////////////////////////////////////////////////////
// Required modules.
///////////////////////////////////////////////////////////////////////////
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
    this.gulp.task('watch', this.watch.bind(this));
};

/**
 * This task allows us to run gulp watch and have our files
 * compiled upon changes.
 *
 * @method watch
 * @returns void
 */
proto.watch = function() {
    this.gulp.watch('gulpfile.js', ['build', 'notify-all']);
    this.gulp.watch('./gulp-config/*.js', ['build', 'notify-all']);
    this.gulp.watch(path.join(buildConfig.DIR_SRC, 'assets/media/**'), ['media', 'clean-tmp', 'notify-media']);
    this.gulp.watch(path.join(buildConfig.DIR_SRC, 'assets/{scss,vendors}/**/*.scss'), ['css', 'clean-tmp', 'notify-css']); // jshint ignore:line
    this.gulp.watch(path.join(buildConfig.DIR_SRC, 'assets/{scripts, vendors}/**/*.js'), ['scripts', 'clean-tmp', 'notify-scripts']); // jshint ignore:line
    this.gulp.watch(path.join(buildConfig.DIR_SRC, 'assets/**/*.html'), ['markup', 'clean-tmp', 'notify-markup']);
};



///////////////////////////////////////////////////////////////////////////
// Export object
///////////////////////////////////////////////////////////////////////////
module.exports = GulpTask;
