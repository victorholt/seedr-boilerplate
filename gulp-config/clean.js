/* jshint node:true, laxbreak: true */
'use strict';

// Sets up tasks to clean up temporary and build folders.
// @task: /gulp-config/clean.js

///////////////////////////////////////////////////////////////////////////
// Required modules.
///////////////////////////////////////////////////////////////////////////
var clean = require('gulp-clean');
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
    this.gulp.task('clean-dest', this.cleanDest.bind(this));
    this.gulp.task('clean-tmp', this.cleanTmp.bind(this));
};

/**
 * Cleans and removes our generated destination folder.
 *
 * @method cleanDest
 * @returns {gulp}
 */
proto.cleanDest = function() {
    return this.gulp.src(buildConfig.DIR_DEST, {force: true, read: false})
                    .pipe(clean());
};

/**
 * Cleans and removes our generated temp folder.
 *
 * @method cleanTmp
 * @returns {gulp}
 */
proto.cleanTmp = function() {
    return this.gulp.src(buildConfig.DIR_TMP, {force: true, read: false})
                    .pipe(clean());
};


///////////////////////////////////////////////////////////////////////////
// Export object
///////////////////////////////////////////////////////////////////////////
module.exports = GulpTask;
