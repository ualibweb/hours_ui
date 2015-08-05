angular.module('hours.templates', ['calendar/calendar.tpl.html', 'hours-locations/hours-locations.tpl.html', 'lib-hours-today/lib-hours-today.tpl.html', 'list/list.tpl.html']);

angular.module("calendar/calendar.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("calendar/calendar.tpl.html",
    "<div class=\"calendar\">\n" +
    "    <h3>\n" +
    "        Typical Week Schedule\n" +
    "        <small ng-show=\"defHours[1].ts > 0\">\n" +
    "            until {{defHours[1].ts * 1000 | date:'MMM d, y'}}\n" +
    "        </small>\n" +
    "    </h3>\n" +
    "    <table class=\"table table-bordered table-condensed\">\n" +
    "        <thead>\n" +
    "        <tr>\n" +
    "            <td>Sun</td>\n" +
    "            <td>Mon</td>\n" +
    "            <td>Tue</td>\n" +
    "            <td>Wed</td>\n" +
    "            <td>Thur</td>\n" +
    "            <td>Fri</td>\n" +
    "            <td>Sat</td>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "        <tr>\n" +
    "            <td ng-repeat=\"day in defHours[0].hours\">\n" +
    "                <div class=\"hours\">\n" +
    "                    {{day.hoursFrom}}\n" +
    "                    <span ng-show=\"day.hoursFrom != day.hoursTo\">\n" +
    "                        <br>{{day.hoursTo}}\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "\n" +
    "    <h3>Calendar <small>Exceptions</small></h3>\n" +
    "    <nav class=\"navbar navbar-default navbar-embedded\">\n" +
    "        <button type=\"button\" class=\"btn btn-primary navbar-btn navbar-left\" ng-class=\"{'disabled': params.month <= 0}\" ng-disabled=\"params.month <= 0\" ng-click=\"getPrevMonth()\">\n" +
    "            <span class=\"fa fa-angle-left\"></span>\n" +
    "        </button>\n" +
    "        <h2 class=\"navbar-text navbar-center\">{{cal.month}}</h2>\n" +
    "        <button type=\"button\" class=\"btn btn-primary navbar-btn navbar-right\" ng-class=\"{'disabled': params.month >= 5}\" ng-disabled=\"params.month >= 5\" ng-click=\"getNextMonth()\"><span class=\"fa fa-angle-right\"></span></button>\n" +
    "    </nav>\n" +
    "    <table class=\"table table-bordered table-condensed\">\n" +
    "        <thead>\n" +
    "        <tr>\n" +
    "            <td>Sun</td>\n" +
    "            <td>Mon</td>\n" +
    "            <td>Tue</td>\n" +
    "            <td>Wed</td>\n" +
    "            <td>Thur</td>\n" +
    "            <td>Fri</td>\n" +
    "            <td>Sat</td>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "        <tr ng-repeat=\"week in cal.weeks\">\n" +
    "            <td ng-repeat=\"day in week\" ng-class=\"day.css\">\n" +
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
    "                <div class=\"fa fa-exclamation-circle exception-icon\" ng-if=\"day.exc\" popover=\"{{day.exc}}\" popover-trigger=\"mouseenter\" popover-append-to-body=\"true\"></div>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "</div>");
}]);

angular.module("hours-locations/hours-locations.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("hours-locations/hours-locations.tpl.html",
    "<!--<script src='//maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyCdXuKwZiDx5W2uP8plV5d-o-jLQ5UQtIQ&mid=z4A8-271j5C8.kowwE312jycE'></script>-->\n" +
    "<h1>\n" +
    "    <div class=\"page-header\">Hours &amp; Locations <small>{{library}}</small></div>\n" +
    "</h1>\n" +
    "<div class=\"row page-slice\">\n" +
    "    <div class=\"col-md-9\">\n" +
    "        <div class=\"hours-calendar\"></div>\n" +
    "\n" +
    "        <div class=\"row page-slice\">\n" +
    "            <div class=\"panel panel-default\">\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <ui-gmap-google-map center='center' zoom='zoom' id=\"map-canvas\">\n" +
    "                        <ui-gmap-markers models=\"loc\" coords=\"'self'\" icon=\"'icon'\">\n" +
    "                        </ui-gmap-markers>\n" +
    "                    </ui-gmap-google-map>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"panel-footer\">\n" +
    "                    <form ng-submit=\"getDirections()\">\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <input type=\"text\" class=\"form-control\" ng-model=\"directionsFrom\" placeholder=\"Your address or location\" required>\n" +
    "                    <span class=\"input-group-btn\">\n" +
    "                        <button type=\"submit\" class=\"btn btn-primary\" target=\"_gmaps\">Get Directions <span class=\"fa fa-external-link\"></span></button>\n" +
    "                    </span>\n" +
    "                        </div>\n" +
    "                    </form>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-3\">\n" +
    "\n" +
    "        <div ui-scrollfix>\n" +
    "            <ul class=\"nav nav-pills nav-stacked hours-locations-menu\">\n" +
    "                <li><a href=\"#\" hours-href=\"{library: 'gorgas', month: 0}\">Gorgas</a>\n" +
    "                    <ul class=\"nav nav-pills nav-stacked\">\n" +
    "                        <li><a href=\"#\" hours-href=\"{library: 'music', month: 0}\">Music Library</a></li>\n" +
    "                        <li><a href=\"#\" hours-href=\"{library: 'media', month: 0}\">Sanford Media Center</a></li>\n" +
    "                        <li><a href=\"#\" hours-href=\"{library: 'williams', month: 0}\">Williams Americana Collection</a></li>\n" +
    "                    </ul>\n" +
    "                </li>\n" +
    "                <li><a href=\"#\" hours-href=\"{library: 'rodgers', month: 0}\">Rodgers</a></li>\n" +
    "                <li><a href=\"#\" hours-href=\"{library: 'mclure', month: 0}\">McLure</a></li>\n" +
    "                <li><a href=\"#\" hours-href=\"{library: 'hoole', month: 0}\">Hoole</a></li>\n" +
    "                <li><a href=\"#\" hours-href=\"{library: 'bruno', month: 0}\">Bruno</a></li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("lib-hours-today/lib-hours-today.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("lib-hours-today/lib-hours-today.tpl.html",
    "<div class=\"library-hours-today\">\n" +
    "    <h2>\n" +
    "        <span class=\"fa fa-clock-o\"></span> Hours\n" +
    "        <span class=\"label\" ng-class=\"today.status.css\">{{today.status.text}}</span>\n" +
    "    </h2>\n" +
    "    <div class=\"h3\">{{today.hours}}</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("list/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("list/list.tpl.html",
    "<h2>Hours <small>today</small></h2>\n" +
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
