angular.module('hours.calendar', [])

    .controller('CalendarCtrl', ['$scope', '$location', '$filter', 'hoursFactory', '$rootScope', function CalendarCtrl($scope, $location, $filter, hoursFactory, $rootScope){
        var calData;
        $scope.cal;
        $scope.month;
        $scope.library;
        $scope.defHours;
        $scope.params = {
            lid: 1,
            month: 0,
            library: 'gorgas'
        };

        hoursFactory.get({view: 'calendar'})
            .$promise
            .then(function(data){
                paramsToService();
                calData = data.cal;
                processCalendar(calData);

                $scope.$on('$locationChangeSuccess', function(){
                    paramsToService();
                    processCalendar(calData);
                });
            }, function(data, status, headers, config) {
                console.log('Initial Error: ' + data);
            });

        $scope.getPrevMonth = function(){
            var mid = parseInt($scope.params.month) - 1;
            if (mid < 0) mid = 0;
            $location.search('month', mid);
        };

        $scope.getNextMonth = function(){
            var mid = parseInt($scope.params.month) + 1;
            if (mid > 5) mid = 5;
            $location.search('month', mid);
        };

        function processCalendar(cal){
            var lid;
            var library;
            var thisMonth;
            var defHours;

            cal = $filter('filterBy')(cal, ['library.name'], $scope.params.library);

            lid = cal[0].library.lid;
            library = cal[0].library.name;
            thisMonth = cal[0].calendar[$scope.params.month];
            defHours = cal[0].defaultHours;

            $scope.params.lid = lid;
            $scope.library = library;
            $scope.cal = getCalStyles(thisMonth);
            $scope.defHours = defHours;
            $rootScope.$broadcast('hoursLoaded');
        }


        function paramsToService(){
            var params = $location.search();
            var _scope = $scope.params;
            for (var prop in params){
                if (_scope.hasOwnProperty(prop)){
                    _scope[prop] = params[prop];

                }
            }
            $scope.params = _scope;
        }

        function getCalStyles(month){
            for (var i = 0, len = month.weeks.length; i < len; i++){
                for (var x = 0, l = month.weeks[i].length; x < l; x++){
                    var css = [];
                    if (month.weeks[i][x].hasOwnProperty('today')){
                        css.push('today');
                    }
                    if (!month.weeks[i][x].hasOwnProperty('date')){
                        css.push('not-current-month');
                    }
                    if (month.weeks[i][x].hoursTo === 'Closed'){
                        css.push('closed');
                    }
                    if (month.weeks[i][x].hasOwnProperty('exc')){
                        css.push('exception');
                    }
                    month.weeks[i][x].css = css.join(' ');
                }
            }
            return month;
        }
    }])


    .directive('hoursCalendar', [function(){
        return {
            restrict: 'AC',
            templateUrl: 'calendar/calendar.tpl.html',
            controller: 'CalendarCtrl'
        }
    }]);