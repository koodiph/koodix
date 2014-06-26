'use strict';

/**
 * Module dependencies.
 */
// var mongoose        = require('mongoose'),
    // WorkflowModel   = mongoose.model('Workflow'),
    // _               = require('lodash'); 

// var workflow        = require('../../lib/workflow');

// var c = function() {
    // this.__constructor.call(this);
// }, public = c.prototype; 

// public.__load = c.load = function() {
//     return new c();
// };

// public.__constructor = c.__constructor = function() {

// }; 

// module.exports = exports = _.extend(c, workflow);

exports.anyone = function(req, res) {
    // console.log('mark');
    // console.log(workflow);

    res.send('Anyone can access this');
};

// /**
//  * Find article by id
//  */
// exports.article = function(req, res, next, id) { 
//     WorkflowModel.load(id, function(err, article) {
//         if (err) return next(err);
//         if (!article) return next(new Error('Failed to load article ' + id));
//         req.article = article;
//         next();
//     });
// };

// /**
//  * Create an article
//  */

//  exports.create = function(data, callback) {
//     var article = new WorkflowModel(data);
//     //article.user = req.user;

//     article.save(function(err) {
//         if (err) {
//             callback(err);
//             return;
//         } 

//         callback();
//     });
//  }

// // exports.create = function(req, res) {
// //     console.log(req.body);
// //     var article = new WorkflowModel(req.body);
// //     article.user = req.user;

// //     article.save(function(err) {
// //         if (err) {
// //             return res.jsonp(500, {
// //                 error: 'Cannot save the article'
// //             });
// //         } 
// //         res.jsonp(article);

// //     });
// // };

// /**
//  * Update an article
//  */
// exports.update = function(req, res) {
//     var article = req.article;

//     article = _.extend(article, req.body);

//     article.save(function(err) {
//         if (err) {
//             return res.jsonp(500, {
//                 error: 'Cannot update the article'
//             });
//         }
//         res.jsonp(article);

//     });
// };

// /**
//  * Delete an article
//  */
// exports.destroy = function(req, res) {
//     var article = req.article;

//     article.remove(function(err) {
//         if (err) {
//             return res.jsonp(500, {
//                 error: 'Cannot delete the article'
//             });
//         }
//         res.jsonp(article);Showcof

//     });
// };

// /**
//  * ad an article
//  */
// exports.show = function(req, res) {
//     res.jsonp(req.article);
// };

// /**
//  * List of WorkflowModels
//  */
// exports.all = function(req, res) {
//     // console.log(io);
//     // // io.sockets.emit('message', {message: 'mark'});
//     // io.sockets.on('message', function(data) {
//     //     console.log(data);
//     // }); 

//     WorkflowModel.find().sort('-created').populate('user', 'name username').exec(function(err, articles) {
//         if (err) {
//             return res.jsonp(500, {
//                 error: 'Cannot list the articles'
//             });
//         }
//         res.jsonp(articles);

//     });
// };
