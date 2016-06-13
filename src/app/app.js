angular.module('ualib.hours', [
    'ngAnimate',
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
    'oc.lazyLoad',
    'angular.filter',
    'ngMap',
    'hours.common',
    'hours.templates',
    'hours.list',
    'hours.calendar'
])

    .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider){

    }]);

// Temporary alias for hours module to not break dependencies not yet updated
angular.module('hours', ['ualib.hours']);


