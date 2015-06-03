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
                };

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

     var jrNumbersOnly = function() {
         return {
             require: 'ngModel',
             link: function (scope, element, attrs, modelCtrl) {
                 modelCtrl.$parsers.push(function (inputValue) {
                     // this next if is necessary for when using ng-required on your input.
                     // In such cases, when a letter is typed first, this parser will be called
                     // again, and the 2nd time, the value will be undefined
                     if (inputValue === undefined) {
                         return '';
                     }
                     var transformedInput = inputValue.replace(/[^0-9]/g, '');
                     if (transformedInput !== inputValue) {
                         modelCtrl.$setViewValue(transformedInput);
                         modelCtrl.$render();
                     }

                     return transformedInput;
                 });
             }
         };
     };

    function MyCtrl($scope) {
        $scope.number = ''
    }

    angular.module('app')
        .directive('jrNumbersOnly', jrNumbersOnly);

    angular.module('app')
        .directive('jrDropdown', jrDropdown);

    angular.module('app')
        .directive('jrDropdownResults', jrDropdownResults);
}());