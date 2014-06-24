'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Workflow = new Module('workflow');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Workflow.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Workflow.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Workflow.menus.add({
        title: 'workflow example page',
        link: 'workflow example page',
        roles: ['authenticated'],
        menu: 'main'
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Workflow.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Workflow.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Workflow.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Workflow;
});
