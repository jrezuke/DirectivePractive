(function() {
    var jrDropdown = function() {

        var link = function(scope, elem, attrs, ngModel) {
            console.log("drpopDown:", scope);
            console.log("ngModel:", ngModel);
        };

        return {
            require: 'ngModel',
            link:link,
            scope:{
                dextroses: '=',
                results: '='
                //addEntry: '&'
            },
            templateUrl: 'app/ddTemplate.html',
            controller: function ($scope) {
                var vm = this;
                vm.selectedDextrose = vm.dextroses[0];
                vm.newInfusion = {
                    dextroseConcentration: 0,
                    volume:0
                }

                vm.addSelection = function(){
                    console.log("before form.invalid addSelection:", dexForm);

                    $scope.$broadcast('show-errors-event');
                    if($scope.dexForm.$invalid){
                        return;
                    }

                    console.log("addSelection form object:", dexForm);
                    vm.results.push(vm.selectedDextrose);

                };
                vm.submitForm = function(){
                    alert('submitForm');
                };
            },
            controllerAs:'vm',
            bindToController:true
        };
    };

    var jrDropdownResults = function() {

        var link = function(scope, elem, attrs, ctrl) {
            console.log("results:", scope);
        };

        return {
            require: jrDropdown,
            link:link,
            scope:false,
            templateUrl: 'app/ddResultsTempl.html'

        };
    };

    angular.module('app')
        .directive('jrDropdown', jrDropdown);

    angular.module('app')
        .directive('jrDropdownResults', jrDropdownResults);
}());