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
angular.module('hours.common', [
    'common.hours'
])
angular.module('common.hours', [])

    .factory('hoursFactory', ['$resource', function($resource){
        return $resource("//wwwdev2.lib.ua.edu/libhours2/api/:view", {cache: true});
    }]);

angular.module('ualib.hours')

    .config(['$routeProvider', 'uiGmapGoogleMapApiProvider', function($routeProvider, uiGmapGoogleMapApiProvider) {
        $routeProvider
            .when('/hours', {
                reloadOnSearch: false,
                templateUrl: 'hours-locations/hours-locations.tpl.html',
                controller: 'HoursLocationsCtrl'
            });

        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyCdXuKwZiDx5W2uP8plV5d-o-jLQ5UQtIQ',
            mid: 'z4A8-271j5C8.kowwE312jycE',
            v: '3.17',
            libraries: ''
        });
    }])


    .controller('HoursLocationsCtrl', ['$scope', '$location', 'uiGmapIsReady', 'uiGmapGoogleMapApi', function($scope, $location, uiGmapIsReady, uiGmapGoogleMapApi){
        $scope.center;
        $scope.mapOpts = {
            mapTypeControl: false
        };
        $scope.loc = [
            {
                id: 1,
                name: "Gorgas Library",
                latitude: 33.211803,
                longitude: -87.546032,
                icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
                contact: {
                    phone: [{
                            number: '(205) 348-6047',
                            dept:   'Reference'
                        },
                        {
                            number: '(205) 348-9748',
                            dept: 'Circulation'
                        }],
                    email: 'gorgasinfo@ua.edu'
                },
                link: '/libraries/gorgas/'
            },
            {
                id: 2,
                name: "Bruno Business Library",
                latitude: 33.211107,
                longitude: -87.549255,
                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                contact: {
                    phone: [{
                        number: '(205) 348-1090',
                        dept:   'Reference'
                    },
                        {
                            number: '(205) 348-1086',
                            dept: 'Circulation'
                        },
                        {
                            number: '(205) 348-1085',
                            dept: 'Reserve Desk'
                        }],

                    email: 'brunolibrary@culverhouse.ua.edu'
                },
                link: '/libraries/bruno/'
            },
            {
                id: 3,
                name: "Rodgers Library",
                latitude: 33.2134785,
                longitude: -87.5427543,
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                contact: {
                    phone: [{
                        number: '(205) 348-2100',
                        dept:   'Reference & Circulation'
                    }],
                    email: 'scenglib@bama.ua.edu'
                },
                link: '/libraries/rodgers/'
            },
            {
                id: 4,
                name: "Hoole Special Collections",
                latitude: 33.210927,
                longitude: -87.543182,
                icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                contact: {
                    phone: [{
                        number: '(205) 348-0500',
                        dept: 'Front Desk'
                    }],
                    email: 'archives@ua.edu',
                    alert: [{
                        type: 'info',
                        msg: 'For reference questions'
                    }]
                },
                link: '/libraries/hoole/'
            },
            {
                id: 5,
                name: "McLure Education Library",
                latitude: 33.2104774,
                longitude: -87.5490442,
                icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
                contact: {
                    phone: [{
                        number: '(205) 348-6055',
                        dept:   'Reference & Circulation'
                    }]
                },
                link: '/libraries/mclure/'
            },
            {
                id: 6,
                name: "Music Library",
                latitude: 33.211803,
                longitude: -87.546032,
                icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
                link: '/libraries/music/'
            },
            {
                id: 7,
                name: "Sanford Media Center",
                latitude: 33.211803,
                longitude: -87.546032,
                icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
                contact: {
                    phone: [{
                        number: '(205) 348-4651'
                    }]
                },
                link: '/services/sanford-media-center/'
            },
            {
                id: 8,
                name: "Williams Collection",
                latitude: 33.211803,
                longitude: -87.546032,
                icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
                contact: {
                    phone: [{
                        number: '(205) 358-1489'
                    }]
                },
                link: '/collections/williams/'
            }
        ];
        var libChangeListener;

        uiGmapGoogleMapApi.then(function(maps) {

            //console.log(maps);
            libChangeListener = $scope.$on('hoursLoaded', function(){
                updateMap();
            });

        });

        $scope.getDirections = function(){
            var link = "https://www.google.com/maps/dir/" + $scope.directionsFrom + "/" + $scope.center.latitude + "," + $scope.center.longitude;
            window.open(link);
        };

        $scope.$on('$destroy', function(){
            libChangeListener();
        });

        function updateMap(){
            var lid = $scope.params.lid - 1;
            var loc = $scope.loc[lid];
            $scope.center = {latitude: loc.latitude, longitude: loc.longitude};
            $scope.zoom = 18;
            $scope.contact = loc.contact;
            $scope.moreLink = loc.link;
        }
    }])

    .directive('hoursLocationsMenu', ['$location', function($location){
        return {
            restrict: 'AC',
            link: function(scope, elm){
                scope.$on('$locationChangeSuccess', function(event, newLoc, oldLoc){
                    if (getLib(newLoc) !== getLib(oldLoc)){
                        elm.find('li').removeClass('active');
                    }
                })

                function getLib(url) {
                    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                    var regex = new RegExp("[\\?&]library=([^&#]*)"),
                        results = regex.exec(url);
                    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
                }
            }
        }
    }])

    .directive('hoursHref', ['$location', function($location){
        return {
            restrict: 'A',
            scope: {
                hoursHref: '@'
            },
            link: function(scope, elm){
                var library = $location.search().library || 'gorgas';
                var href = scope.$eval(scope.hoursHref);
                elm.bind('click', click);
                if (library.toLowerCase().indexOf(href.library) !== -1){
                    elm.parent().addClass('active');
                }

                scope.$on('$destroy', function(){
                    elm.unbind('click');
                });

                function click(ev){
                    ev.preventDefault();
                    scope.$apply(function(){
                        for (var param in href){
                            $location.search(param, href[param]);
                        }
                    });
                    elm.parent().addClass('active');
                }

            }
        }
    }]);

angular.module('ualib.hours')

    .directive('libHoursToday', ['hoursFactory', '$filter', function(hoursFactory, $filter){
        return {
            restrict: 'EAC',
            replace: true,
            scope: {
                library: '@'
            },
            templateUrl: 'lib-hours-today/lib-hours-today.tpl.html',
            controller: function($scope, $element){
                var library = angular.isDefined($scope.library) ? $scope.library : 'gorgas';
                hoursFactory.get({view: 'today'},
                    function(data){
                        var libraries = [];
                        for (var lib in data.libraries){
                            libraries.push(data.libraries[lib]);
                            if (data.libraries[lib].hasOwnProperty('children')){
                                libraries = libraries.concat(data.libraries[lib]['children']);
                            }
                        }
                        var library = $filter('filter')(libraries, {name: $scope.library});
                        $scope.today = setStatus(library[0]);
                        $element.addClass('loaded');

                    },
                    function(msg){
                        console.log(msg);
                    });


                //TODO: Rewrite hours ListCtrl to handle both single library and list views - setting status here is redundant
                function setStatus(hours){
                    var text = 'open';
                    var css = 'label label';
                    var status = {
                        text: text,
                        css: css+'-success'
                    };

                    if (hours.timeLeft <= 7200 && hours.timeLeft > 0){
                        if (hours.isOpen) status.text = 'closing soon';
                        else status.text = 'opening soon';
                        status.css = css+'-warning';
                    }
                    else if (!hours.isOpen){
                        status.text = 'closed';
                        status.css = css+'-danger';
                    }
                    hours.status = status;
                    return hours;
                }

            }
        }
    }])
angular.module('hours.list', [])

    .controller('ListCtrl', ['$scope', '$element', '$animate', 'hoursFactory', function ListCtrl($scope, $element, $animate, hoursFactory){

        $scope.hoursList = {};

        hoursFactory.get({view: 'today'},
            function(data){
                var list = setStatus(data.libraries);
                $scope.hoursList = list;
            },
            function(msg){
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