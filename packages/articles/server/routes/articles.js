'use strict';

var articles = require('../controllers/articles');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin && req.article.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(Articles, app, auth) {
    var io = arguments[4];

    io.on('connection', function(socket) { 
        console.log('A user has connected to the server.');  
        socket.broadcast.emit('message', {message: 'A user has connected to the server.'});

        //on create article
        socket.on('createArticle', function(data) {
            // article.create(data);
            console.log('Newly pushed article:');
            console.log(data);
            articles.create(data, function(err) {
                if(err) {
                    socket.broadcast.emit('onArticleCreated', {err: err});
                    return;
                }
                socket.broadcast.emit('onArticleCreated', data);
            });
             
        });

        //on update article
        socket.on('updateArticle', function(data) {
            // article.update(data);
            console.log(data);
            socket.broadcast.emit('onArticleUpdate', data); 
        });

        //on delete article
        socket.on('deleteArticle', function(data) {
            // article.update(data);
            console.log(data);
            socket.broadcast.emit('onArticleDelete', data); 
        });
    });

    app.route('/articles')
        .get(articles.all);
        // .post(auth.requiresLogin, articles.create);
    app.route('/articles/:articleId')
        .get(articles.show)
        .put(auth.requiresLogin, hasAuthorization, articles.update)
        .delete(auth.requiresLogin, hasAuthorization, articles.destroy);

    // Finish with setting up the articleId param
    app.param('articleId', articles.article);
};
