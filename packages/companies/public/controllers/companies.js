'use strict';

angular.module('mean.companies').controller('CompaniesController', ['$scope', '$state', '$stateParams', '$location', 'Global', 'Companies',
    function($scope, $state, $stateParams, $location, Global, Companies) {
        $scope.global = Global;

        $scope.package = { name: 'companies' }; 

        $scope.company = {};

        $scope.createProject = false;

        $scope.create = function(isValid) {
            console.log('$scope.create');
            if (isValid) { 
                //set company properties to the request body
                var company = new Companies({ name: this.name }); 

                //call an ajax that saves the company on the server-side
                company.$save(function(company) {    
                    console.log('function create() logs:');
                    console.log(company);

                    $state.go('projects by company', { companySlug: company.slug });
                });

                this.name = ''; 
            } else {
                $scope.submitted = true;
            }
        };

        $scope.findOne = function() {
            var companySlug = $stateParams.companySlug ? $stateParams.companySlug : '';

            // get it from the server api
            Companies.get({
                companySlug: companySlug
            }, function(response) {
                if (response) {
                    console.log('found in the server');
                    $scope.company = response;
                    console.log($scope.company);
                } else {
                    $state.go('create company');
                }
            });
        };


    }
]);
