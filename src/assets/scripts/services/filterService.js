define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    /**
     * The FilterService handles filtering/returning matching sets
     * of string data based upon a given input.
     *
     * @class LanguageFilterService
     * @constructor
     */
    var FilterService = function() {
    };

    var proto = FilterService.prototype;

    /**
     * Returns a filtered result based on the given input.
     *
     * @method filter
     * @param {Array<String>} filterData
     * @param {String} filterInput
     * @returns {Array}
     */
    proto.filter = function(filterData, filterInput) {
        if (!Array.isArray(filterData)) {
            return [];
        }

        return filterData.filter(this.match.bind(this, filterInput));
    };

    /**
     * Returns whether or not the input string matches
     * the compare string.
     *
     * @method match
     * @param {String} filterInput
     * @param {String} compareString
     * @returns {Boolean}
     */
    proto.match = function(filterInput, compareString) {
        // Replace special characters.
        filterInput = filterInput.replace(/[^a-zA-Z0-9#\+]/gi, '__');
        filterInput = filterInput.replace(/\+/g, '\\+');

        var regExp = new RegExp('^' + filterInput, 'i');
        return regExp.test(compareString);
    };

    return FilterService;
});
