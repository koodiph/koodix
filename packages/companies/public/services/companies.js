'use strict';

angular.module('mean.companies').factory('Companies', ['$resource',
    function($resource) {
		//return $resource('uri', {}, {});
		return $resource(
			'companies/:companySlug', 

			{ companySlug: '@companySlug' },

			{
				update: { method: 'PUT' }
			}
		);
    }
]);
