/* jshint node:true, laxbreak: true */
'use strict';

///////////////////////////////////////////////////////////////////////////
// Required modules.
///////////////////////////////////////////////////////////////////////////
var path = require('path');
var gulp = require('gulp');
var del = require('del');
var rjs = require('gulp-requirejs');

///////////////////////////////////////////////////////////////////////////
// Global build variables.
///////////////////////////////////////////////////////////////////////////
var pkg = require('./package.json');
var buildConfig = require('./build-config');

///////////////////////////////////////////////////////////////////////////
// Gulp tasks.
///////////////////////////////////////////////////////////////////////////

/**
 * Cleans up the build files created.
 */
function gulpClean(cb) {
    del([
        buildConfig.DEST_DIR,
        buildConfig.TMP_DIR
    ], cb);
}
gulp.task('clean', gulpClean);

// ---- //

/**
 * Copies files into our destination folder defined in the
 * BuildConfig class.
 */
function gulpCopyCss(cb) {
    return gulp.src(
        [
            path.join(buildConfig.DIR_SRC, 'assets/{css,vendors}/**/*.css')
        ]
    )
    .pipe(gulp.dest(buildConfig.DIR_DEST));
}

function gulpCopyMarkup(cb) {
    return gulp.src(
        [
            path.join(buildConfig.DIR_SRC, '**/*.html'),
            path.join(buildConfig.DIR_SRC, '!assets/vendors/**')
        ]
    )
    .pipe(gulp.dest(buildConfig.DIR_DEST));
}

function gulpCopyMedia(cb) {
    return gulp.src(
        [
            path.join(buildConfig.DIR_SRC, 'assets/media/**')
        ]
    )
    .pipe(gulp.dest(buildConfig.DIR_DEST));
}

function gulpCopyScripts(cb) {
    return gulp.src(
        [
            path.join(buildConfig.DIR_SRC, 'assets/scripts/**/*.js'),
            path.join(buildConfig.DIR_SRC, 'assets/vendors/**/*.js')
        ]
    )
    .pipe(gulp.dest(buildConfig.DIR_DEST));
}
gulp.task('copy-css', gulpCopyCss);
gulp.task('copy-markup', gulpCopyMarkup);
gulp.task('copy-media', gulpCopyMedia);
gulp.task('copy-scripts', gulpCopyScripts);

// ---- //

/**
 * Handles configuring the RequireJS build to optimize and minify
 * the application javascript files.
 */
function gulpRequireJS() {
    rjs({
        options: {
            baseUrl: path.join(buildConfig.DIR_SRC, 'assets/scripts'),
            useStrict: true,
            optimize: 'uglify2',
            //optimize: 'none',
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
            }
        },
        main: {
            mainConfigFile: path.join(buildConfig.DIR_SRC, 'assets/scripts/config.js'),
            name: 'main',
            out: path.join(buildConfig.DIR_DEST, 'assets/scripts/main.min.js')
        }
    });
}
gulp.task('requirejs', gulpRequireJS);
