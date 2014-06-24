'use strict';

angular.module('mean.workflow').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('workflow example page', {
            url: '/workflow/example',
            templateUrl: 'workflow/views/index.html'
        });
    }
]);
