/* jshint node:true, laxbreak: true */
'use strict';

///////////////////////////////////////////////////////////////////////////
// Required modules.
///////////////////////////////////////////////////////////////////////////
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var path = require('path');
var rename = require('gulp-rename');
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
    this.gulp.task('sass', this.sass.bind(this));
    this.gulp.task('cssmin', this.cssMin.bind(this));
};

/**
 * Handles the Gulp task of compiling the scss files.
 *
 * @method sass
 * @returns {gulp}
 */
proto.sass = function() {
    return this.gulp.src(path.join(buildConfig.DIR_SRC, 'assets/scss/**/*.scss'))
               .pipe(sass())
               .pipe(this.gulp.dest(path.join(buildConfig.DIR_TMP, 'assets/css')));
};

// ---- //

/**
 * Handles the Gulp task of minifying the css files.
 *
 * @method cssMin
 * @returns {gulp}
 */
proto.cssMin = function() {
    return this.gulp.src(path.join(buildConfig.DIR_TMP, 'assets/**/*.css'))
               .pipe(cssmin())
               .pipe(rename({suffix: '.min'}))
               .pipe(this.gulp.dest(path.join(buildConfig.DIR_DEST, 'assets')));
};


///////////////////////////////////////////////////////////////////////////
// Export object
///////////////////////////////////////////////////////////////////////////
module.exports = GulpTask;