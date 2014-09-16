/* jshint node:true, laxbreak: true */
'use strict';

///////////////////////////////////////////////////////////////////////////
// Required modules.
///////////////////////////////////////////////////////////////////////////
var gulp = require('gulp');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');

///////////////////////////////////////////////////////////////////////////
// Global build variables.
///////////////////////////////////////////////////////////////////////////
var GulpTask = null;    // Class object for the task.
var taskObj = null;     // Task object reused for initialzing tasks.

// Build environment variables shared by all tasks.
var buildEnv = {
    buildDate: new Date().toISOString(),
    production: false,
    development: true,

    // Template variables that change based on our build type.
    template: {
        _gulpCssSuffix: '.css',
        _gulpJsSuffix: '.js',
        _gulpCompiledJSMainFile: ''
    }
};

// Check if we are doing a production build.
if (gutil.env.b != null && gutil.env.b === 'production') {
    buildEnv.development = false;
    buildEnv.production = true;

    buildEnv.template._gulpCssSuffix = '.min.css';
    buildEnv.template._gulpJsSuffix = '.min.js';
    buildEnv.template._gulpCompiledJSMainFile = '<script src="assets/scripts/main.min.js"></script>';
}

///////////////////////////////////////////////////////////////////////////
// Gulp tasks.
///////////////////////////////////////////////////////////////////////////

// Sets up tasks to clean up temporary and build folders.
// @task: /gulp-config/clean.js
GulpTask = new require('./gulp-config/clean');
taskObj = new GulpTask(gulp, buildEnv);

// ---- //

// Sets up tasks to copy files from one directory to
// another (either from the source to temporary directory
// or temporary to the build directory).
// @task: /gulp-config/copy.js
GulpTask = new require('./gulp-config/copy');
taskObj = new GulpTask(gulp, buildEnv);

// ---- //

// Sets up the task for requirejs.
// @task: /gulp-config/require.js
GulpTask = new require('./gulp-config/require.js');
taskObj = new GulpTask(gulp, buildEnv);

// ---- //

// Includes tasks for Sass and Css minifying.
// The Sass task compiles the sass files and
// moves them to the temporary directory. From
// there the css can be linted and then minified.
// @task: /gulp-config/css.js
GulpTask = new require('./gulp-config/css.js');
taskObj = new GulpTask(gulp, buildEnv);

// ---- //

// Sets up the tasks that lints css and js files.
// @task: /gulp-config/lint.js
GulpTask = new require('./gulp-config/lint.js');
taskObj = new GulpTask(gulp, buildEnv);

// ---- //

// Sets up the tasks that adds a header in the generated files.
// @task: /gulp-config/header.js
GulpTask = new require('./gulp-config/header.js');
taskObj = new GulpTask(gulp, buildEnv);

// ---- //

// Sets up the tasks to watch files.
// @task: /gulp-config/watch.js
GulpTask = new require('./gulp-config/watch.js');
taskObj = new GulpTask(gulp, buildEnv);

// ---- //

// Sets up the notify tasks.
// @task: /gulp-config/notify.js
GulpTask = new require('./gulp-config/notify.js');
taskObj = new GulpTask(gulp, buildEnv);

// ---- //

/**
 * Logs to the console that the build is finished.
 */
function logCompleteMessage() {
    // Let us know that we've finished building.
    if (buildEnv.production) {
        gutil.log(gutil.colors.green('Finished Running All Production Tasks'));
    } else {
        gutil.log(gutil.colors.blue('Finished Running All Development Tasks'));
    }

    return;
}

/**
 * Define our default task based upon our environment.
 */
if (buildEnv.production) {
    gulp.task('default', ['build', 'lint']);
} else {
    gulp.task('default', ['build']);
}

/**
 * Custom tasks.
 */
gulp.task('build', function(cb) {
    runSequence('clean-dest',
                'media',
                'markup',
                'css',
                'scripts',
                'clean-tmp',
                'finished-log', cb);
});
gulp.task('clean', ['clean-dest', 'clean-tmp']);
gulp.task('lint', ['csslint', 'jshint']);
gulp.task('media', ['copy-media']);
gulp.task('markup', ['copy-markup']);

if (buildEnv.production) {
    gulp.task('css', function(cb) {
        runSequence('sass',
                    'csslint',
                    'cssmin',
                    'header-css', cb);
    });

    gulp.task('scripts', function(cb) {
        runSequence('jshint',
                    'copy-pre-scripts',
                    'requirejs',
                    'copy-post-scripts',
                    'header-scripts', cb);
    });
} else {
    gulp.task('css', function(cb) {
        runSequence('sass',
                    'copy-css',
                    'header-css', cb);
    });

    gulp.task('scripts', function(cb) {
        runSequence('copy-scripts',
                    'header-scripts', cb);
    });
}

gulp.task('finished-log', function() {
    return logCompleteMessage();
});
