'use strict';

var workflow = require('../controllers/workflow');

// The Package is past automatically as first parameter
module.exports = function(Workflow, app, auth, database) {

    app.get('/workflow/example/anyone', workflow.anyone);

    app.get('/workflow/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/workflow/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/workflow/example/render', function(req, res, next) {
        Workflow.render('index', {
            package: 'workflow'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};
