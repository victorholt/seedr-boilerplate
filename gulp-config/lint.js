/* jshint node:true, laxbreak: true */
'use strict';

///////////////////////////////////////////////////////////////////////////
// Required modules.
///////////////////////////////////////////////////////////////////////////
var csslint = require('gulp-csslint');
var jshint = require('gulp-jshint');
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
    this.gulp.task('csslint', this.cssLint.bind(this));
    this.gulp.task('jshint', this.jsHint.bind(this));
};

/**
 * Lints the css files for any errors.
 *
 * @method cssLint
 * @returns {gulp}
 */
proto.cssLint = function() {
    return this.gulp.src(path.join(buildConfig.DIR_TMP, 'assets/**/*.css'))
               .pipe(csslint('.csslintrc'))
               .pipe(csslint.reporter());
};

/**
 * Runs the jshint validation based on the .jshintrc
 * validation rules.
 *
 * @method jsHint
 * @returns {gulp}
 */
proto.jsHint = function() {
    return this.gulp.src(path.join(buildConfig.DIR_SRC, 'scripts/**/*.js'))
               .pipe(jshint())
               .pipe(jshint.reporter('default'));
};

///////////////////////////////////////////////////////////////////////////
// Export object
///////////////////////////////////////////////////////////////////////////
module.exports = GulpTask;
