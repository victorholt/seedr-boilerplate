define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    /**
     * The Demo view class.
     *
     * @class DemoView
     * @param {jQuery<HTMLObject>} $element
     * @constructor
     */
    var DemoView = function($element) {
        /**
         * The DOM element the component is attached too.
         *
         * @property $element
         * @type jQuery<HTMLObject>
         */
        this.$element = $element;

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

    var proto = DemoView.prototype;

    /**
     * Initializes all the view. This method should setup all
     * event handlers, children and layout manipulations. Once
     * everything has been setup it will promptly enable the
     * component.
     *
     * @method init
     * @returns {DemoView}
     * @private
     */
    proto.init = function() {
        this.setupEventHandlers()
            .setupChildren()
            .setupLayout()
            .enable();

        return this;
    };

    /**
     * Links up the handlers to their events.
     *
     * @method setupEventHandlers
     * @returns {DemoView}
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
     * @returns {DemoView}
     * @private
     */
    proto.setupChildren = function() {
        return this;
    };

    /**
     * Removes the children objects of the component.
     *
     * @method removeChildren
     * @returns {DemoView}
     * @private
     */
    proto.removeChildren = function() {
        return this;
    };

    /**
     * Handles any manipulate of the component element.
     *
     * @method setupLayout
     * @returns {DemoView}
     * @private
     */
    proto.setupLayout = function() {
        this.$element.html('The demo application has been initialized!');

        return this;
    };

    /**
     * Enables the component and all of the events.
     *
     * @method enable
     * @returns {DemoView}
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
     * @returns {DemoView}
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
     * @returns {DemoView}
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

    return DemoView;
});
