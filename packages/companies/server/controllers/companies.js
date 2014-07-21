'use strict';

/**
 * Module dependencies.
 */
var mongoose    = require('mongoose'),
    Company     = mongoose.model('Company'),
    Team        = mongoose.model('Team'), 
    Stage       = mongoose.model('Stage'), 
    Workflow    = mongoose.model('Workflow'), 
    ObjectId    = mongoose.Types.ObjectId;


/**
 * Find company by id
 */
exports.company = function(req, res, next, slug) { 
    Company.findOne({ slug: slug }).lean().exec(function(err, company) {
        if (err) {
            return next(err);
        }
        if (!company) {
            return next(new Error('Failed to load company ' + slug));
        }

        console.log(company);

        req.company = company;
        next();
    });
};

/**
 * Create a company
 */
exports.create = function(req, res) {
    // company id
    var companyId = new ObjectId();

    // set default company teams  
    var teamIds = [new ObjectId(), new ObjectId(), new ObjectId(), new ObjectId()];

    var teams = [
        { _id: teamIds[0], company: companyId, name: 'Developers' },
        { _id: teamIds[1], company: companyId, name: 'QA' },
        { _id: teamIds[2], company: companyId, name: 'Project Managers' },
        { _id: teamIds[3], company: companyId, name: 'Client' }
    ]; 

    Team.create(teams, function(err, docs) {
        var stageIds = [new ObjectId(), new ObjectId(), new ObjectId()];
        var stages = [
            { _id: stageIds[0], company: companyId, name: 'Development', teams: teamIds },
            { _id: stageIds[1], company: companyId, name: 'Staging', teams: teamIds },
            { _id: stageIds[2], company: companyId, name: 'Production', teams: teamIds },
        ];

        Stage.create(stages, function(err, docs) {
            var workflowId = new ObjectId();
            var workflows = [{ 
                _id: workflowId,
                company: companyId,
                name: 'Default Workflow',
                stages: stageIds
            }];

            Workflow.create(workflows, function(err, docs) {
                var company = {
                    _id: companyId,
                    name: req.body.name,
                    slug: req.body.name.toLowerCase().replace(' ', '-'),
                    owner: req.user
                };

                Company.create(company, function(err, docs) {
                    if (err) {
                        //console.log(err);
                        return res.jsonp(500, {
                            error: 'Cannot save the company'
                        });
                    } 
                    res.jsonp(company); 

                });
            });

        });

    });
}; 

/**
 * Get company by slug
 */
exports.show = function(req, res) {
    res.jsonp(req.company);

    // // fetch the company pre populated with workflows and owner
    // Company.find({ slug: slug }).lean().populate('projects.workflows owner').exec(function(err, company) {
    //     console.log(company);
    //     // if there is no company
    //     if (company.length && company[0].projects.length && company[0].projects[0].workflows.length) {

    //         // if there is no workflows->stages
    //         if (!company[0].projects[0].workflows[0].stages.length) {
    //             // dont waste time populating workflow->stages
    //             return res.jsonp({ message: 'No Stages to populate', data: company });
    //         }

    //         // populate the workflows->stages
    //         Stage.populate(company, {path: 'projects.workflows.stages'}, function(err, company) {
    //             // if there is no stages->teams
    //             if (!company[0].projects[0].workflows[0].stages[0].teams.length) {
    //                 // dont waste time populating stages->teams
    //                 return res.jsonp({ message: 'No teams to populate', data: company });
    //             }

    //             // populate stages->teams
    //             Team.populate(company, {path: 'projects.workflows.stages.teams'}, function(err, company) {
    //                 // if there is no teams->members
    //                 if (!company[0].projects[0].workflows[0].stages[0].teams[0].members.length) {
    //                     // dont waste time populating teams->members
    //                     return res.jsonp({ message: 'No members to populate', data: company });
    //                 }

    //                 // set populate options for teams->members
    //                 var opts = {
    //                   path: 'projects.workflows.stages.teams.members',
    //                   select: 'name'
    //                 };

    //                 // populate teams->members
    //                 User.populate(company, opts, function(err, company) {
    //                     // if there is an error
    //                     if (err) {
    //                         // return the json response containing the error
    //                         return res.jsonp({ message: err, data: company });
    //                     }
    //                     console.log(company);

    //                     // send a json response containing the fully populated company
    //                     res.jsonp({ message: 'Success', data: company });
    //                 });      

    //             });
    //         });
    //     } else {
    //         // return a json response
    //         return res.jsonp({ data: company });
    //     }

    // });

};


/**
 * Update an article
 */
exports.update = function(req, res) {
    console.log(req.body);
    var companyId = req.body.company;
    var projectId = new ObjectId();

    Workflow.findOne({ company: companyId}).exec(function(err, workflow) {
        Company.findByIdAndUpdate(
            companyId,
            {$push: {
                    'projects': { 
                        _id: projectId,
                        name: req.body.project.name, 
                        slug: req.body.project.name.toLowerCase().replace(' ', '-'),
                        workflows: [workflow._id],
                    }
            }},
            { safe: true, upsert: true },
            function(err, company) {
                console.log(workflow);
                if (err) {
                    return res.jsonp(500, {
                        error: 'Cannot update the article'
                    });
                }
                res.jsonp({ data: company, projectId: projectId});
            }
        );
    });

    // var article = req.article;

    // article = _.extend(article, req.body);

    // article.save(function(err) {
    //     if (err) {
    //         return res.jsonp(500, {
    //             error: 'Cannot update the article'
    //         });
    //     }
    //     res.jsonp(article);

    // });
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
        res.jsonp(article);

    });
};

/**
 * List of Companys
 */
exports.all = function(req, res) {
    // console.log(io);
    // // io.sockets.emit('message', {message: 'mark'});
    // io.sockets.on('message', function(data) {
    //     console.log(data);
    // }); 

    Company.find().sort('-created').populate('user', 'name username').exec(function(err, articles) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list the articles'
            });
        }
        res.jsonp(articles);

    });
};
