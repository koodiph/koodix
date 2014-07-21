'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Company Schema
 */
var CompanySchema = new Schema({ 
    // company name
    name: String,

    // company slug
    slug: String,

    // company owner
    owner: {
        type: Schema.ObjectId,
        ref: 'User'
    }, 
    
    projects: [{
        type: Schema.ObjectId,
        ref: 'Project'
    }],

    created: {
        type: Date,
        default: Date.now
    }

});   
/**
 * Statics
 */

CompanySchema.statics.load = function(id, cb) { 
    // this.findOne({
    //     _id: id
    // }).populate('teams.members', 'name username').exec(cb);

    this.findOne({_id: id })
        .populate('workflows')
        .exec(cb);
};
    
mongoose.model('Company', CompanySchema);