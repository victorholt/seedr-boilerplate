define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    var $ = require('jquery');
    var searchTemplate = require('text!./searchTemplate.html');

    /**
     * The Search view class.
     *
     * @class SearchView
     * @constructor
     */
    var SearchView = function() {
        /**
         * The DOM element the component is attached too.
         *
         * @default null
         * @property $element
         * @type jQuery<HTMLObject>
         */
        this.$element = null;

        /**
         * Flag that checks whether or not this component
         * is currently enabled.
         *
         * @property isEnabled
         * @type Boolean
         */
        this.isEnabled = false;

        this.init();
    };

    var proto = SearchView.prototype;

    /**
     * Initializes all the view. This method should setup all
     * event handlers, children and layout manipulations. Once
     * everything has been setup it will promptly enable the
     * component.
     *
     * @method init
     * @returns {SearchView}
     * @private
     */
    proto.init = function() {
        this.setupEventHandlers()
            .setupChildren()
            .enable();

        return this;
    };

    /**
     * Links up the handlers to their events.
     *
     * @method setupEventHandlers
     * @returns {SearchView}
     * @private
     */
    proto.setupEventHandlers = function() {
        return this;
    };

    /**
     * Creates/assigns the children objects
     * of the component.
     *
     * @method setupChildren
     * @returns {SearchView}
     * @private
     */
    proto.setupChildren = function() {
        return this;
    };

    /**
     * Removes the children objects of the component.
     *
     * @method removeChildren
     * @returns {SearchView}
     * @private
     */
    proto.removeChildren = function() {
        return this;
    };

    /**
     * Handles updating the DOM elements.
     *
     * @method layout
     * @returns {SearchView}
     * @public
     */
    proto.layout = function() {
        if (this.$element == null) {
            this.$element = $('.searchView');
        }

        this.$element.html(searchTemplate);
        return this;
    };

    /**
     * Enables the component and all of the events.
     *
     * @method enable
     * @returns {SearchView}
     * @private
     */
    proto.enable = function() {
        return this;
    };

    /**
     * Disables the component and all events associated
     * with the component.
     *
     * @method disable
     * @returns {SearchView}
     * @private
     */
    proto.disable = function() {
        return this;
    };

    /**
     * Disables/removes all children objects created/assigned
     * by the component.
     *
     * @method destroy
     * @returns {SearchView}
     * @private
     */
    proto.destroy = function() {
        return this;
    };

    ///////////////////////////////////////////////////////////////////////////
    // EVENTS
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    // HELPERS
    ///////////////////////////////////////////////////////////////////////////

    return SearchView;
});
