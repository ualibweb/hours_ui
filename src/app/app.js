angular.module('hours', [
    'ngAnimate',
    'ui.bootstrap',
    'hours.common',
    'hours.templates',
    'hours.list',
    'hours.calendar'
])

.constant('HOURS_API_URL', '/libhours2/getJSON.php')



