'use strict';

var express = require('express'),
    io      = require('socket.io'),
    appPath = process.cwd();

var mean = require('meanio');
mean.app('Mean Demo App', {});

module.exports = function(passport, db) {

    function bootstrapModels() {
        // Bootstrap models
        require('meanio/lib/util').walk(appPath + '/server', 'model', null, function(path) {
            require(path);
        });
    }

    bootstrapModels();

    // Bootstrap passport config
    require(appPath + '/server/config/passport')(passport);

    function bootstrapDependencies() {
        // Register passport dependency
        mean.register('passport', function() {
            return passport;
        });

        // Register auth dependency
        mean.register('auth', function() {
            return require(appPath + '/server/routes/middlewares/authorization');
        });

        // Register database dependency
        mean.register('database', {
            connection: db
        });

        // Register app dependency
        mean.register('app', function() {
            return app;
        });

        // Register app dependency
        mean.register('io', function() {
            return io;
        });
    }

    bootstrapDependencies();

    // Express settings
    var app = express(); 
    require(appPath + '/server/config/express')(app, passport, db);
    io = io(app.listen(3000));    

    return io;
};