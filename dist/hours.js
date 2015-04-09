angular.module('hours', [
    'ngAnimate',
    'ui.bootstrap',
    'hours.common',
    'hours.templates',
    'hours.list',
    'hours.calendar'
])

.constant('HOURS_API_URL', '//wwwdev2.lib.ua.edu/libhours2/api/')




angular.module('hours.calendar', [])

    .controller('calendarCtrl', ['$scope', 'hoursFactory', function calendarCtrl($scope, hoursFactory){
        $scope.libID = 1;
        $scope.curMonth = 0;
        $scope.calendar = [];

        hoursFactory.getList("calendar")
            .success(function(data) {
                console.dir(data);
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
            })
            .error(function(data, status, headers, config) {
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
angular.module('hours.common', [
    'common.hours'
])
angular.module('common.hours', [])

    .factory('hoursFactory', ['$http', 'HOURS_API_URL', function hoursFactory($http, url){
        return {
            getList: function(request){
                return $http({method: 'GET', url: url + request, params : {}})
            }
        }
    }]);

angular.module('hours.list', [])

    .controller('ListCtrl', ['$scope', '$element', '$animate', 'hoursFactory', function ListCtrl($scope, $element, $animate, hoursFactory){
        var spinner = angular.element('<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>');
        var elm = $element.find('h2');
        $scope.hoursList = {};
        $scope.libID = 1;

        $animate.enter(spinner, elm, angular.element(elm[0].lastChild));

        hoursFactory.getList("today")
            .success(function(data){
                var list = setStatus(data.libraries);
                $scope.hoursList = list;
                $animate.leave(spinner);
            })
            .error(function(msg){
                console.log(msg);
            });

        function setStatus(hours){
            var h = [];

            for (var i = 0, len = hours.length; i < len; i++){
                var text = 'open';
                var css = 'label label';
                var status = {
                    text: text,
                    css: css+'-success'
                };

                if (hours[i].timeLeft <= 7200 && hours[i].timeLeft > 0){
                    if (hours[i].isOpen) status.text = 'closing soon';
                    else status.text = 'opening soon';
                    status.css = css+'-warning';
                }
                else if (!hours[i].isOpen){
                    status.text = 'closed';
                    status.css = css+'-danger';
                }

                hours[i].status = status;

                if (angular.isObject(hours[i].children)){
                    hours[i].children = setStatus(hours[i].children);
                }
                h.push(hours[i]);
            }
            return h;
        }

        $scope.selectLib = function(library){
            $scope.libID = library.id;
        };

    }])

    .directive('hoursList', [function hoursList(){
        return {
            restrict: 'AC',
            templateUrl: 'list/list.tpl.html',
            controller: 'ListCtrl'
        }
    }]);