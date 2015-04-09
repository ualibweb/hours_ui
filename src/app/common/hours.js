angular.module('common.hours', [])

    .factory('hoursFactory', ['$http', 'HOURS_API_URL', function hoursFactory($http, url){
        return {
            getList: function(request){
                return $http({method: 'GET', url: url + request, params : {}})
            }
        }
    }]);
