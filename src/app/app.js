angular.module('ualib.hours', [
    'ngAnimate',
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
    'angular.filter',
    'uiGmapgoogle-maps',
    'hours.common',
    'hours.templates',
    'hours.list',
    'hours.calendar'
]);

// Temporary alias for hours module to not break dependencies not yet updated
angular.module('hours', ['ualib.hours']);


