angular.module('hours.templates', ['calendar/calendar.tpl.html', 'hours-locations/hours-locations.tpl.html', 'lib-hours-today/lib-hours-today.tpl.html', 'list/list.tpl.html']);

angular.module("calendar/calendar.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("calendar/calendar.tpl.html",
    "<div class=\"calendar\">\n" +
    "    <div class=\"form-group\">\n" +
    "        <div class=\"btn-group\">\n" +
    "            <label class=\"btn btn-default\" ng-model=\"calView\" btn-radio=\"\">Typical Schedule</label>\n" +
    "            <label class=\"btn btn-default\" ng-model=\"calView\" btn-radio=\"1\">Calendar &amp; Exceptions</label>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div ng-show=\"!calView\">\n" +
    "        <div class=\"text-info\" ng-show=\"defHours[1].ts > 0\">\n" +
    "            <span class=\"fa fw fa-info-circle\"></span> Until {{defHours[1].ts * 1000 | date:'MMM d, y'}}\n" +
    "        </div>\n" +
    "        <table class=\"table table-bordered table-condensed\">\n" +
    "            <thead>\n" +
    "            <tr>\n" +
    "                <td>Sun</td>\n" +
    "                <td>Mon</td>\n" +
    "                <td>Tue</td>\n" +
    "                <td>Wed</td>\n" +
    "                <td>Thur</td>\n" +
    "                <td>Fri</td>\n" +
    "                <td>Sat</td>\n" +
    "            </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "            <tr>\n" +
    "                <td ng-repeat=\"day in defHours[0].hours\">\n" +
    "                    <div class=\"hours\">\n" +
    "                        {{day.hoursFrom}}\n" +
    "                    <span ng-show=\"day.hoursFrom != day.hoursTo\">\n" +
    "                        <br>{{day.hoursTo}}\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "    <div ng-show=\"calView\">\n" +
    "        <nav class=\"navbar navbar-default navbar-embedded\">\n" +
    "            <button type=\"button\" class=\"btn btn-primary navbar-btn navbar-left\" ng-class=\"{'disabled': params.month <= 0}\" ng-disabled=\"params.month <= 0\" ng-click=\"getPrevMonth()\">\n" +
    "                <span class=\"fa fa-angle-left\"></span>\n" +
    "            </button>\n" +
    "            <h2 class=\"navbar-text navbar-center\">{{cal.month}}</h2>\n" +
    "            <button type=\"button\" class=\"btn btn-primary navbar-btn navbar-right\" ng-class=\"{'disabled': params.month >= 5}\" ng-disabled=\"params.month >= 5\" ng-click=\"getNextMonth()\"><span class=\"fa fa-angle-right\"></span></button>\n" +
    "        </nav>\n" +
    "        <table class=\"table table-bordered table-condensed\">\n" +
    "            <thead>\n" +
    "            <tr>\n" +
    "                <td>Sun</td>\n" +
    "                <td>Mon</td>\n" +
    "                <td>Tue</td>\n" +
    "                <td>Wed</td>\n" +
    "                <td>Thur</td>\n" +
    "                <td>Fri</td>\n" +
    "                <td>Sat</td>\n" +
    "            </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "            <tr ng-repeat=\"week in cal.weeks\">\n" +
    "                <td ng-repeat=\"day in week\" ng-class=\"day.css\">\n" +
    "\n" +
    "                    <div class=\"date\">\n" +
    "                        {{day.ts * 1000 | date:'d'}}\n" +
    "                    </div>\n" +
    "                    <div class=\"hours\">\n" +
    "                        {{day.hoursFrom}}\n" +
    "                        <div ng-if=\"day.hoursFrom != day.hoursTo\">\n" +
    "                            {{day.hoursTo}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "\n" +
    "                    <div class=\"fa fa-exclamation-circle exception-icon\" ng-if=\"day.exc\" popover=\"{{day.exc}}\" popover-trigger=\"mouseenter\" popover-append-to-body=\"true\"></div>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "</div>");
}]);

angular.module("hours-locations/hours-locations.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("hours-locations/hours-locations.tpl.html",
    "<!--<script src='//maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyCdXuKwZiDx5W2uP8plV5d-o-jLQ5UQtIQ&mid=z4A8-271j5C8.kowwE312jycE'></script>-->\n" +
    "<div class=\"jumbotron bg-transparent\">\n" +
    "    <h1>Hours &amp; Locations</h1>\n" +
    "    <h2 class=\"hidden-xs hidden-sm\">{{library}}</h2>\n" +
    "    <div class=\"dropdown multipage-menu visible-xs visible-sm\">\n" +
    "        <button class=\"btn btn-default btn-lg dropdown-toggle\" id=\"locationMenu\"  type=\"button\">\n" +
    "            {{library}}\n" +
    "        </button>\n" +
    "        <ul class=\"dropdown-menu nav nav-stacked hours-locations-menu\" role=\"menu\" aria-labelledby=\"locationMenu\">\n" +
    "            <li><a href=\"#\" hours-href=\"{library: 'gorgas', month: 0}\">Gorgas</a>\n" +
    "                <ul class=\"nav nav-stacked\">\n" +
    "                    <li><a href=\"#\" hours-href=\"{library: 'music', month: 0}\">Music Library</a></li>\n" +
    "                    <li><a href=\"#\" hours-href=\"{library: 'media', month: 0}\">Sanford Media Center</a></li>\n" +
    "                    <li><a href=\"#\" hours-href=\"{library: 'williams', month: 0}\">Williams Americana Collection</a></li>\n" +
    "                </ul>\n" +
    "            </li>\n" +
    "            <li><a href=\"#\" hours-href=\"{library: 'rodgers', month: 0}\">Rodgers</a></li>\n" +
    "            <li><a href=\"#\" hours-href=\"{library: 'mclure', month: 0}\">McLure</a></li>\n" +
    "            <li><a href=\"#\" hours-href=\"{library: 'hoole', month: 0}\">Hoole</a></li>\n" +
    "            <li><a href=\"#\" hours-href=\"{library: 'bruno', month: 0}\">Bruno</a></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-3 col-md-push-9\">\n" +
    "            <div class=\"hidden-xs hidden-sm\">\n" +
    "                <ul class=\"nav nav-pills nav-stacked hours-locations-menu\">\n" +
    "                    <li><a href=\"#\" hours-href=\"{library: 'gorgas', month: 0}\">Gorgas</a>\n" +
    "                        <ul class=\"nav nav-pills nav-stacked\">\n" +
    "                            <li><a href=\"#\" hours-href=\"{library: 'music', month: 0}\">Music Library</a></li>\n" +
    "                            <li><a href=\"#\" hours-href=\"{library: 'media', month: 0}\">Sanford Media Center</a></li>\n" +
    "                            <li><a href=\"#\" hours-href=\"{library: 'williams', month: 0}\">Williams Americana Collection</a></li>\n" +
    "                        </ul>\n" +
    "                    </li>\n" +
    "                    <li><a href=\"#\" hours-href=\"{library: 'rodgers', month: 0}\">Rodgers</a></li>\n" +
    "                    <li><a href=\"#\" hours-href=\"{library: 'mclure', month: 0}\">McLure</a></li>\n" +
    "                    <li><a href=\"#\" hours-href=\"{library: 'hoole', month: 0}\">Hoole</a></li>\n" +
    "                    <li><a href=\"#\" hours-href=\"{library: 'bruno', month: 0}\">Bruno</a></li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-9 col-md-pull-3\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-12\">\n" +
    "                    <div class=\"hours-calendar\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-7\">\n" +
    "                    <div class=\"panel panel-default\">\n" +
    "                        <div class=\"panel-body\">\n" +
    "                            <ui-gmap-google-map center='center' zoom='zoom' id=\"map-canvas\" options=\"{disableDefaultUI: true}\">\n" +
    "                                <ui-gmap-markers models=\"loc\" coords=\"'self'\" icon=\"'icon'\">\n" +
    "                                </ui-gmap-markers>\n" +
    "                            </ui-gmap-google-map>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"panel-footer\">\n" +
    "                            <form ng-submit=\"getDirections()\">\n" +
    "                                <div class=\"input-group\">\n" +
    "                                    <input type=\"text\" class=\"form-control\" ng-model=\"directionsFrom\" placeholder=\"Your address or location\" required>\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                            <button type=\"submit\" class=\"btn btn-default\" target=\"_gmaps\">Get Directions <span class=\"fa fa-external-link\"></span></button>\n" +
    "                        </span>\n" +
    "                                </div>\n" +
    "                            </form>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"col-md-5\">\n" +
    "                    <div class=\"panel panel-default\">\n" +
    "                        <div class=\"panel-heading\">Contact</div>\n" +
    "                        <div class=\"panel-body\">\n" +
    "                            <ul class=\"list-unstyled fa-ul\" ng-if=\"contact\">\n" +
    "                                <li ng-if=\"contact.email\"><span class=\"fa fa-li fa-envelope\"></span> <a ng-href=\"mailto:{{contact.email}}\">{{contact.email}}</a></li>\n" +
    "                                <li ng-if=\"contact.phone\">\n" +
    "                                    <span class=\"fa fa-li fa-phone\"></span>\n" +
    "                                    <ul class=\"list-unstyled\">\n" +
    "                                        <li ng-repeat=\"phone in contact.phone\">\n" +
    "                                            <strong ng-if=\"phone.dept\">{{phone.dept}}: </strong>\n" +
    "                                            {{phone.number}}\n" +
    "                                        </li>\n" +
    "                                    </ul>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                            <a ng-href=\"{{moreLink}}\" class=\"btn btn-block btn-default\">More about {{library}}</a>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("lib-hours-today/lib-hours-today.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("lib-hours-today/lib-hours-today.tpl.html",
    "<div class=\"library-hours-today\" ng-cloak>\n" +
    "    <div class=\"media\">\n" +
    "        <div class=\"media-left\">\n" +
    "            <div class=\"media-object fa fa-2x fa-clock-o\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"media-body\">\n" +
    "            <h3 class=\"media-heading\">Today</h3>\n" +
    "            <h4 class=\"media-heading\">{{today.hours}} <span class=\"fa fa-lg fa-info-circle\" ng-if=\"today.description\" tooltip=\"{{today.description}}\"></span></h4>\n" +
    "            <span class=\"label\" ng-class=\"today.status.css\">{{today.status.text}}</span>\n" +
    "            <a class=\"btn btn-default btn-xs\" ng-href=\"/#hours?library={{today.name}}\" title=\"All hours {{today.name}}\">See all hours <span class=\"fa fa-fw fa-chevron-right\"></span></a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("list/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("list/list.tpl.html",
    "<div class=\"responsive-table\">\n" +
    "  <table class=\"table table-hover\">\n" +
    "    <tbody ng-repeat=\"lib in hoursList track by $index\">\n" +
    "    <tr ng-click=\"selectLib(lib)\">\n" +
    "      <td><a href=\"#\" ng-href=\"#/hours?library={{lib.name}}\">{{lib.name}}</a></td>\n" +
    "      <td>{{lib.hours}}</td>\n" +
    "      <td><span ng-class=\"lib.status.css\">{{lib.status.text}}</span></td>\n" +
    "      <td>\n" +
    "        <span class=\"fa fa-lg fa-info-circle\" ng-if=\"lib.description\" tooltip=\"{{lib.description}}\"></span>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "    <tr class=\"hours-list-child\" ng-repeat=\"child in lib.children track by $index\" ng-click=\"selectLib(child)\">\n" +
    "      <td><a ng-href=\"#/hours?library={{child.name}}\">{{child.name}}</a></td>\n" +
    "      <td>{{child.hours}}</td>\n" +
    "      <td><span ng-class=\"child.status.css\">{{child.status.text}}</span></td>\n" +
    "      <td>\n" +
    "        <span class=\"fa fa-lg fa-info-circle\" ng-if=\"child.description\" tooltip=\"{{child.description}}\"></span>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "    </tbody>\n" +
    "  </table>\n" +
    "</div>");
}]);

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
        return $resource("//wwwdev2.lib.ua.edu/libhours2/api/:view", {}, {
            get: {
                cache: true
            }
        });
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
                icon: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
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
                icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
                contact: {
                    phone: [
                        {
                            number: '(205) 348-1080'
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
                icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
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
                icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                contact: {
                    phone: [{
                        number: '(205) 348-0500',
                        dept: 'Front Desk'
                    }],
                    email: 'archives@bama.ua.edu',
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
                icon: 'https://maps.google.com/mapfiles/ms/icons/pink-dot.png',
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
                icon: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
                link: '/libraries/music/'
            },
            {
                id: 7,
                name: "Sanford Media Center",
                latitude: 33.211803,
                longitude: -87.546032,
                icon: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
                contact: {
                    phone: [{
                        number: '(205) 348-4651'
                    }]
                },
                link: '/using-the-library/sanford-media-center/'
            },
            {
                id: 8,
                name: "Williams Collection",
                latitude: 33.211803,
                longitude: -87.546032,
                icon: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
                contact: {
                    phone: [{
                        number: '(205) 358-1489'
                    }]
                },
                link: '/collections/williams/'
            }
        ];
        var libChangeListener;

        libChangeListener = $scope.$on('hoursLoaded', function(){
            uiGmapGoogleMapApi.then(function(maps) {
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
            controller: ['$scope', '$element', function($scope, $element){
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

            }]
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