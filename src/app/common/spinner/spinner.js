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