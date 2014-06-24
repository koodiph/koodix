'use strict';

angular.module('mean.workflow').controller('WorkflowController', ['$scope', 'Global', 'Workflow',
    function($scope, Global, Workflow) {
        $scope.global = Global;
        $scope.package = {
            name: 'workflow'
        };
    }
]);
