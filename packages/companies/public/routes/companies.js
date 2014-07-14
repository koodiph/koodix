'use strict';

angular.module('mean.companies').config(['$stateProvider',
    function($stateProvider) {

        // Check if the user is connected
        var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0') $timeout(deferred.resolve);

                // Not Authenticated
                else {
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        $stateProvider
	        .state('companies example page', {
	            url: '/companies/example',
	            templateUrl: 'companies/views/index.html'
	        })
            .state('create company', {
                url: '/companies/create',
            	templateUrl: 'companies/views/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('projects by company', {
                url: '/projects/:companyId',
                templateUrl: 'companies/views/projects/index.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('project', {
                url: '/companies/:companyId/:projectId',
                templateUrl: 'companies/views/projects/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });

    }
]);
