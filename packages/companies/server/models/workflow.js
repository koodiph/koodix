'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Team Schema
 */
var WorkflowSchema = new Schema({  
    name: String,
    company: String,
    stages: [{
        type: Schema.ObjectId,
        ref: 'Stage'
    }],
    flows: [{
        event_name: String,
        action: String
    }],
    created: {
        type: Date,
        default: Date.now
    }
});  

mongoose.model('Workflow', WorkflowSchema); 