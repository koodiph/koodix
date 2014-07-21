'use strict';

var projects = require('../controllers/projects');

// The Package is past automatically as first parameter
module.exports = function(Companies, app, auth, database) { 

    // app.route('/projects')
    //     .post(auth.requiresLogin, projects.create);

    app.route('/projects/:companyId')
        .get(projects.all)
        .post(auth.requiresLogin, projects.create);

    app.route('/projects/:companyId/:projectId')
        .get(projects.show);

    // app.route('/projects/:companySlug')
    //     .get(projects.show);
        // .put(auth.requiresLogin, hasAuthorization, projects.update)
        // .delete(auth.requiresLogin, hasAuthorization, projects.destroy);

    app.param('projectId', projects.project);

};
