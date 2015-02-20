angular.module('common.hours', [])

    .factory('hoursFactory', ['$http', 'JSON_URL', function hoursFactory($http, url){
        return {
            getList: function(params){
                params = angular.isDefined(params) ? params : {};
                return $http({method: 'GET', url: url, params: params})
            },
            getCalendar: function(params){
                params = angular.isDefined(params) ? params : {calendar : 1};
                return $http({method: 'GET', url: url, params: params})
            }
        }
    }]);
