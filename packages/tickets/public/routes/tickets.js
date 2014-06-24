'use strict';

angular.module('mean.tickets').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('tickets example page', {
            url: '/tickets/example',
            templateUrl: 'tickets/views/index.html'
        });
    }
]);
