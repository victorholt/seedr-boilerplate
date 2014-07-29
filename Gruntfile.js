/* jshint node:true, laxbreak: true */
'use strict';

module.exports = function(grunt) {
    ///////////////////////////////////////////////////////////////////////////
    // Required Modules
    ///////////////////////////////////////////////////////////////////////////

    require('load-grunt-tasks')(grunt);
    require('nopt-grunt')(grunt);

    /**
     * Any modules needed before setting up Grunt should be included here.
     */

    ///////////////////////////////////////////////////////////////////////////
    // Grunt Options
    ///////////////////////////////////////////////////////////////////////////

    grunt.initOptions({
        prod: {
            info: 'Production build in progress',
            type: Boolean
        },

        dev: {
            info: 'Development build in progress',
            type: Boolean
        }
    });

    // Ensure we in dev mod by default.
    grunt.option('dev', !grunt.option('prod'));

    ///////////////////////////////////////////////////////////////////////////
    // Grunt Configuration
    ///////////////////////////////////////////////////////////////////////////

    grunt.initConfig({
        ///////////////////////////////////////////////////////////////////////
        // CONFIG VARIABLES
        ///////////////////////////////////////////////////////////////////////

        /**
         * Load up our package.json file so we can use the variables
         * we we build out the messages and banners.
         */
        pkg: require('./package.json'),

        /**
         * Our build configuration.
         */
        buildConfig: require('./build-config'),

        ///////////////////////////////////////////////////////////////////////
        // STARTUP TASKS
        ///////////////////////////////////////////////////////////////////////

        /**
         * Cleans out all of the directories that were generated during
         * the Grunt build process. This will keep each build fresh!
         */
        clean: {
            options: {
                force: true
            },
            dest: ['<%= buildConfig.DIR_DEST %>'],
            tmp: ['<%= buildConfig.DIR_TMP %>']
        },

        /**
         * Copies files into our destination folder defined in the
         * BuildConfig class.
         */
        copy: {
            css: {
                files: [{
                    expand: true,
                    cwd: '<%= buildConfig.DIR_SRC %>',
                    dest: '<%= buildConfig.DIR_DEST %>',
                    src: ['assets/{css,vendors}/**/*.css']
                }]
            },

            markup: {
                files: [{
                    expand: true,
                    cwd: '<%= buildConfig.DIR_SRC %>',
                    dest: '<%= buildConfig.DIR_DEST %>',
                    src: ['**/*.html', '!assets/vendors/**']
                }]
            },

            media: {
                files: [{
                    expand: true,
                    cwd: '<%= buildConfig.DIR_SRC %>',
                    dest: '<%= buildConfig.DIR_DEST %>',
                    src: ['assets/media/**']
                }]
            },

            scripts: {
                files: [{
                    expand: true,
                    cwd: '<%= buildConfig.DIR_SRC %>',
                    dest: '<%= buildConfig.DIR_DEST %>',
                    src: [
                        'assets/scripts/**/*.js',
                        'assets/vendors/**/*.js'
                    ]
                }]
            }
        },

        ///////////////////////////////////////////////////////////////////////
        // OPTIMIZE TASKS
        ///////////////////////////////////////////////////////////////////////

        /**
         * Handles configuring the RequireJS build to optimize and minify
         * the application javascript files.
         */
        requirejs: {
            options: {
                baseUrl: '<%= buildConfig.DIR_SRC %>/assets/scripts',
                useStrict: true,
                optimize: grunt.option('dev') ? 'none' : 'uglify2',
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
                options: {
                    mainConfigFile: '<%= buildConfig.DIR_SRC %>/assets/scripts/config.js',
                    name: 'main',
                    out: '<%= buildConfig.DIR_DEST %>/assets/scripts/main.js'
                }
            }
        },

        ///////////////////////////////////////////////////////////////////////
        // STYLE TASKS
        ///////////////////////////////////////////////////////////////////////

        sass: {
            compile: {
                options: {
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    cwd: '<%= buildConfig.DIR_SRC %>/assets/scss',
                    src: ['*.scss'],
                    dest: '<%= buildConfig.DIR_TMP %>/assets/css',
                    ext: '.css'
                }]
            }
        },

        cssmin: {
            all: {
                files: [{
                    expand: true,
                    cwd: '<%= buildConfig.DIR_TMP %>/assets/css',
                    src: ['*.css'],
                    dest: '<%= buildConfig.DIR_DEST %>/assets/css',
                    ext: '.min.css'
                }]
            }
        },

        ///////////////////////////////////////////////////////////////////////
        // LINTING TASKS
        ///////////////////////////////////////////////////////////////////////

        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            all: {
                src: [
                    '<%= buildConfig.DIR_TMP %>/css/**/*.css'
                ]
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                force: true
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= env.DIR_SRC %>/scripts/**/*.js'
                ]
            }
        },

        ///////////////////////////////////////////////////////////////////////
        // HELPER TASKS
        ///////////////////////////////////////////////////////////////////////

        /**
         * The grunt-banner allows us to place a banner on generated files
         */
        usebanner: {
            options: {
                position: 'top',
                linebreak: true
            },

            css: {
                options: {
                    banner: '/*\n<%= buildConfig.FILE_BANNER %> */\n'
                },
                files: {
                    src: ['<%= buildConfig.DIR_DEST %>/assets/css/**/*.css']
                }
            },

            markup: {
                options: {
                    banner: '<!--\n <%= buildConfig.FILE_BANNER %>\n -->\n'
                },
                files: {
                    src: ['<%= buildConfig.DIR_DEST %>/**/*.html']
                }
            },

            scripts: {
                options: {
                    banner: '/*\n<%= buildConfig.FILE_BANNER %> */\n'
                },
                files: {
                    src: ['<%= buildConfig.DIR_DEST %>/assets/scripts/**/*.js']
                }
            }
        },

        /**
         * This task allows us to run grunt watch and have our files
         * compiled upon changes.
         */
        watch: {
            options: {
                event: 'all'
            },
            grunt: {
                files: ['Gruntfile.js'],
                tasks: ['build', 'notify:build']
            },
            media: {
                files: ['<%= buildConfig.DIR_SRC %>/assets/media/**'],
                tasks: ['media', 'clean:tmp', 'notify:media']
            },
            css: {
                files: ['<%= buildConfig.DIR_SRC %>/assets/{scss,vendors}/**/*.scss'],
                tasks: ['css', 'clean:tmp', 'notify:css']
            },
            scripts: {
                files: ['<%= buildConfig.DIR_SRC %>/assets/{scripts,vendors}/**/*.js'],
                tasks: ['scripts', 'clean:tmp', 'notify:scripts']
            },
            markup: {
                files: ['<%= buildConfig.DIR_SRC %>/**/*.html'],
                tasks: ['markup', 'clean:tmp', 'notify:markup']
            }
        },

        /**
         * Notify messages when in the grunt watch mode so that we can
         * know when the build process has been executed.
         */
        notify: {
            build: {
                options: {
                    title: 'Grunt Build Complete',
                    message: 'Build Tasks Finished'
                }
            },
            media: {
                options: {
                    title: 'Grunt Build Complete',
                    message: 'Media Tasks Finished'
                }
            },
            css: {
                options: {
                    title: 'Grunt Build Complete',
                    message: 'CSS Tasks Finished'
                }
            },
            scripts: {
                options: {
                    title: 'Grunt Build Complete',
                    message: 'Scripts Tasks Finished'
                }
            },
            markup: {
                options: {
                    title: 'Grunt Build Complete',
                    message: 'Markup Tasks Finished'
                }
            }
        }
    });

    ///////////////////////////////////////////////////////////////////////////
    // REGISTER TASKS
    ///////////////////////////////////////////////////////////////////////////

    /**
     * Define our default task based upon our environment.
     */
    if (grunt.option('prod')) {
        grunt.registerTask('default', ['build', 'lint']);
    } else {
        grunt.registerTask('default', ['build']);
    }

    /**
     * Custom tasks.
     */
    grunt.registerTask('build', ['clean:dest', 'media', 'markup', 'css', 'scripts', 'clean:tmp']);
    grunt.registerTask('lint', ['csslint', 'jshint']);
    grunt.registerTask('media', ['copy:media']);
    grunt.registerTask('markup', ['copy:markup']);

    if (grunt.option('prod')) {
        grunt.registerTask('css', ['sass', 'cssmin', 'usebanner:css']);
        grunt.registerTask('scripts', ['requirejs:main', 'copy:scripts', 'userbanner:scripts']);
    } else {
        grunt.registerTask('css', ['sass', 'cssmin', 'usebanner:css']);
        grunt.registerTask('scripts', ['copy:scripts', 'usebanner:scripts']);
    }
};
