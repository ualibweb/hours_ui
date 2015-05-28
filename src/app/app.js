angular.module('ualib.hours', [
    'ngAnimate',
    'ngResource',
    'ui.bootstrap',
    'angular.filter',
    'hours.common',
    'hours.templates',
    'hours.list'
])

.constant('HOURS_API_URL', '//wwwdev2.lib.ua.edu/libhours2/api/')

.controller('hoursCtrl', ['$scope', function hoursCtrl($scope){
    $scope.libID = 1;
}]);

// Temporary alias for hours module to not break dependencies not yet updated
angular.module('hours', ['ualib.hours']);


