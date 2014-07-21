'use strict';

angular.module('mean.companies').factory('Projects', ['$resource',
    function($resource) {
		//return $resource('uri', {}, {});
		return $resource(
			'projects/:companyId/:projectId', 

			{ 
				companyId: '@companyId',
				projectId: '@projectId'
			},

			{
				update: { method: 'PUT' }
			}
		);
    }
]);
