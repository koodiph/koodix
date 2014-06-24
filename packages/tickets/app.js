'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Tickets = new Module('tickets');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Tickets.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Tickets.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Tickets.menus.add({
        title: 'tickets example page',
        link: 'tickets example page',
        roles: ['authenticated'],
        menu: 'main'
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Tickets.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Tickets.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Tickets.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Tickets;
});
