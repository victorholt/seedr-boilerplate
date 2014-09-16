/* jshint node:true, laxbreak: true */
'use strict';

// Sets up tasks to copy files from one directory to
// another (either from the source to temporary directory
// or temporary to the build directory).
// @task: /gulp-config/copy.js

///////////////////////////////////////////////////////////////////////////
// Required modules.
///////////////////////////////////////////////////////////////////////////
var path = require('path');
var buildConfig = require('./../build-config');
var template = require('gulp-template');

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
    this.gulp.task('copy-css', this.copyCss.bind(this));
    this.gulp.task('copy-markup', this.copyMarkup.bind(this));
    this.gulp.task('copy-media', this.copyMedia.bind(this));
    this.gulp.task('copy-scripts', this.copyScripts.bind(this));
    this.gulp.task('copy-pre-scripts', this.copyPreScripts.bind(this));
    this.gulp.task('copy-post-scripts', this.copyPostScripts.bind(this));
};

/**
 * Copies the css files from the temporary directory to
 * the build destination directory.
 *
 * @method copyCss
 * @returns {gulp}
 */
proto.copyCss = function() {
    return this.gulp.src(
        [
            path.join(buildConfig.DIR_TMP, buildConfig.DIR_ASSETS + '/**/*.css')
        ]
    )
    .pipe(this.gulp.dest(path.join(buildConfig.DIR_DEST, buildConfig.DIR_ASSETS)));
};

/**
 * Copies the markup files from the source directory to
 * the build destination directory.
 *
 * @method copyMarkup
 * @returns {gulp}
 */
proto.copyMarkup = function() {
    return this.gulp.src(
        [
            path.join(buildConfig.DIR_SRC, '**/*.html'),
            '!' + path.join(buildConfig.DIR_SRC, buildConfig.DIR_ASSETS + '/vendors/**')
        ]
    )
    .pipe(template(this.buildEnv.template))
    .pipe(this.gulp.dest(buildConfig.DIR_DEST));
};

/**
 * Copies the media files from the source directory to
 * the build destination directory.
 *
 * @method copyMedia
 * @returns {gulp}
 */
proto.copyMedia = function() {
    return this.gulp.src(
        [
            path.join(buildConfig.DIR_SRC, buildConfig.DIR_ASSETS + '/media/**')
        ]
    )
    .pipe(this.gulp.dest(path.join(buildConfig.DIR_DEST, buildConfig.DIR_ASSETS + '/media')));
};

/**
 * Copies all scripts files from the source directory to
 * the build destination directory. This is typically used
 * for development builds.
 *
 * @method copyScripts
 * @returns {gulp}
 */
proto.copyScripts = function() {
    return this.gulp.src(
        [
            path.join(buildConfig.DIR_SRC, buildConfig.DIR_ASSETS + '/**/*.js')
        ]
    )
    .pipe(this.gulp.dest(path.join(buildConfig.DIR_DEST, buildConfig.DIR_ASSETS)));
};

/**
 * Copies the scripts files from the source directory to
 * the temporary directory. This is typically used for
 * production builds.
 *
 * @method copyPreScripts
 * @returns {gulp}
 */
proto.copyPreScripts = function() {
    return this.gulp.src(
        [
            path.join(buildConfig.DIR_SRC, buildConfig.DIR_ASSETS + '/**/*.js')
        ]
    )
    .pipe(this.gulp.dest(path.join(buildConfig.DIR_TMP, buildConfig.DIR_ASSETS)));
};

/**
 * Copies the script files from the temporary directory to
 * the build destination directory. This is typically used for
 * production builds.
 *
 * @method copyPostScripts
 * @returns {gulp}
 */
proto.copyPostScripts = function() {
    this.gulp.src(
        [
            path.join(buildConfig.DIR_TMP, buildConfig.DIR_ASSETS + '/scripts/config.js')
        ]
    )
    .pipe(this.gulp.dest(path.join(buildConfig.DIR_DEST, buildConfig.DIR_ASSETS + '/scripts')));

    return this.gulp.src(
        [
            path.join(buildConfig.DIR_TMP, buildConfig.DIR_ASSETS + '/vendors/requirejs/require.js')
        ]
    )
    .pipe(this.gulp.dest(path.join(buildConfig.DIR_DEST, buildConfig.DIR_ASSETS + '/vendors/requirejs')));
};


///////////////////////////////////////////////////////////////////////////
// Export object
///////////////////////////////////////////////////////////////////////////
module.exports = GulpTask;
