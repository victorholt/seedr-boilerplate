/* jshint ignore:start */
define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    require('bind-polyfill');
    var FilterService = require('./filterService');

    var filterService = null;
    var filterData = null;

    /**
     * Tests for our FilterService class.
     */

    // Describe our first case to match a programming language.
    describe('FilterService', function() {
        // Create our filter service.
        beforeEach(function() {
            filterService = new FilterService();
            filterData = [
                'Javascript',
                'C++',
                'C#',
                'Ruby',
                'Python',
                'PHP',
                'Perl',
                'Scala',
                'Java',
                'Go'
            ];
        });

        it('Matches programming languages', function() {
            expect(filterService.filter(filterData, 'Java').length).toBe(2);

            // This should fail...
            expect(filterService.filter(filterData, 'C').length).not.toBe(2);
        });
    });
});
