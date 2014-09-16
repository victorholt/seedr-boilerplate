/* jshint node:true, laxbreak: true */
'use strict';

///////////////////////////////////////////////////////////////////////////
// Required modules.
///////////////////////////////////////////////////////////////////////////
var gulp = require('gulp');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var TaskConfigSetup = require('./gulp-config/taskConfigSetup');

///////////////////////////////////////////////////////////////////////////
// Global build variables.
///////////////////////////////////////////////////////////////////////////
var pkg = require('./package.json');
var buildConfig = require('./build-config');

// Build environment variables shared by all tasks.
var buildEnv = {
    buildDate: new Date().toISOString(),
    production: false,
    development: true,

    // Template variables that change based on our build type.
    template: {
        _gulpCssSuffix: '.css',
        _gulpJsSuffix: '.js',
        _gulpCompiledJSMainFile: '',
        _gulpProjectVersion: pkg.version,
        _gulpIsProduction: false
    }
};

// Check if we are doing a production build.
if (gutil.env.b != null && gutil.env.b === 'production') {
    buildEnv.development = false;
    buildEnv.production = true;

    buildEnv.template._gulpCssSuffix = '.min.css';
    buildEnv.template._gulpJsSuffix = '.min.js';
    buildEnv.template._gulpCompiledJSMainFile = '<script src="/' + buildConfig.DIR_ASSETS + '/scripts/main.min.js"></script>';
    buildEnv.template._gulpIsProduction = true;
}

///////////////////////////////////////////////////////////////////////////
// Gulp tasks.
///////////////////////////////////////////////////////////////////////////

// The names of the config files for our tasks.
// No specific ordering necessary.
var taskConfigSetup = null;
var tasks = [
    'clean',
    'copy',
    'css',
    'header',
    'lint',
    'require',
    'notify',
    'watch'
];

try {
    taskConfigSetup = new TaskConfigSetup(__dirname, gulp, buildEnv, tasks);
} catch(error) {
    console.log(error);
    process.exit(1);
}

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
