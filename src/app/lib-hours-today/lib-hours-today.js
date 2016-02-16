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