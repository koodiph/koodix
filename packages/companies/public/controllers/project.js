'use strict';

angular.module('mean.companies').controller('ProjectsController', ['$scope', '$state', '$stateParams', '$location', 'Global', 'Projects', 'Message',
    function($scope, $state, $stateParams, $location, Global, Projects, Message) {
        $scope.global = Global;

        $scope.package = { name: 'projects' }; 

        $scope.projects = {};

        $scope.showForm = false;

        $scope.contentClass = 'with-sidebar';

        $scope.sidebar = true;

        $scope.toogleCreateProjectForm = function() {
            console.log('mark');
            $scope.showForm = $scope.showForm === false;
        };

        $scope.create = function() {
            var companyId = $stateParams.companyId ? $stateParams.companyId : '';

            //set company properties to the request body
            var project = new Projects({
                companyId: companyId,
                project : {
                    name: this.projectName    
                }
            }); 

            //call an ajax that saves the company on the server-side
            project.$save(function(response) {  
                console.log(response);
                $scope.company = response; 
                $scope.debug_message = response.debug_message ? response.debug_message : null;
                console.log('function create() logs:');
                console.log($scope.company);

                // $state.go('project', { companySlug: company.data.slug, projectId: company.projectId });
            });

            $scope.projectName = '';
            $scope.showForm = false;
        };
        
        $scope.find = function() { 
            console.log('$scope.find()');
            console.log($stateParams);
            var companyId = $stateParams.companyId ? $stateParams.companyId : '';

            // send get request to the server api
            Projects.get({
                companyId: companyId,
            }, function(response) {
                if (response) {
                    console.log($scope.company);
                    $scope.company = response;
                    $scope = Message.set($scope, response);
                }
            });
        };

        $scope.findOne = function() {
            console.log('$scope.findOne()');
            var companyId = $stateParams.companyId ? $stateParams.companyId : '';
            var projectId = $stateParams.projectId ? $stateParams.projectId : '';

            // get it from the server api
            Projects.get({
                companyId: companyId,
                projectId: projectId
            }, function(response) {
                if (response) {
                    $scope.project = response;
                    $scope = Message.set($scope, response);
                    console.log($scope.project);
                } else {
                    $state.go('projects by company');
                }
            });
        };

        $scope.toggleSidebar = function() {
            $scope.contentClass = $scope.contentClass === 'with-sidebar' ? 'without-sidebar' : 'with-sidebar';
            $scope.sidebar = $scope.sidebar !== true;
        };
    }
]);
