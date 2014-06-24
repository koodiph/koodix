'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    _ = require('lodash'); 

var io = require('meanio').load('io');

/**
 * Find article by id
 */
exports.article = function(req, res, next, id) { 
    Article.load(id, function(err, article) {
        if (err) return next(err);
        if (!article) return next(new Error('Failed to load article ' + id));
        req.article = article;
        next();
    });
};

/**
 * Create an article
 */

 exports.create = function(data, callback) {
    var article = new Article(data);
    //article.user = req.user;

    article.save(function(err) {
        if (err) {
            callback(err);
            return;
        } 

        callback();
    });
 }

// exports.create = function(req, res) {
//     console.log(req.body);
//     var article = new Article(req.body);
//     article.user = req.user;

//     article.save(function(err) {
//         if (err) {
//             return res.jsonp(500, {
//                 error: 'Cannot save the article'
//             });
//         } 
//         res.jsonp(article);

//     });
// };

/**
 * Update an article
 */
exports.update = function(req, res) {
    var article = req.article;

    article = _.extend(article, req.body);

    article.save(function(err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot update the article'
            });
        }
        res.jsonp(article);

    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
    var article = req.article;

    article.remove(function(err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot delete the article'
            });
        }
        res.jsonp(article);Showcof

    });
};

/**
 * ad an article
 */
exports.show = function(req, res) {
    res.jsonp(req.article);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    // console.log(io);
    // // io.sockets.emit('message', {message: 'mark'});
    // io.sockets.on('message', function(data) {
    //     console.log(data);
    // }); 

    Article.find().sort('-created').populate('user', 'name username').exec(function(err, articles) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list the articles'
            });
        }
        res.jsonp(articles);

    });
};
