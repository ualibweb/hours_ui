angular.module('hours.templates', ['calendar/calendar-day.tpl.html', 'calendar/calendar.tpl.html', 'lib-hours-today/lib-hours-today.tpl.html', 'list/list.tpl.html']);

angular.module("calendar/calendar-day.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("calendar/calendar-day.tpl.html",
    "<div class=\"cal-day\">\n" +
    "    <div class=\"dat\">{{day.ts * 1000 | date:'d'}}</div>\n" +
    "    <div class=\"hours\">\n" +
    "        {{day.hoursFrom}}\n" +
    "        <div ng-show=\"day.hoursFrom != day.hoursTo\">\n" +
    "            {{day.hoursTo}}\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("calendar/calendar.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("calendar/calendar.tpl.html",
    "<h2>Calendar</h2>\n" +
    "<div class=\"cal-container\">\n" +
    "    <nav class=\"navbar navbar-default navbar-embedded\">\n" +
    "        <button type=\"button\" class=\"btn btn-default navbar-btn navbar-left\" ng-click=\"prevMonth()\">\n" +
    "            <span class=\"fa fa-angle-left\"></span>\n" +
    "        </button>\n" +
    "        <p class=\"navbar-text navbar-center\">{{calendar.cal[curMonth].month}}</p>\n" +
    "        <button type=\"button\" class=\"btn btn-default navbar-btn navbar-right\" ng-click=\"nextMonth()\">\n" +
    "            <span class=\"fa fa-angle-right\"></span>\n" +
    "        </button>\n" +
    "    </nav>\n" +
    "    <div class=\"col-month-cotnainer\">\n" +
    "        <div class=\"cal-month\" ng-repeat=\"month in cal.calendar\">\n" +
    "            <div class=\"cal-week\" ng-repeat=\"week in month.calendar.weeks\">\n" +
    "                <!--<div class=\"cal-day\" ng-repeat=\"day in week\" hours-calendar-day day=day\"></div>-->\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <!--\n" +
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
    "            <tr ng-repeat=\"week in calendar[libID - 1].cal[curMonth].weeks\">\n" +
    "                <td ng-repeat=\"day in week\" ng-class=\"day.class\">\n" +
    "                    <div style=\"width:100%;height:100%;\" popover=\"{{day.exc}}\" popover-trigger=\"mouseenter\" popover-placement=\"top\">\n" +
    "                        <div class=\"date\">\n" +
    "                            {{day.ts * 1000 | date:'d'}}\n" +
    "                        </div>\n" +
    "                        <div class=\"hours\">\n" +
    "                            {{day.hoursFrom}}\n" +
    "                            <span ng-show=\"day.hoursFrom != day.hoursTo\">\n" +
    "                                <br>{{day.hoursTo}}\n" +
    "                            </span>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "        </tbody>\n" +
    "    </table>-->\n" +
    "</div>");
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
    "      <td><a href=\"#\">{{lib.name}}</a></td>\n" +
    "      <td>{{lib.hours}}</td>\n" +
    "      <td><span ng-class=\"lib.status.css\">{{lib.status.text}}</span></td>\n" +
    "      <td>\n" +
    "        <span class=\"fa fa-lg fa-info-circle\" ng-if=\"lib.description\" tooltip=\"{{lib.description}}\"></span>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "    <tr class=\"hours-list-child\" ng-repeat=\"child in lib.children track by $index\" ng-click=\"selectLib(child)\">\n" +
    "      <td><a href=\"#\">{{child.name}}</a></td>\n" +
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
