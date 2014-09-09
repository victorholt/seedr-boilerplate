/* jshint node:true, laxbreak: true */
'use strict';

///////////////////////////////////////////////////////////////////////////
// Required modules.
///////////////////////////////////////////////////////////////////////////
var path = require('path');
var gulp = require('gulp');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var rjs = require('gulp-requirejs');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var csslint = require('gulp-csslint');
var jshint = require('gulp-jshint');
var header = require('gulp-header');
var notify = require('gulp-notify');
var gutil = require('gulp-util');
var template = require('gulp-template');
var runSequence = require('run-sequence');

///////////////////////////////////////////////////////////////////////////
// Global build variables.
///////////////////////////////////////////////////////////////////////////
var pkg = require('./package.json');
var buildConfig = require('./build-config');
var buildDate = new Date().toISOString();
var production = 0;

// Template variables that change based on our build type.
var templateVars = {
    _gulpCssSuffix: '.css',
    _gulpJsSuffix: '.js',
    _gulpCompiledJSMainFile: ''
};

// Check if we are doing a production build.
if (gutil.env.b != null && gutil.env.b === 'production') {
    production = 1;
    templateVars._gulpCcssSuffix = '.min.css';
    templateVars._gulpJsSuffix = '.min.js';
    templateVars._gulpCompiledJSMainFile = '<script src="assets/scripts/main.min.js"></script>';
}

/**
 * Logs to the console that the build is finished.
 */
function gulpLogComplete() {
    // Let us know that we've finished building.
    if (gutil.env.b != null && gutil.env.b === 'production') {
        gutil.log(gutil.colors.green('Finished Running All Production Tasks'));
    } else {
        gutil.log(gutil.colors.blue('Finished Running All Development Tasks'));
    }

    return;
}

///////////////////////////////////////////////////////////////////////////
// Gulp tasks.
///////////////////////////////////////////////////////////////////////////

/**
 * Cleans up the build files created.
 */
function gulpCleanDest() {
    return gulp.src(buildConfig.DIR_DEST, {force: true, read: false})
               .pipe(clean());
}
gulp.task('clean-dest', gulpCleanDest);

/**
 * Cleans up the build files created.
 */
function gulpCleanTmp() {
    return gulp.src(buildConfig.DIR_TMP, {force: true, read: false})
               .pipe(clean());
}
gulp.task('clean-tmp', gulpCleanTmp);

// ---- //

/**
 * Copies files into our destination folder defined in the
 * BuildConfig class.
 */
function gulpCopyCss(cb) {
    return gulp.src(
        [
            path.join(buildConfig.DIR_TMP, 'assets/**/*.css')
        ]
    )
    .pipe(gulp.dest(path.join(buildConfig.DIR_DEST, 'assets')));
}

function gulpCopyMarkup(cb) {
    return gulp.src(
        [
            path.join(buildConfig.DIR_SRC, '**/*.html'),
            '!' + path.join(buildConfig.DIR_SRC, 'assets/vendors/**')
        ]
    )
    .pipe(template(templateVars))
    .pipe(gulp.dest(buildConfig.DIR_DEST));
}

function gulpCopyMedia(cb) {
    return gulp.src(
        [
            path.join(buildConfig.DIR_SRC, 'assets/media/**')
        ]
    )
    .pipe(gulp.dest(path.join(buildConfig.DIR_DEST, 'assets/media')));
}

function gulpCopyScripts(cb) {
    return gulp.src(
        [
            path.join(buildConfig.DIR_SRC, 'assets/**/*.js')
        ]
    )
    .pipe(gulp.dest(path.join(buildConfig.DIR_DEST, 'assets')));
}

function gulpCopyPreScripts(cb) {
    return gulp.src(
        [
            path.join(buildConfig.DIR_SRC, 'assets/**/*.js')
        ]
    )
    .pipe(gulp.dest(path.join(buildConfig.DIR_TMP, 'assets')));
}

function gulpCopyPostScripts(cb) {
    gulp.src(
        [
            path.join(buildConfig.DIR_TMP, 'assets/scripts/config.js')
        ]
    )
    .pipe(gulp.dest(path.join(buildConfig.DIR_DEST, 'assets/scripts')));

    return gulp.src(
        [
            path.join(buildConfig.DIR_TMP, 'assets/vendors/requirejs/require.js')
        ]
    )
    .pipe(gulp.dest(path.join(buildConfig.DIR_DEST, 'assets/vendors/requirejs')));

    //.src(path.join(buildConfig.DIR_TMP, 'assets/vendors/requirejs/require.js'))
    //.pipe(gulp.dest(path.join(buildConfig.DIR_TMP, 'assets/vendors/requirejs')));
}

gulp.task('copy-css', gulpCopyCss);
gulp.task('copy-markup', gulpCopyMarkup);
gulp.task('copy-media', gulpCopyMedia);
gulp.task('copy-scripts', gulpCopyScripts);
gulp.task('copy-pre-scripts', gulpCopyPreScripts);
gulp.task('copy-post-scripts', gulpCopyPostScripts);

// ---- //

/**
 * Handles configuring the RequireJS build to optimize and minify
 * the application javascript files.
 */
function gulpRequireJS() {
    rjs({
        baseUrl: path.join(buildConfig.DIR_TMP, 'assets/scripts'),
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
        },

        mainConfigFile: path.join(buildConfig.DIR_TMP, 'assets/scripts/config.js'),
        name: 'main',
        out: path.join(buildConfig.DIR_DEST, 'assets/scripts/main.min.js')
    })
    .pipe(gulp.dest('./'));
}
gulp.task('requirejs', gulpRequireJS);

// ---- //

/**
 * Handles the Gulp task of compiling the scss files.
 */
function gulpSass() {
    return gulp.src(path.join(buildConfig.DIR_SRC, 'assets/scss/**/*.scss'))
               .pipe(sass())
               .pipe(gulp.dest(path.join(buildConfig.DIR_TMP, 'assets/css')));
}
gulp.task('sass', gulpSass);

// ---- //

/**
 * Handles the Gulp task of minifying the css files.
 */
function gulpCssMin() {
    return gulp.src(path.join(buildConfig.DIR_TMP, 'assets/**/*.css'))
               .pipe(cssmin())
               .pipe(rename({suffix: '.min'}))
               .pipe(gulp.dest(path.join(buildConfig.DIR_DEST, 'assets')));
}
gulp.task('cssmin', gulpCssMin);

// ---- //

/**
 * Lints the css files for any errors.
 */
function gulpCssLint() {
    return gulp.src(path.join(buildConfig.DIR_TMP, 'assets/**/*.css'))
               .pipe(csslint('.csslintrc'))
               .pipe(csslint.reporter());
}
gulp.task('csslint', gulpCssLint);

/**
 * Runs the jshint validation based on the .jshintrc
 * validation rules.
 */
function gulpJsHint() {
    return gulp.src(path.join(buildConfig.DIR_SRC, 'scripts/**/*.js'))
               .pipe(jshint())
               .pipe(jshint.reporter('default'));
}
gulp.task('jshint', gulpJsHint);

// ---- //

/**
 * Tasks that adds a header to generated css files.
 */
function gulpHeaderCss() {
    return gulp.src(path.join(buildConfig.DIR_DEST, 'assets/**/*.css'))
               .pipe(header('/*\n' + buildConfig.FILE_BANNER + ' */\n', {pkg: pkg, buildDate: buildDate})) // jshint ignore:line
               .pipe(gulp.dest(path.join(buildConfig.DIR_DEST, 'assets')));
}
gulp.task('header-css', gulpHeaderCss);

/**
 * Tasks that adds a header to generated markup files.
 */
function gulpHeaderMarkup() {
    return gulp.src(path.join(buildConfig.DIR_DEST, '**/*.html'))
               .pipe(header('<!--\n ' + buildConfig.FILE_BANNER + '\n -->\n', {pkg: pkg, buildDate: buildDate})) // jshint ignore:line
               .pipe(gulp.dest(buildConfig.DIR_DEST));
}
gulp.task('header-markup', gulpHeaderMarkup);

/**
 * Tasks that adds a header to generated css files.
 */
function gulpHeaderScripts() {
    return gulp.src(path.join(buildConfig.DIR_DEST, 'assets/**/*.js'))
               .pipe(header('/*\n' + buildConfig.FILE_BANNER + ' */\n', {pkg: pkg, buildDate: buildDate})) // jshint ignore:line
               .pipe(gulp.dest(path.join(buildConfig.DIR_DEST, 'assets')));
}
gulp.task('header-scripts', gulpHeaderScripts);

// ---- //

/**
 * This task allows us to run gulp watch and have our files
 * compiled upon changes.
 */
function gulpWatch() {
    gulp.watch('gulpfile.js', ['build', 'notify-all']);
    gulp.watch(path.join(buildConfig.DIR_SRC, 'assets/media/**'), ['media', 'clean-tmp', 'notify-media']);
    gulp.watch(path.join(buildConfig.DIR_SRC, 'assets/{scss,vendors}/**/*.scss'), ['css', 'clean-tmp', 'notify-css']);
    gulp.watch(path.join(buildConfig.DIR_SRC, 'assets/{scripts, vendors}/**/*.js'), ['scripts', 'clean-tmp', 'notify-scripts']); // jshint ignore:line
    gulp.watch(path.join(buildConfig.DIR_SRC, 'assets/**/*.html'), ['markup', 'clean-tmp', 'notify-markup']);
}
gulp.task('watch', gulpWatch);

// ---- //

/**
 * Notify messages when in the gulp watch mode so that we can
 * know when the build process has been executed.
 */
function gulpNotifyAll() {
    return gulp.src('./*')
               .pipe(notify({'message': 'Build Tasks Finished'}));
}
gulp.task('notify-all', gulpNotifyAll);

function gulpNotifyMedia() {
    return gulp.src('./*')
               .pipe(notify({'message': 'Media Tasks Finished'}));
}
gulp.task('notify-media', gulpNotifyMedia);

function gulpNotifyCss() {
    return gulp.src('./*')
               .pipe(notify({'message': 'Css Tasks Finished'}));
}
gulp.task('notify-css', gulpNotifyCss);

function gulpNotifyScripts() {
    return gulp.src('./*')
               .pipe(notify({'message': 'Scripts Tasks Finished'}));
}
gulp.task('notify-scripts', gulpNotifyScripts);

function gulpNotifyMarkup() {
    return gulp.src('./*')
               .pipe(notify({'message': 'Markup Tasks Finished'}));
}
gulp.task('notify-markup', gulpNotifyMarkup);

// ---- //

/**
 * Define our default task based upon our environment.
 */
if (production) {
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

if (production) {
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
    return gulpLogComplete();
});
