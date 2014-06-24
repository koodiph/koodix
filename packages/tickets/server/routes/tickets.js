'use strict';

// The Package is past automatically as first parameter
module.exports = function(Tickets, app, auth, database) {

    app.get('/tickets/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/tickets/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/tickets/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/tickets/example/render', function(req, res, next) {
        Tickets.render('index', {
            package: 'tickets'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};
