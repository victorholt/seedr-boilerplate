define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    require('bind-polyfill');

    var $ = require('jquery');
    var DemoView = require('./components/demo/demoView');

    /**
     * The App class acts as the core bootstrap class for
     * starting up the different modules available to the
     * application.
     *
     * @class App
     * @constructor
     */
    var App = function() {
        /**
         * The views of the application.
         *
         * @property views
         * @type {object}
         */
        this.views = {};

        // Initialize our application.
        this.init();
    };

    var proto = App.prototype;

    /**
     * Initialize the application.
     *
     * @method init
     * @returns {App}
     * @private
     */
    proto.init = function() {
        this.setupChildren();

        return this;
    };

    /**
     * Creates/assigns the children objects
     * of the application.
     *
     * @method setupChildren
     * @returns {App}
     * @private
     */
    proto.setupChildren = function() {
        var $element = $('.app-view');
        this.addView('DemoView', new DemoView($element));
        return this;
    };

    ///////////////////////////////////////////////////////////////////////////
    // HELPERS
    ///////////////////////////////////////////////////////////////////////////

    /**
     * Adds a view to the application.
     *
     * @method addView
     * @params {String} viewName
     * @params {object} view
     * @returns {App}
     */
    proto.addView = function(viewName, view) {
        if (this.views[viewName] != null) {
            view = null;
            return this;
        }

        this.views[viewName] = view;
        return this;
    };

    return App;
});
