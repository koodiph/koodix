'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Team Schema
 */
var TeamSchema = new Schema({
    name: String, 
    members: [{ 
        type: Schema.ObjectId, 
        ref: 'User' 
    }]
});

mongoose.model('Team', TeamSchema);

/**
 * Workflow Schema
 */
var WorkflowSchema = new Schema({ 
    stages: [{
        name: String,
        teams: [{ 
            type: Schema.ObjectId, 
            ref: 'Team' 
        }], 
    }],
    flows: [{
        event_name: String,
        action: String
    }] 
}); 

mongoose.model('Workflow', WorkflowSchema);

/**
 * Validations
 */
// WorkflowSchema.path('title').validate(function(title) {
//     return !!title;
// }, 'Title cannot be blank');

// WorkflowSchema.path('content').validate(function(content) {
//     return !!content;
// }, 'Content cannot be blank');

/**
 * Statics
 */
// WorkflowSchema.statics.load = function(id, cb) {
//     this.findOne({
//         _id: id
//     }).populate('user', 'name username').exec(cb);
// };

