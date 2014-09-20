/* jshint node:true, laxbreak: true */
'use strict';

// Sets up the tasks to watch files.
// @task: /gulp-config/watch.js

///////////////////////////////////////////////////////////////////////////
// Required modules.
///////////////////////////////////////////////////////////////////////////
var path = require('path');
var buildConfig = require('./../build-config');
var runSequence = require('run-sequence');

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
    // Watch Config Files.
    this.gulp.watch('gulpfile.js',
                    function(done) {
                        runSequence('build',
                                    'notify-all'
                                    );
                    });
    this.gulp.watch('./gulp-config/*.js',
                    function() {
                        runSequence('build',
                                    'notify-all'
                                    );
                    });

    // Watch Media Files.
    this.gulp.watch(path.join(buildConfig.DIR_SRC, buildConfig.DIR_ASSETS + '/media/**'),
                    function() {
                        runSequence('media',
                                    'clean-tmp',
                                    'notify-media'
                                    );
                    });

    // Watch SCSS Files.
    this.gulp.watch(path.join(buildConfig.DIR_SRC, buildConfig.DIR_ASSETS + '/{scss,vendors}/**/*.scss'),
                    function() {
                        runSequence('css',
                                    'clean-tmp',
                                    'notify-css'
                                    );
                    });

    // Watch Script Files.
    this.gulp.watch(path.join(buildConfig.DIR_SRC, buildConfig.DIR_ASSETS + '/{scripts, vendors}/**/*.js'),
                    function() {
                        runSequence('scripts',
                                    'clean-tmp',
                                    'notify-scripts'
                                    );
                    });

    // Watch Markup Files.
    this.gulp.watch(path.join(buildConfig.DIR_SRC, buildConfig.DIR_ASSETS + '/**/*.html'),
                    function() {
                        runSequence('markup',
                                    'clean-tmp',
                                    'notify-markup'
                                    );
                    });
};



///////////////////////////////////////////////////////////////////////////
// Export object
///////////////////////////////////////////////////////////////////////////
module.exports = GulpTask;
