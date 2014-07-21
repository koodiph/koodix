'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Stage Schema
 */
var StageSchema = new Schema({  
    name: String,
    company: String,
    teams: [{
        type: Schema.ObjectId,
        ref: 'Team'
    }],
    created: {
        type: Date,
        default: Date.now
    }
});
    
mongoose.model('Stage', StageSchema);