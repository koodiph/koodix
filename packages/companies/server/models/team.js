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
    company: String,
    members: [{ 
        type: Schema.ObjectId, 
        ref: 'User' 
    }],
    created: {
        type: Date,
        default: Date.now
    }
});
    
mongoose.model('Team', TeamSchema); 