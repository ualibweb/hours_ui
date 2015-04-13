angular.module('hours.calendar', [])
    .constant('NUM_MONTHS', 6)

    .controller('calendarCtrl', ['$scope', '$element', '$animate', 'hoursFactory', 'NUM_MONTHS',
        function calendarCtrl($scope, $element, $animate, hoursFactory, nMonths){
        $scope.curMonth = 0;
        $scope.calendar = [];
        var spinner = angular.element('<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>');
        var elm = $element.find('h2');
        $animate.enter(spinner, elm, angular.element(elm[0].lastChild));

        hoursFactory.getList("calendar/initial")
            .success(function(data) {
                console.log("Initial data loaded");
                $scope.calendar = data;
                $scope.processClasses(2);
                hoursFactory.getList("calendar")
                    .success(function(data) {
                        $scope.calendar = data;
                        $scope.processClasses(nMonths);
                        $animate.leave(spinner);
                        console.dir($scope.calendar);
                    })
                    .error(function(data, status, headers, config) {
                        console.log('Error: ' + data);
                    });
            })
            .error(function(data, status, headers, config) {
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
        };
    }])

    .directive('hoursCalendar', [function(){
    return {
        restrict: 'A',
        templateUrl: 'calendar/calendar.tpl.html',
        controller: 'calendarCtrl'
    }
}])