angular.module('hours.calendar', [])

    .controller('calendarCtrl', ['$scope', 'hoursFactory', function calendarCtrl($scope, hoursFactory){
        $scope.libID = 1;
        $scope.curMonth = 0;
        $scope.calendar = [];

        // Use $resource().query() because calendar is returns as array
        // See "Returns" section of $resource usage docs: https://code.angularjs.org/1.3.15/docs/api/ngResource/service/$resource#usage
        hoursFactory.query({view: 'calendar'},
            function(data) {
                //console.dir(data);
                $scope.calendar = data;
                //determine class for each day
                $scope.calendar.forEach(function(calendar){
                    for (var m = 0; m < 6; m++)
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
            },
            function(data, status, headers, config) {
                console.log(data);
            });

        $scope.nextMonth = function(){
            if ($scope.curMonth < 5)
                $scope.curMonth++;
        };
        $scope.prevMonth = function(){
            if ($scope.curMonth > 0)
                $scope.curMonth--;
        };
    }])

    .directive('hoursCalendar', [function(){
    return {
        restrict: 'AC',
        templateUrl: 'calendar/calendar.tpl.html',
        controller: 'calendarCtrl'
    }
}])