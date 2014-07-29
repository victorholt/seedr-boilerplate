require(
/**
 * This script kickstarts our RequireJS application. This will act
 * as an entry-point to all of our components for the application.
 */
[
    './app'
],
function(App) {
    'use strict';

    // Startup our application.
    window.app = new App();
});
