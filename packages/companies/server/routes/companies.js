'use strict';

var companies = require('../controllers/companies');
// The Package is past automatically as first parameter
module.exports = function(Companies, app, auth, database) { 

    app.route('/companies')
        .get(companies.all)
        .post(auth.requiresLogin, companies.create);

    app.route('/companies/:companySlug')
        .get(companies.show);
        // .put(auth.requiresLogin, hasAuthorization, companies.update)
        // .delete(auth.requiresLogin, hasAuthorization, companies.destroy);

    // app.param('companySlug', companies.company);
};
