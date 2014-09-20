/* jshint node:true, laxbreak: true */
'use strict';

// Sets up the notify tasks.
// @task: /gulp-config/notify.js

///////////////////////////////////////////////////////////////////////////
// Required modules.
///////////////////////////////////////////////////////////////////////////
var notify = require('gulp-notify');
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
    this.gulp.task('notify-all', this.notifyAll.bind(this));
    this.gulp.task('notify-media', this.notifyMedia.bind(this));
    this.gulp.task('notify-css', this.notifyCss.bind(this));
    this.gulp.task('notify-scripts', this.notifyScripts.bind(this));
    this.gulp.task('notify-markup', this.notifyMarkup.bind(this));
};

/**
 * Notifies that all tasks have been completed.
 *
 * @method notifyAll
 * @returns {gulp}
 */
proto.notifyAll = function() {
    return this.gulp.src('./*')
               .pipe(notify({'message': 'Build Tasks Finished'}));
};

/**
 * Notifies that the media tasks have been completed.
 *
 * @method notifyAll
 * @returns {gulp}
 */
proto.notifyMedia = function() {
    return this.gulp.src(path.join(buildConfig.DIR_SRC, buildConfig.DIR_ASSETS + '/media/**'))
               .pipe(notify({'message': 'Media Tasks Finished'}));
};

/**
 * Notifies that the css tasks have been completed.
 *
 * @method notifyCss
 * @returns {gulp}
 */
proto.notifyCss = function() {
    return this.gulp.src(path.join(buildConfig.DIR_SRC, buildConfig.DIR_ASSETS + '/{scss,vendors}/**/*.scss'))
               .pipe(notify({'message': 'Css Tasks Finished'}));
};

/**
 * Notifies that the script tasks have been completed.
 *
 * @method notifyScripts
 * @returns {gulp}
 */
proto.notifyScripts = function() {
    return this.gulp.src(path.join(buildConfig.DIR_SRC, buildConfig.DIR_ASSETS + '/{scripts, vendors}/**/*.js'))
               .pipe(notify({'message': 'Scripts Tasks Finished'}));
};

/**
 * Notifies that the markup tasks have been completed.
 *
 * @method notifyMarkup
 * @returns {gulp}
 */
proto.notifyMarkup = function() {
    return this.gulp.src(path.join(buildConfig.DIR_SRC, buildConfig.DIR_ASSETS + '/**/*.html'))
               .pipe(notify({'message': 'Markup Tasks Finished'}));
};


///////////////////////////////////////////////////////////////////////////
// Export object
///////////////////////////////////////////////////////////////////////////
module.exports = GulpTask;
