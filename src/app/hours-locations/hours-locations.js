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
                link: '/libraries-and-collections/gorgas-library/'
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
                link: '/libraries-and-collections/bruno/'
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
                link: '/libraries-and-collections/rodgers-science-and-engineering-library/'
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
                    email: 'scenglib@bama.ua.edu',
                    alert: [{
                        type: 'info',
                        msg: 'For reference questions'
                    }]
                },
                link: '/libraries-and-collections/hoole-library/'
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
                link: '/libraries-and-collections/mclure-education-library/'
            },
            {
                id: 6,
                name: "Music Library",
                latitude: 33.211803,
                longitude: -87.546032,
                icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
                link: '/libraries-and-collections/music-library/'
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
            updateMap();
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
