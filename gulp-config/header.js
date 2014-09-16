/* jshint node:true, laxbreak: true */
'use strict';

// Sets up the tasks that adds a header in the generated files.
// @task: /gulp-config/header.js

///////////////////////////////////////////////////////////////////////////
// Required modules.
///////////////////////////////////////////////////////////////////////////
var header = require('gulp-header');
var path = require('path');
var pkg = require('./../package.json');
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
    this.gulp.task('header-css', this.headerCss.bind(this));
    this.gulp.task('header-markup', this.headerMarkup.bind(this));
    this.gulp.task('header-scripts', this.headerScripts.bind(this));
};

/**
 * Tasks that adds a header to generated css files.
 *
 * @method headerCss
 * @returns {gulp}
 */
proto.headerCss = function() {
    return this.gulp.src(path.join(buildConfig.DIR_DEST, buildConfig.DIR_ASSETS + '/**/*.css'))
               .pipe(header('/*\n' + buildConfig.FILE_BANNER + ' */\n', {pkg: pkg, buildDate: this.buildEnv.buildDate})) // jshint ignore:line
               .pipe(this.gulp.dest(path.join(buildConfig.DIR_DEST, buildConfig.DIR_ASSETS)));
};

/**
 * Tasks that adds a header to generated markup files.
 *
 * @method headerMarkup
 * @returns {gulp}
 */
proto.headerMarkup = function() {
    return this.gulp.src(path.join(buildConfig.DIR_DEST, '**/*.html'))
               .pipe(header('<!--\n ' + buildConfig.FILE_BANNER + '\n -->\n', {pkg: pkg, buildDate: this.buildEnv.buildDate})) // jshint ignore:line
               .pipe(this.gulp.dest(buildConfig.DIR_DEST));
};

/**
 * Tasks that adds a header to generated css files.
 *
 * @method headerScripts
 * @returns {gulp}
 */
proto.headerScripts = function() {
    return this.gulp.src(path.join(buildConfig.DIR_DEST, buildConfig.DIR_ASSETS + '/**/*.js'))
               .pipe(header('/*\n' + buildConfig.FILE_BANNER + ' */\n', {pkg: pkg, buildDate: this.buildEnv.buildDate})) // jshint ignore:line
               .pipe(this.gulp.dest(path.join(buildConfig.DIR_DEST, buildConfig.DIR_ASSETS)));
};


///////////////////////////////////////////////////////////////////////////
// Export object
///////////////////////////////////////////////////////////////////////////
module.exports = GulpTask;
