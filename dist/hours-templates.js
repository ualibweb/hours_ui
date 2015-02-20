angular.module('hours.templates', ['list/list.tpl.html']);

angular.module("list/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("list/list.tpl.html",
    "<h2>Hours <small>today</small></h2>\n" +
    "<div class=\"responsive-table\">\n" +
    "    <table class=\"table table-hover\">\n" +
    "        <tbody ng-repeat=\"lib in hoursList track by $index\">\n" +
    "            <tr>\n" +
    "                <td>{{lib.name}}</td>\n" +
    "                <td>{{lib.hours}}</td>\n" +
    "                <td ng-class=\"lib.status.css\">{{lib.status.text}}</td>\n" +
    "                <td>\n" +
    "                    <span class=\"fa fa-lg fa-info-circle\" ng-if=\"lib.description\" tooltip=\"{{lib.description}}\"></span>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            <tr class=\"hours-list-child\" ng-repeat=\"child in lib.children track by $index\">\n" +
    "                <td>{{child.name}}</td>\n" +
    "                <td>{{child.hours}}</td>\n" +
    "                <td ng-class=\"child.status.css\">{{child.status.text}}</td>\n" +
    "                <td>\n" +
    "                    <span class=\"fa fa-lg fa-info-circle\" ng-if=\"child.description\" tooltip=\"{{child.description}}\"></span>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "</div>");
}]);
