angular.module('common.hours', [])

    .factory('hoursFactory', ['$http', 'JSON_URL', function hoursFactory($http, url){
        return {
            getList: function(request){
                return $http({method: 'GET', url: url + request, params : {}})
            }
        }
    }]);
