angular.module('hours.list', [])

    .controller('ListCtrl', ['$scope', '$element', '$animate', 'hoursFactory', function ListCtrl($scope, $element, $animate, hoursFactory){
        var spinner = angular.element('<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>');
        var elm = $element.find('h2');
        $scope.hoursList = {};

        $animate.enter(spinner, elm, angular.element(elm[0].lastChild));

        hoursFactory.getList()
            .success(function(data){
                var list = setStatus(data.libraries)
                $scope.hoursList = list;
                $animate.leave(spinner);
            })
            .error(function(msg){
                console.log(msg);
            });

        function setStatus(hours){
            var h = [];

            for (var i = 0, len = hours.length; i < len; i++){
                var status = {
                    text: 'open',
                    css: 'text-success'
                };

                if (hours[i].timeLeft <= 7200){
                    if (hours[i].isOpen) status.text = 'closing soon';
                    else status.text = 'opening soon';
                    status.css = 'text-warning';
                }
                else if (!hours[i].isOpen){
                    status.text = 'closed';
                    status.css = 'text-danger';
                }

                hours[i].status = status;

                if (angular.isObject(hours[i].children)){
                    hours[i].children = setStatus(hours[i].children);
                }
                h.push(hours[i]);
            }
            return h;
        }


    }])

    .directive('hoursList', [function hoursList(){
        return {
            restrict: 'AC',
            controller: 'ListCtrl',
            templateUrl: 'list/list.tpl.html'
        }
    }]);