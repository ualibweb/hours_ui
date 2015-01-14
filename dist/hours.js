angular.module('hours', [
    'ngAnimate',
    'ui.bootstrap',
    'hours.common',
    'hours.templates',
    'hours.list'
])

.constant('JSON_URL', 'https://wwwdev2.lib.ua.edu/libhours2/getJSON.php')


angular.module('hours.common', [
    'common.hours'
])
angular.module('common.hours', [])

    .factory('hoursFactory', ['$http', 'JSON_URL', function hoursFactory($http, url){
        return {
            getList: function(params){
                params = angular.isDefined(params) ? params : {};
                return $http({method: 'GET', url: url, params: params})
            }
        }
    }]);

/*angular.module('common.spinner', ['ngAnimate'])

    .value('spinners', {})

    .config(['$httpProvider', function($httpProvider){
        $httpProvider.interceptors.push('spinnerHttpInterceptor');
    }])

    .factory('spinnerHttpInterceptor', ['$rootScope', 'spinners', function($rootScope, spinners){
        function generateToken(config){
            return config.url + angular.toJson(config.params);
        }

        return {
            'request': function(config){
                var token = generateToken(config);
                config.resourceToken = token;
                if (angular.isUndefined(spinners[token])){
                    spinners[token] = true;
                }
                return config;
            },
            'response': function(config){
                if (spinners[config.resourceToken]){
                    for (var i = 0, len = spinners.length; i < len; i++){
                        if (spinners[i] === config.token){
                            spinners[i] = null;
                        }
                    }
                }
                return config;
            }
        }
    }])

    .directive('spinner', ['$animate', function($animate){
        return {
            restrict: 'AC',
            link: function(scope, elm, attrs){
                var spinner = angular.element('<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>');

                attrs.$observe('loaded', function(loaded){
                    console.log({loaded: loaded});
                    if (loaded) $animate.leave(spinner);
                    else $animate.enter(spinner, elm);
                })
            }
        }
    }])*/
angular.module('hours.list', [])

    .controller('ListCtrl', ['$scope', '$element', '$animate', 'hoursFactory', function ListCtrl($scope, $element, $animate, hoursFactory){
        var spinner = angular.element('<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>');
        var elm = $element.find('h2');
        $scope.hoursList = {};

        $animate.enter(spinner, elm, angular.element(elm[0].lastChild));

        hoursFactory.getList()
            .success(function(data){
                var list = setStatus(data.libraries)
                $scope.hoursList = list;
                $animate.leave(spinner);
            })
            .error(function(msg){
                console.log(msg);
            });

        function setStatus(hours){
            var h = [];

            for (var i = 0, len = hours.length; i < len; i++){
                var status = {
                    text: 'open',
                    css: 'text-success'
                };

                if (hours[i].timeLeft <= 7200){
                    if (hours[i].isOpen) status.text = 'closing soon';
                    else status.text = 'opening soon';
                    status.css = 'text-warning';
                }
                else if (!hours[i].isOpen){
                    status.text = 'closed';
                    status.css = 'text-danger';
                }

                hours[i].status = status;

                if (angular.isObject(hours[i].children)){
                    hours[i].children = setStatus(hours[i].children);
                }
                h.push(hours[i]);
            }
            return h;
        }


    }])

    .directive('hoursList', [function hoursList(){
        return {
            restrict: 'AC',
            controller: 'ListCtrl',
            templateUrl: 'list/list.tpl.html'
        }
    }]);