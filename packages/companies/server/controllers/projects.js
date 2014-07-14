'use strict';

/* Dependencies
-------------------------------*/
var Q           = require('q');
var mongoose    = require('mongoose');

/* Private Properties
-------------------------------*/
var Company     = mongoose.model('Company');
var Workflow    = mongoose.model('Workflow');
var Stage       = mongoose.model('Stage');
var Team        = mongoose.model('Team');
var User        = mongoose.model('User');
var Project     = mongoose.model('Project');
var ObjectId    = mongoose.Types.ObjectId;


/* Promises
-------------------------------*/
/**
 * Populates stages of the fetched project
 *
 * @param Object 
 * @return promise
 */
var populateStages = function(project) {
    var deferred = Q.defer();

    try {
        Stage.populate(project, {path: 'workflows.stages'}, function(err, project) {
            if (err) {
                console.log('populateStages was not fulfilled');
                deferred.reject({err: err, value: project});
            } else {
                console.log('populateStages is fulfilled');
                deferred.resolve(project);
            }
        });   
    } catch (err) {
        console.log('populateStages was not fulfilled');
        deferred.reject({value: project});
    }

    return deferred.promise;
};

/**
 * Populates teams of the fetched project
 *
 * @param Object 
 * @return promise
 */
var populateTeams = function(project) {
    var deferred = Q.defer();

    try {
        console.log('try');
        Team.populate(project, {path: 'workflows.stages.teams'}, function(err, project) {
            console.log(project);
            if (err) {
                console.log('populateTeams was not fulfilled');
                deferred.reject({err: err, value: project});
            } else {
                console.log('populateTeams is fulfilled');
                deferred.resolve(project);
            }
        });
    } catch (err) {
        console.log('catch');
        deferred.reject({value: project});
    }

    return deferred.promise;
};

/**
 * Populates team members of the fetched project
 *
 * @param Object 
 * @return promise
 */
var populateMembers = function(project) {
    var deferred = Q.defer();

    try {
        User.populate(project, {path: 'workflows.stages.teams.members'}, function(err, project) {
            if (err) {
                console.log('populateMembers was nott fulfilled');
                deferred.reject({err: err, value: project});
            } else {
                console.log('populateMembers is fulfilled');
                deferred.resolve(project);
            }
        });
    } catch (err) {
        console.log('populateMembers was not fulfilled');
        deferred.reject({value: project});
    }

    return deferred.promise;
};

/**
 * Creates the project
 *
 * @param Object 
 * @return promise
 */
var createProject = function(data) {
    console.log('createProject');

    // instantiate a deffered object
    var deferred = Q.defer();
    
    // prepare project data
    var project = { 
        _id: data.projectId,
        company: data.companyId,
        name: data.name,
        slug: data.slug,
        workflows: data.workflowId
    };

    // create the project
    Project.create(project, function(err, project) {
        if (err) {
            console.log('createProject was not fulfilled');
            deferred.reject({err: err, value: project});
        }

        if (!project) {
            console.log('createProject was not fulfilled');
            deferred.reject({err: 'Unknown error: Project.create callback didn\'t return a project object\n On function: createProject()'});
        } else {
            console.log('createProject is fulfilled');
            deferred.resolve(data);
        }
    });

    // return a deferred promise
    return deferred.promise;
};

/**
 * Find and updates the company for the newly added project
 *
 * @param Object 
 * @return promise
 */
var updateCompanyProject = function(data) {
    console.log('updateCompanyProject');

    // instantiate a deffered object
    var deferred = Q.defer();

    // find and update the company
    Company.findByIdAndUpdate(
        data.companyId,
        {$push: { 'projects': data.projectId }},
        { safe: true, upsert: true },
        function(err, company) {
            if (err) {
                console.log('updateCompanyProject was not fulfilled');
                deferred.reject({err: err, value: company});
            }

            if (!company) {
                console.log('updateCompanyProject was not fulfilled');
                deferred.reject({err: 'Unknown error: Can\'t find and update the company\n \tOn function: updateCompanyProject()'});
            } else {
                console.log('updateCompanyProject is fulfilled');
                deferred.resolve(company);
            }
        }
    );

    // return a deferred promise
    return deferred.promise;
};

/**
 * Populates the company's projects
 *
 * @param Object 
 * @return promise
 */
var populateCompanyProject = function(company) {
    console.log('getUpdatedCompany');

    // instantiate a deffered object
    var deferred = Q.defer();

    // populate company's projects
    Project.populate(company, {path: 'projects'}, function(err, company) {
        console.log(company);
        if (err) {
            console.log('populateCompanyProject was not fulfilled');
            deferred.reject({err: err, value: company});
        }

        if (!company) {
            console.log('populateCompanyProject was not fulfilled');
            deferred.reject({err: 'Unknown error: Can\'t populate the company\n \tOn function: populateCompanyProject()'});
        } else {
            deferred.resolve(company);
        }
    });

    // return a deferred promise
    return deferred.promise;
};


/* Route Callbacks
-------------------------------*/
/**
 * Finds the project by projectId and companyId
 *
 * @param Object
 * @param Object
 * @param function
 * @param string
 * @return void || callback
 */
exports.project = function(req, res, next, projectId) { 
    console.log('exports.project');
    var companyId = req.params.companyId;
    // instantiate a deffered object
    var deferred = Q.defer();
    // define the promise
    var findProject = deferred.promise;

    // find project by id, pre-populated with workflows
    Project.findOne({
        $and: [
            { '_id': projectId },
            { 'company': companyId }
        ]
    }).lean().populate('workflows').exec(function(err, project) {
        if (err) {
            console.log('findProject was not fulfilled');
            deferred.reject({err: err, value: project});
        }

        if (!project) {
            console.log('findProject was not fulfilled');
            deferred.reject({customMessage: 'Project was not found'});
        } else if (!project.workflows || typeof project.workflows !== 'object' ) {
            console.log('findProject was fulfilled');
            deferred.reject({value: project});
        } else {
            console.log('findProject is fulfilled');
            deferred.resolve(project);
        }
    });

    // start the queue
    findProject
        // then if findProject succeed, populate workflows->stages
        .then(populateStages)

        // then if populateStages succeed, populate workflows->stages->teams
        .then(populateTeams)

        // then if populateTeams succeed, populate workflows->stages->teams->members
        .then(populateMembers)

        // then if populateMembers succeed, append the project into the request object
        .then(function(value) {
            req.project = value;
            next();
        })

        // catch any errors from the queue
        .catch(function(details) {
            req.project                 = details.value         ? details.value         : {}; 
            req.project.debug_message   = details.err           ? details.err           : null;
            req.project.customMessage   = details.customMessage ? details.customMessage : null;
            next();
        });
};

/**
 * Creates a project
 *
 * @param Object
 * @param Object
 * @return void || callback
 */
exports.create = function(req, res) {
    console.log('exports.create');
    console.log(req.body);
    var data = {
        companyId : req.body.companyId,
        projectId : new ObjectId(),
        name: req.body.project.name, 
        slug: req.body.project.name.toLowerCase().replace(' ', '-'),
    };

    // instantiate a deffered object
    var deferred = Q.defer();

    // define the promise
    var findWorkflow = deferred.promise;

    // find a default workflow to use for this project
    Workflow.findOne({ 'company': data.companyId, }).exec(function(err, workflow) {
        if (err) {
            console.log('findWorkflow was not fulfilled');
            deferred.reject({err: err, value: workflow});
        }

        if (!workflow || typeof workflow !== 'object') {
            console.log('findWorkflow was not fulfilled');
            deferred.reject({err: 'Company has no default workflow'});
        } else {
            console.log('findWorkflow is fulfilled');
            data.workflowId = workflow._id;
            deferred.resolve(data);
        }
    });

    // start the queue
    findWorkflow
        // then if findWorkflow succeed, create the project
        .then(createProject)

        // then if createProject succed, update the company with the new project
        .then(updateCompanyProject)

        // then if updateCompanyProject succeed, populate the updated company
        .then(populateCompanyProject)

        // then if populateCompanyProject succeed, send the updated company
        .then(function(company) {
            console.log(company);
            res.jsonp(company);
        })

        //catch any errors from the queue
        .catch(function(details) {
            var data                    = details.value         ? details.value         : {};
            data.debug_message          = details.err           ? details.err           : null;
            req.project.customMessage   = details.customMessage ? details.customMessage : null;
            console.log(data);
            res.jsonp(data);
        });


};

/**
 * Shows a project from the req object
 *
 * @param Object
 * @param Object
 * @return void || callback
 */
exports.show = function(req, res) {
    console.log('exports.show');

    var s = require('util').inspect(req.project, { depth: null });
    console.log(s);

    res.jsonp(req.project);
};

/**
 * Lists projects per company
 *
 * @param Object
 * @param Object
 * @return void || callback
 */
exports.all = function(req, res) {
    console.log('exports.all');

    Company.findOne({ '_id': req.params.companyId })
        .lean()
        .populate('projects')
        .exec(function(err, company) {
            if (err) {
                console.log(err);
                return res.jsonp({debug_message: err});
            }

            if (!company) {
                return res.jsonp({customMessage: 'No company found'});
            }

            console.log(company);                
            res.jsonp(company);
        });
};