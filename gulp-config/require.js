/* jshint node:true, laxbreak: true */
'use strict';

// Sets up the task for requirejs.
// @task: /gulp-config/require.js

///////////////////////////////////////////////////////////////////////////
// Required modules.
///////////////////////////////////////////////////////////////////////////
var rjs = require('gulp-requirejs');
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
    this.gulp.task('requirejs', this.requireJS.bind(this));
};

/**
 * Handles configuring the RequireJS build to optimize and minify
 * the application javascript files.
 *
 * @method requireJS
 */
proto.requireJS = function() {
    // TODO: Look into this as requireJS only runs currently
    //       if we are building for production...
    var optimize = this.buildEnv.production ? 'uglify' : 'none';

    rjs({
        baseUrl: path.join(buildConfig.DIR_TMP, 'assets/scripts'),
        useStrict: true,
        optimize: optimize,
        uglify2: {
            output: {
                beautify: false,
                comments: false
            },
            compress: {
                sequences: false
            },
            warnings: false,
            mangle: true
        },

        mainConfigFile: path.join(buildConfig.DIR_TMP, 'assets/scripts/config.js'),
        name: 'main',
        out: path.join(buildConfig.DIR_DEST, 'assets/scripts/main.min.js')
    })
    .pipe(this.gulp.dest('./'));
};

///////////////////////////////////////////////////////////////////////////
// Export object
///////////////////////////////////////////////////////////////////////////
module.exports = GulpTask;
