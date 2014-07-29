/**
 * RequireJS configuration file.
 *
 * The RequireJS configurations should be declared in this file. Paths to
 * libraries (custom and vendors) should be specified including their shims.
 */

require.config({
    paths: {
        'requirejs': './../vendors/requirejs/require',
        'jquery': './../vendors/jquery/dist/jquery.min'
    },

    shim: {

    },

    waitSeconds: 60
});
