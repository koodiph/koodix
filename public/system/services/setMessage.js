'use strict';

//Global service for global variables
angular.module('mean.system').factory('Message', [
    function () {
        var setDebug = function(message) {
            console.log(typeof message);
            if (!message || typeof message !== 'object') {
                return message;
            }

            var result = '';
            $.each(message, function(key, value) {
                console.log(key + ': ' + value);
                result += key + ': ' + value + '\n';
            });

            return result;
        };

        return {
            set: function($scope, response) {
                $scope.customMessage = response.customMessage ? response.customMessage : null ;
                $scope.debug_message = setDebug(response.debug_message);

                $scope.dismiss = function(dismiss) {
                    $scope[dismiss] = null;
                };
                
                return $scope;
            }   
        };
    }
]);
