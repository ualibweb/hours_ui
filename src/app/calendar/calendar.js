angular.module('hours.calendar', [])
    .constant('NUM_MONTHS', 6)

    .service('CalendarService', ['hoursFactory', '$rootScope', '$location', function(hoursFactory, $rootScope, $location){
        var self = this;
        var calData;
        this.cal = {
            lid: 0,
            month: 0,
            library: ''
        };

        // query the API resource to get all calendar data
        this.query = function(){
            // Using .query() instead of .get() since calendar resource is an Array
            // See "Returns" section of $resource Usage docs: https://code.angularjs.org/1.2.28/docs/api/ngResource/service/$resource#usage
            return hoursFactory.query({view: 'calendar'}, function(data){
                console.log(data);
                return data;
            }, function(data, status, headers, config) {
                console.log('Initial Error: ' + data);
            });
        };

        function paramsToService(){
            var params = $location.search();

        }

    }])
    .controller('CalendarCtrl', ['$scope', '$element', '$animate', '$location', 'CalendarService', function calendarCtrl($scope, $element, $animate, $location, CalendarService){
        var self = this; //Avoid scope conflicts in closure statements
        var calData = [];
        $scope.curMonth = 0;
        $scope.cal = CalendarService;

        /*$scope.cal.query()
            .$promise.then(function(data){
                $scope.calendar = data;
            });*/

        function paramsToScope(){
            $scope.cal.lid = $location.search('lid') || 0;
            $scope.cal.month = $location.search('month') || 0;
        }

        /*var spinner = angular.element('<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>');
        var elm = $element.find();
        $animate.enter(spinner, elm, angular.element(elm[0].lastChild));*/

        /*hoursFactory.query({view: 'calendar'},
            function(data){
                calData = data;
                $animate.leave(spinner);
            },
            function(msg){
                console.log(msg);
            });

        this.getCal = function(lid){
            lid = angular.isDefined(lid) ? (lid-1) : 0;
            var deferred = $q.defer();
            var cal = calData[lid];
            $animate.enter(spinner, elm, angular.element(elm[0].lastChild));

            $q.when(cal)
                .then(function(){
                    $scope.calendar.library = cal.library.name;
                    $scope.calendar.month = cal.cal[$scope.currMonth].month;
                    $scope.calendar.cal = cal.cal;
                })
        };*/



        /*hoursFactory.query({view: 'calendar'}, function(data) {
            console.log("Initial data loaded");
            $scope.calendar = data;
            $scope.processClasses(nMonths);
            $animate.leave(spinner);
            console.dir($scope.calendar);
        }, function(data, status, headers, config) {
            console.log('Initial Error: ' + data);
        });

        $scope.nextMonth = function(){
            if ($scope.curMonth < nMonths - 1)
                $scope.curMonth++;
        };
        $scope.prevMonth = function(){
            if ($scope.curMonth > 0)
                $scope.curMonth--;
        };
        //determine class for each day
        $scope.processClasses = function(numMonths){
            $scope.calendar.forEach(function(calendar){
                for (var m = 0; m < numMonths; m++)
                    for (var w = 0; w < 6; w++)
                        for (var d = 0; d < 7; d++){
                            var className = "";
                            var date = "";
                            var hours = "";
                            var exc = "";
                            var dayClass = "";
                            var day = calendar.cal[m].weeks[w][d];
                            if (typeof day.date != "undefined")
                                date = day.date;
                            if (typeof day.hours != "undefined")
                                hours = day.hours;
                            if ((typeof day.exc != "undefined") && (day.exc != null))
                                exc = day.exc;
                            if ((typeof day.today != "undefined") && (day.today))
                                dayClass = " today";

                            if ((date.length == 0) && (hours.length == 0))
                                className = "prev-month";
                            else
                            if ((date.length > 0) && (exc.length > 0) && (hours != 'Closed'))
                                className = "exception" + dayClass;
                            else
                            if ((date.length > 0) && (exc.length > 0) && (hours == 'Closed'))
                                className = "exception closed" + dayClass;
                            else
                            if ((date.length > 0) && (exc.length == 0) && (hours == 'Closed'))
                                className = "closed" + dayClass;
                            else
                            if ((date.length > 0) && (exc.length == 0) && (hours != 'Closed'))
                                className = dayClass;
                            else
                            if ((date.length == 0) && (hours.length > 0) && (exc.length > 0) && (hours != 'Closed'))
                                className = "next-month exception";
                            else
                            if ((date.length == 0) && (hours.length > 0) && (exc.length > 0) && (hours == 'Closed'))
                                className = "next-month exception closed";
                            else
                            if ((date.length == 0) && (hours.length > 0) && (exc.length == 0) && (hours == 'Closed'))
                                className = "next-month closed";
                            else
                            if ((date.length == 0) && (hours.length > 0) && (exc.length == 0) && (hours != 'Closed'))
                                className = "next-month";

                            calendar.cal[m].weeks[w][d].class = className;
                        }
            });
        };*/
    }])


    .directive('hoursCalendar', [function(){
        return {
            restrict: 'AC',
            templateUrl: 'calendar/calendar.tpl.html',
            controller: 'CalendarCtrl'
        }
    }])

    .directive('hoursCalendarDay', [function(){
        return {
            restrict: 'EC',
            replace: true,
            scope: {
                day: '@'
            },
            link: function(scope, elm){
                var styles = [];
                if (angular.isUndefined(scope.day.date)){
                    styles.push('not-current-month');
                }
                else if (scope.day.today){
                    styles.push('today');
                }
                if (angular.isDefined(scope.day.exec)){
                    styles.push('exception');
                }
                if (angular.isDefined(scope.day.hours) == 'Closed'){
                    styles.push('closed');
                }

                if (styles.length > 0){
                    var toAdd = styles.join(' ');
                    elm.addClass(toAdd);
                }
            }
        }
    }]);