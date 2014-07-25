/* jshint node:true, laxbreak: true */
'use strict';

/**
 * Build configuration constants.
 *
 * This file contains all of the build configurations which are used
 * when compiled by Grunt.
 *
 * @class BuildConfig
 * @static
 */

var BuildConfig = {
    /**
     * The file banner that goes above all
     * generated files.
     *
     * @property FILE_BANNER
     * @type String
     */
    FILE_BANNER:  [
        ' * THIS IS A GENERATED FILE AND SHOULD NOT BE EDITTED!',
        ' *',
        ' * <%= pkg.name %>, <%= pkg.version %>',
        ' * <%= pkg.description %>',
        ' * Built: <%= grunt.template.today("yyyy-mm-dd") %>'
    ].join('\n'),

    /**
     * The build source diretory.
     *
     * @property DIR_SRC
     * @type String
     */
    DIR_SRC: './src',

    /**
     * The build destination directory.
     *
     * @property DIR_BUILD
     * @type String
     */
    DIR_DEST: './public'
};

module.exports = BuildConfig;
