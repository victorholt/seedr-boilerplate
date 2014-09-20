define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    var $ = require('jquery');
    var searchTemplate = require('text!./searchTemplate.html');
    var FilterService = require('./../../services/filterService');

    var DEMO_LANGUAGE_LIST_SELECTOR = '.demoLanguageList';
    var SEARCH_INPUT_SELECTOR = '.searchInput';
    var DEFAULT_SEARCH_TEXT = 'Enter Programming Language...';

    var ESC_KEY = 27;
    var ENT_KEY = 13;
    var TAB_KEY = 9;

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

        /**
         * This list of valid programming language values.
         *
         * @default []
         * @property programmingLanguageList
         * @type Array
         */
        this.programmingLanguageList = [];

        /**
         * The current input value entered.
         *
         * @default ''
         * @property currentInputValue
         * @type String
         */
        this.currentInputValue = '';

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
            .setupChildren();

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
        this.focusInputHandler = this.onFocusInputEvent.bind(this);
        this.blurInputHandler = this.onBlurInputEvent.bind(this);
        this.keyDownHandler = this.onKeyDownEvent.bind(this);
        this.keyUpHandler = this.onKeyUpEvent.bind(this);

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
        this.filterService = new FilterService();

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
        this.$inputElement = $(SEARCH_INPUT_SELECTOR);

        this.buildProgrammingLanguageList()
            .enable();

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
        if (this.isEnabled) {
            return this;
        }

        if (this.$inputElement != null) {
            this.$inputElement.on('focus', this.focusInputHandler)
                              .on('blur', this.blurInputHandler)
                              .on('keydown', this.keyDownHandler)
                              .on('keyup', this.keyUpHandler);
        }

        this.isEnabled = true;
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
        if (!this.isEnabled) {
            return this;
        }

        if (this.$inputElement != null) {
            this.$inputElement.off('focus', this.focusInputHandler)
                              .off('blur', this.blurInputHandler)
                              .off('keydown', this.keyDownHandler)
                              .off('keyup', this.keyUpHandler);
        }

        this.isEnabled = false;
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
        this.filterService = null;

        return this;
    };

    ///////////////////////////////////////////////////////////////////////////
    // EVENTS
    ///////////////////////////////////////////////////////////////////////////

    /**
     * This event handles when the search input has initially been
     * focused on.
     *
     * @method onFocusInputEvent
     * @param {jQuery<Event>} event
     * @returns {void}
     */
    proto.onFocusInputEvent = function(event) {
        event.stopPropagation();

        // Immediately remove the default text in place.
        if (this.currentInputValue === '') {
            this.$inputElement.html('');
        }
    };

    /**
     * This event handles when the search input has been
     * blurred.
     *
     * @method onBlurInputEvent
     * @param {jQuery<Event>} event
     * @returns {void}
     */
    proto.onBlurInputEvent = function(event) {
        event.stopPropagation();

        // Add back in the default text.
        if (this.currentInputValue === '') {
            this.$inputElement.html(DEFAULT_SEARCH_TEXT);
        } else {
            // Trim the string.
            this.currentInputValue = this.currentInputValue.replace(/^\s+|\s+$/gm,'');
            this.$inputElement.html(this.currentInputValue);
        }
    };

    /**
     * This event handles when a key down has been initiated on
     * the input element.
     *
     * @method onKeyDownEvent
     * @param {Event} event
     * @returns {void}
     */
    proto.onKeyDownEvent = function(event) {
        event.stopPropagation();

        // Prevent the enter, escape, and tab keys.
        if (event.keyCode === ESC_KEY ||
            event.keyCode === ENT_KEY ||
            event.keyCode === TAB_KEY) {
            return;
        }
    };

    /**
     * This event handles when a key up has been initiated on
     * the input element.
     *
     * @method onKeyUpEvent
     * @param {Event} event
     * @returns {void}
     */
    proto.onKeyUpEvent = function(event) {
        event.preventDefault();

        // Set the current input value.
        this.currentInputValue = this.$inputElement.text();
        this.highlightList();
    };

    ///////////////////////////////////////////////////////////////////////////
    // HELPERS
    ///////////////////////////////////////////////////////////////////////////

    /**
     * Builds the programming language list based on the
     * demo language list values.
     *
     * @method buildProgrammingLanguageList
     * @returns {SearchView}
     * @private
     */
    proto.buildProgrammingLanguageList = function() {
        var $languageListElement = $(DEMO_LANGUAGE_LIST_SELECTOR);
        var searchView = this;

        $languageListElement.find('li').each(function() {
            searchView.programmingLanguageList.push($(this).html());
        });

        return this;
    };

    /**
     * Highlight the list items when they partially match
     * the input value.
     *
     * @method highlightList
     * @returns {SearchView}
     * @private
     */
    proto.highlightList = function() {
        var matches = this.filterService.filter(this.programmingLanguageList,
                                                this.currentInputValue);
        // Remove all currently highlighted items.
        $(DEMO_LANGUAGE_LIST_SELECTOR).find('li')
                                      .removeClass('demoListHighlight');

        // Highlight the matches.
        if (this.currentInputValue.length > 0) {
            $(DEMO_LANGUAGE_LIST_SELECTOR).find('li').each(function() {
                var programmingLanguage = $(this).html();
                if (matches.indexOf(programmingLanguage) !== -1) {
                    $(this).addClass('demoListHighlight');
                }
            });
        }

        return this;
    };

    return SearchView;
});
