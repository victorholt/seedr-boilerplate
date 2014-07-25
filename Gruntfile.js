/* jshint node:true, laxbreak: true */
'use strict';

module.exports = function(grunt) {
    ///////////////////////////////////////////////////////////////////////////
    // Required Modules
    ///////////////////////////////////////////////////////////////////////////

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
        buildConfig: require('build-config'),

        ///////////////////////////////////////////////////////////////////////
        // GRUNT TASKS
        ///////////////////////////////////////////////////////////////////////

        /**
         * Cleans out all of the directories that were generated during
         * the Grunt build process. This will keep each build fresh!
         */
        clean: {
            options: {
                force: true
            },
            dest: ['<%= buildConfig.DIR_DEST %>']
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
                        'assets/scripts/**/.js',
                        'assets/vendors/**/*.js'
                    ]
                }]
            }
        },

        /**
         * Handles configuring the RequireJS build to optimize and minify
         * the application javascript files.
         */
        requirejs: {
            options: {
                baseUrl: '<%= buildConfig.DIR_SRC/assets/scripts %>',
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
                },
                main: {
                    options: {
                        mainConfigFile: '<%= buildConfig.DIR_SRC %>/assets/scripts/config.js',
                        name: 'main',
                        out: '<%= buildConfig.DIR_DEST %>/assets/scripts/main.js'
                    }
                }
            }
        },

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
                    banner: '/*!<%= buildConfig.FILE_BANNER %> */\n'
                },
                files: {
                    src: ['<%= buildConfig.DIR_DEST %>/assets/css/**/*.css']
                }
            },

            markup: {
                options: {
                    banner: '<!-- <%= buildConfig.FILE_BANNER %> -->\n'
                },
                files: {
                    src: ['<%= buildConfig.DIR_DEST %>/**/*.html']
                }
            },

            scripts: {
                options: {
                    banner: '/*!<%= buildConfig.FILE_BANNER %> */\n'
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
                tasks: ['build']
            },
            media: {
                files: ['<%= buildConfig.DIR_SRC %>/assets/media/**'],
                tasks: ['media']
            },
            css: {
                files: ['<%= buildConfig.DIR_SRC %>/assets/{css,vendors}/**/*.css'],
                tasks: ['css']
            },
            scripts: {
                files: ['<%= buildConfig.DIR_SRC %>/assets/{scripts,vendors}/**/*.js'],
                tasks: ['scripts']
            },
            markup: {
                files: ['<%= buildConfig.DIR_SRC %>/**/*.html'],
                tasks: ['markup']
            }
        },

        ///////////////////////////////////////////////////////////////////////
        // REGISTER TASKS
        ///////////////////////////////////////////////////////////////////////

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
        grunt.registerTask('build', ['clean:dest', 'media', 'markup', 'css', 'scripts']);
        grunt.registerTask('lint', ['jshint']);
        grunt.registerTask('media', ['copy:media']);
        grunt.registerTask('markup', ['copy:markup']);

        if (grunt.option('prod')) {
            grunt.registerTask('css', ['concat', 'usebanner:css']);
            grunt.registerTask('scripts', ['copy:scripts', 'userbanner:scripts']);
        } else {
            grunt.registerTask('css', ['concat', 'usebanner:css']);
            grunt.registerTask('scripts', ['require:main', 'copy:scripts', 'userbanner:scripts']);
        }
    });
};
