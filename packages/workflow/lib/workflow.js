// 'use strict';
// //main class
// var c = function() {
// 	this.__constructor.call(this);
// }, public = c.prototype; 

// //outside loader
// public.__load = c.load = function() {
// 	return new c();
// };

// //synthetic constructor
// public.__constructor = c.constructor = function() {

// }; 

// //public methods
// public.__anyone = c.anyone = function(req, res) {
// 	console.log('Yey!');
//     res.send('Anyone can access this');
// };

// //adapter
// module.exports = exports = c;