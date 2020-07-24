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
            // remove phone number for "by appointment" option
            // phone: [
            //   {
            //     number: "(205) 348-0500",
            //     dept: "Front Desk",
            //   },
            // ],
            email: "archives@ua.edu",
            alert: [
              {
                type: "info",
                msg: "For reference questions",
              },
            ],
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
