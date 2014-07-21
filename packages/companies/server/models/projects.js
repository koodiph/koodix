'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Stage Schema
 */
var ProjectSchema = new Schema({
    name: String,
    company: String,
    slug: String,
    description: String,
    tickets: [{

    }],
    workflows: {
        type: Schema.ObjectId,
        ref: 'Workflow'
    },
    created: {
        type: Date,
        default: Date.now
    }
});
    
mongoose.model('Project', ProjectSchema);