angular.module('hours.templates', ['calendar/calendar.tpl.html', 'hours-locations/hours-locations.tpl.html', 'lib-hours-today/lib-hours-today.tpl.html', 'list/list.tpl.html']);

angular.module("calendar/calendar.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("calendar/calendar.tpl.html",
    "<div class=\"calendar\">\n" +
    "    <div class=\"form-group\">\n" +
    "        <div class=\"btn-group\">\n" +
    "            <button class=\"btn btn-default\" ng-model=\"calView\" btn-radio=\"\">Typical Schedule</button>\n" +
    "            <button class=\"btn btn-default\" ng-model=\"calView\" btn-radio=\"1\">Calendar &amp; Exceptions</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div ng-show=\"!calView\">\n" +
    "        <div class=\"text-info\" ng-show=\"defHours[1].ts > 0\">\n" +
    "            <span class=\"fa fw fa-info-circle\"></span> Until {{defHours[1].ts * 1000 | date:'MMM d, y'}}\n" +
    "        </div>\n" +
    "        <table class=\"table table-bordered table-condensed\">\n" +
    "            <thead>\n" +
    "                <tr>\n" +
    "                    <th scope=\"col\" aria-label=\"Sunday\">Sun</th>\n" +
    "                    <th scope=\"col\" aria-label=\"Monday\">Mon</th>\n" +
    "                    <th scope=\"col\" aria-label=\"Tuesday\">Tues</th>\n" +
    "                    <th scope=\"col\" aria-label=\"Wednesday\">Wed</th>\n" +
    "                    <th scope=\"col\" aria-label=\"Thursday\">Thurs</th>\n" +
    "                    <th scope=\"col\" aria-label=\"Friday\">Fri</th>\n" +
    "                    <th scope=\"col\" aria-label=\"Saturday\">Sat</th>\n" +
    "                </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "            <tr>\n" +
    "\n" +
    "                <td ng-repeat=\"day in defHours[0].hours\" tabindex=\"0\">\n" +
    "                    <div class=\"hours\">\n" +
    "                        {{day.hoursFrom}}<span ng-show=\"day.hoursFrom != day.hoursTo\"> to <br /> {{day.hoursTo}}</span>\n" +
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
    "\n" +
    "<div class=\"jumbotron-header\">\n" +
    "  <div class=\"jumbotron\">\n" +
    "    <div class=\"container\">\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-sm-12\">\n" +
    "          <ol\n" +
    "            class=\"breadcrumb\"\n" +
    "            typeof=\"BreadcrumbList\"\n" +
    "            vocab=\"http://schema.org/\"\n" +
    "          >\n" +
    "            <li>\n" +
    "              <a\n" +
    "                title=\"Go to The University of Alabama Libraries.\"\n" +
    "                href=\"/#/home\"\n" +
    "                class=\"home\"\n" +
    "                >The University of Alabama Libraries</a\n" +
    "              >\n" +
    "            </li>\n" +
    "            <li>\n" +
    "              <a title=\"Go to Hours.\" href=\"/#/hours\" class=\"post post-page\"\n" +
    "                >Hours</a\n" +
    "              >\n" +
    "            </li>\n" +
    "          </ol>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-sm-8\">\n" +
    "          <h1>Hours & Locations</h1>\n" +
    "          <h2 class=\"hidden-xs hidden-sm\">{{library}}</h2>\n" +
    "          <div class=\"dropdown multipage-menu visible-xs visible-sm\">\n" +
    "            <button\n" +
    "              class=\"btn btn-default btn-lg dropdown-toggle\"\n" +
    "              id=\"locationMenu\"\n" +
    "              type=\"button\"\n" +
    "            >\n" +
    "              {{library}}\n" +
    "            </button>\n" +
    "            <ul\n" +
    "              class=\"dropdown-menu nav nav-stacked hours-locations-menu\"\n" +
    "              role=\"menu\"\n" +
    "              aria-labelledby=\"locationMenu\"\n" +
    "            >\n" +
    "              <li>\n" +
    "                <a href=\"#\" hours-href=\"{library: 'gorgas', month: 0}\"\n" +
    "                  >Gorgas</a\n" +
    "                >\n" +
    "                <ul class=\"nav nav-stacked\">\n" +
    "                  <li>\n" +
    "                    <a href=\"#\" hours-href=\"{library: 'music', month: 0}\"\n" +
    "                      >Music Library</a\n" +
    "                    >\n" +
    "                  </li>\n" +
    "                  <li>\n" +
    "                    <a href=\"#\" hours-href=\"{library: 'media', month: 0}\"\n" +
    "                      >Sanford Media Center</a\n" +
    "                    >\n" +
    "                  </li>\n" +
    "                  <li>\n" +
    "                    <a href=\"#\" hours-href=\"{library: 'williams', month: 0}\"\n" +
    "                      >Williams Americana Collection</a\n" +
    "                    >\n" +
    "                  </li>\n" +
    "                </ul>\n" +
    "              </li>\n" +
    "              <li>\n" +
    "                <a href=\"#\" hours-href=\"{library: 'rodgers', month: 0}\"\n" +
    "                  >Rodgers</a\n" +
    "                >\n" +
    "              </li>\n" +
    "              <li>\n" +
    "                <a href=\"#\" hours-href=\"{library: 'mclure', month: 0}\"\n" +
    "                  >McLure</a\n" +
    "                >\n" +
    "              </li>\n" +
    "              <li>\n" +
    "                <a href=\"#\" hours-href=\"{library: 'hoole', month: 0}\">Hoole</a>\n" +
    "              </li>\n" +
    "              <li>\n" +
    "                <a href=\"#\" hours-href=\"{library: 'bruno', month: 0}\">Bruno</a>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "          <ul class=\"list-unstyled fa-ul\" ng-if=\"contact\">\n" +
    "            <li ng-if=\"contact.email\">\n" +
    "              <span class=\"fa fa-li fa-envelope\"></span>\n" +
    "              <a ng-href=\"mailto:{{contact.email}}\">{{contact.email}}</a>\n" +
    "            </li>\n" +
    "            <li ng-if=\"contact.phone\">\n" +
    "              <span class=\"fa fa-li fa-phone\"></span>\n" +
    "              <ul class=\"list-unstyled\">\n" +
    "                <li ng-repeat=\"phone in contact.phone\">\n" +
    "                  <span ng-if=\"phone.dept\">{{phone.dept}}: </span>\n" +
    "                  <a\n" +
    "                    ng-href=\"tel:+1-205-{{phone.number}}\"\n" +
    "                    title=\"{{library}} phone number\"\n" +
    "                    >{{phone.number}}</a\n" +
    "                  >\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "            </li>\n" +
    "            <li ng-if=\"contact.alert\">\n" +
    "              <span class=\"fa fa-li fa-exclamation-circle\"></span\n" +
    "              >{{contact.alert}}\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-4\">\n" +
    "          <div class=\"well\">\n" +
    "            <p class=\"lead\">What can {{library}} do for you?</p>\n" +
    "            <a ng-href=\"{{moreLink}}\" class=\"btn btn-primary btn-primary-dark\"\n" +
    "              >Learn more <span class=\"fa fa-fw fa-info-circle\"></span\n" +
    "            ></a>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"container\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-md-3 col-md-push-9\">\n" +
    "      <div class=\"hidden-xs hidden-sm\">\n" +
    "        <ul class=\"nav nav-pills nav-stacked hours-locations-menu\">\n" +
    "          <li>\n" +
    "            <a href=\"#\" hours-href=\"{library: 'gorgas', month: 0}\">Gorgas</a>\n" +
    "            <ul class=\"nav nav-pills nav-stacked\">\n" +
    "              <li>\n" +
    "                <a href=\"#\" hours-href=\"{library: 'media', month: 0}\"\n" +
    "                  >Sanford Media Center</a\n" +
    "                >\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href=\"#\" hours-href=\"{library: 'rodgers', month: 0}\">Rodgers</a>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href=\"#\" hours-href=\"{library: 'mclure', month: 0}\">McLure</a>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href=\"#\" hours-href=\"{library: 'hoole', month: 0}\">Hoole</a>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href=\"#\" hours-href=\"{library: 'bruno', month: 0}\">Bruno</a>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-9 col-md-pull-3\">\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "          <div class=\"hours-calendar\"></div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "          <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-body\">\n" +
    "              <div\n" +
    "                map-lazy-load=\"https://maps.google.com/maps/api/js\"\n" +
    "                map-lazy-load-params=\"{{googleMapsUrl}}\"\n" +
    "              >\n" +
    "                <ng-map\n" +
    "                  center=\"{{center}}\"\n" +
    "                  zoom=\"18\"\n" +
    "                  scrollwheel=\"false\"\n" +
    "                  id=\"map-canvas\"\n" +
    "                  map-initialized=\"updateMap()\"\n" +
    "                >\n" +
    "                  <marker\n" +
    "                    ng-repeat=\"l in loc\"\n" +
    "                    no-watcher=\"true\"\n" +
    "                    position=\"{{l.latitude}}, {{l.longitude}}\"\n" +
    "                    title=\"{{l.name}}\"\n" +
    "                  ></marker>\n" +
    "                </ng-map>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"panel-footer\">\n" +
    "              <form ng-submit=\"getDirections()\">\n" +
    "                <div class=\"input-group\">\n" +
    "                  <input\n" +
    "                    type=\"text\"\n" +
    "                    class=\"form-control\"\n" +
    "                    ng-model=\"directionsFrom\"\n" +
    "                    placeholder=\"Your address or location\"\n" +
    "                    required\n" +
    "                  />\n" +
    "                  <span class=\"input-group-btn\">\n" +
    "                    <button\n" +
    "                      type=\"submit\"\n" +
    "                      class=\"btn btn-default\"\n" +
    "                      target=\"_gmaps\"\n" +
    "                    >\n" +
    "                      Get Directions <span class=\"fa fa-external-link\"></span>\n" +
    "                    </button>\n" +
    "                  </span>\n" +
    "                </div>\n" +
    "              </form>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
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
    "            <span ng-if=\"today.openFrom !== '-3'\" class=\"label\" ng-class=\"today.status.css\">{{today.status.text}}</span>\n" +
    "            <a class=\"btn btn-default btn-xs\" ng-href=\"/#hours?library={{today.name}}\" title=\"All hours {{today.name}}\">See all hours <span class=\"fa fa-fw fa-chevron-right\"></span></a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("list/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("list/list.tpl.html",
    "<div class=\"responsive-table\">\n" +
    "  <table class=\"table table-hover\">\n" +
    "    <caption class=\"visually-hidden\">A listing of hours for all library locations across campus, sorted alphabetically by library name</caption>\n" +
    "    <thead class=\"visually-hidden\">\n" +
    "      <tr>\n" +
    "        <th>Library</th>\n" +
    "        <th>Hours</th>\n" +
    "        <th>Status</th>\n" +
    "      </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "      <tr ng-repeat-start=\"lib in hoursList track by $index\" ng-click=\"selectLib(lib)\">\n" +
    "        <td><a href=\"#\" ng-href=\"#/hours?library={{lib.name}}\">{{lib.name}}</a></td>\n" +
    "        <td>{{lib.hours}}</td>\n" +
    "        <td><span ng-if=\"lib.openFrom !== '-3'\" ng-class=\"lib.status.css\">{{lib.status.text}}</span></td>\n" +
    "      </tr>\n" +
    "      <tr class=\"hours-list-child\" ng-repeat=\"child in lib.children track by $index\" ng-click=\"selectLib(child)\">\n" +
    "        <td><a ng-href=\"#/hours?library={{child.name}}\">{{child.name}}</a></td>\n" +
    "        <td>{{child.hours}}</td>\n" +
    "        <td><span ng-class=\"child.status.css\">{{child.status.text}}</span></td>\n" +
    "      </tr>\n" +
    "      <!-- Williams Collection data is removed from the Database; therefore the data is hardcoded !-->\n" +
    "      <tr ng-repeat-end ng-if=\"lib.name == 'Gorgas Library'\" class=\"hours-list-child\">\n" +
    "        <td><a ng-href=\"https://www.lib.ua.edu/collections/williams/\">Williams Collection</a></td>\n" +
    "        <td class=\"ng-binding\">By appointment</td>\n" +
    "        <td>&nbsp;</td>\n" +
    "      </tr>\n" +
    "    </tbody>\n" +
    "  </table>\n" +
    "</div>\n" +
    "");
}]);

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
            $location.replace();
        };

        $scope.getNextMonth = function(){
            var mid = parseInt($scope.params.month) + 1;
            if (mid > 5) mid = 5;
            $location.search('month', mid);
            $location.replace();
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

angular
  .module("ualib.hours")

  .config([
    "$routeProvider",
    function ($routeProvider) {
      $routeProvider.when("/hours", {
        reloadOnSearch: false,
        templateUrl: "hours-locations/hours-locations.tpl.html",
        controller: "HoursLocationsCtrl",
      });
    },
  ])

  .controller("HoursLocationsCtrl", [
    "$scope",
    "$location",
    "NgMap",
    function ($scope, $location, NgMap) {
      var libChangeListener = $scope.$on("hoursLoaded", function () {
        updateMap();
      });
      $scope.center = [33.211803, -87.546032];

      $scope.googleMapsUrl =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyCdXuKwZiDx5W2uP8plV5d-o-jLQ5UQtIQ&mid=z4A8-271j5C8.kowwE312jycE";

      $scope.loc = [
        {
          id: 1,
          name: "Gorgas Library",
          latitude: 33.211803,
          longitude: -87.546032,
          icon: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
          contact: {
            phone: [
              {
                number: "(205) 348-6047",
                dept: "Reference",
              },
              {
                number: "(205) 348-9748",
                dept: "Circulation",
              },
            ],
            email: "gorgasinfo@ua.edu",
          },
          link: "/libraries/gorgas/",
        },
        {
          id: 2,
          name: "Bruno Business Library",
          latitude: 33.211107,
          longitude: -87.549255,
          icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
          contact: {
            phone: [
              {
                number: "(205) 348-1080",
              },
            ],

            email: "brunolibrary@culverhouse.ua.edu",
          },
          link: "/libraries/bruno/",
        },
        {
          id: 3,
          name: "Rodgers Library",
          latitude: 33.2134785,
          longitude: -87.5427543,
          icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
          contact: {
            phone: [
              {
                number: "(205) 348-2100",
                dept: "Reference & Circulation",
              },
            ],
            email: "scenglib@ua.edu",
          },
          link: "/libraries/rodgers/",
        },
        {
          id: 4,
          name: "Hoole Special Collections",
          latitude: 33.210927,
          longitude: -87.543182,
          icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          contact: {
            phone: [
              {
                number: "(205) 348-0500",
                dept: "Front Desk",
              },
            ],
            //appointment: "By appointment only",
            email: "archives@ua.edu",
            alert:
              "In June 2021, we started moving some materials to our off-site Archival Facility (AF). Those materials will require two business days for retrieval and delivery for use in our Hoole Library reading room. Please contact us for more information.",
            // updated aug 2021 for new messaging
            //   [
            //   {
            //     type: "info",
            //     msg: "For reference questions",
            //   },
            // ],
          },
          link: "/libraries/hoole/",
        },
        {
          id: 5,
          name: "McLure Education Library",
          latitude: 33.2104774,
          longitude: -87.5490442,
          icon: "https://maps.google.com/mapfiles/ms/icons/pink-dot.png",
          contact: {
            phone: [
              {
                number: "(205) 348-6055",
                dept: "Reference & Circulation",
              },
            ],
          },
          link: "/libraries/mclure/",
        },
        {
          id: 6,
          name: "Music Library",
          latitude: 33.211803,
          longitude: -87.546032,
          icon: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
          link: "/libraries/music/",
        },
        {
          id: 7,
          name: "Sanford Media Center",
          latitude: 33.211803,
          longitude: -87.546032,
          icon: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
          contact: {
            phone: [
              {
                number: "(205) 348-4651",
              },
            ],
          },
          link: "/using-the-library/sanford-media-center/",
        },
      ];

      $scope.getDirections = function () {
        var link =
          "https://www.google.com/maps/dir/" +
          $scope.directionsFrom +
          "/" +
          $scope.center[0] +
          "," +
          $scope.center[1];
        window.open(link);
      };

      $scope.$on("$destroy", function () {
        libChangeListener();
      });

      function updateMap() {
        var lid = $scope.params.lid - 1;
        var loc = $scope.loc[lid];
        $scope.center = [loc.latitude, loc.longitude];
        $scope.zoom = 18;
        $scope.contact = loc.contact;
        $scope.moreLink = loc.link;
        $scope.library = loc.name;
      }
    },
  ])

  .directive("hoursLocationsMenu", [
    "$location",
    function ($location) {
      return {
        restrict: "AC",
        link: function (scope, elm) {
          scope.$on("$locationChangeSuccess", function (event, newLoc, oldLoc) {
            if (getLib(newLoc) !== getLib(oldLoc)) {
              elm.find("li").removeClass("active");
            }
          });

          function getLib(url) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]library=([^&#]*)"),
              results = regex.exec(url);
            return results === null
              ? ""
              : decodeURIComponent(results[1].replace(/\+/g, " "));
          }
        },
      };
    },
  ])

  .directive("hoursHref", [
    "$location",
    function ($location) {
      return {
        restrict: "A",
        scope: {
          hoursHref: "@",
        },
        link: function (scope, elm) {
          var library = $location.search().library || "gorgas";
          var href = scope.$eval(scope.hoursHref);
          elm.bind("click", click);
          if (library.toLowerCase().indexOf(href.library) !== -1) {
            elm.parent().addClass("active");
          }

          scope.$on("$destroy", function () {
            elm.unbind("click");
          });

          function click(ev) {
            ev.preventDefault();
            scope.$apply(function () {
              for (var param in href) {
                $location.search(param, href[param]);
                $location.replace();
              }
            });
            elm.parent().addClass("active");
          }
        },
      };
    },
  ]);

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
                        if (angular.isDefined(data.today.libraries)) {
                            for (var lib in data.today.libraries) {
                                libraries.push(data.today.libraries[lib]);
                                if (data.today.libraries[lib].hasOwnProperty('children')) {
                                    libraries = libraries.concat(data.today.libraries[lib]['children']);
                                }
                            }
                            var library = $filter('filter')(libraries, {name: $scope.library});
                            $scope.today = setStatus(library[0]);
                            $element.addClass('loaded');
                        } else {
                            console.log("Error: could not retrieve today hours");
                        }
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
                var list = setStatus(data.today.libraries);
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