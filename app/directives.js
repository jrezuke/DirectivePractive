(function () {
    var jrDropdown = function () {

        var link = function (scope, elem, attrs) {
            //console.log("drpopDown:", scope);
            //console.log("ngModel:", ngModel);
        };

        return {
            link: link,
            scope: {
                dextroses: '=',
                results: '=',
                testMethod: '&'
            },
            templateUrl: 'app/ddTemplate.html',
            controller: function ($scope) {
                var Infusion = function () {
                    this.dextroseConcentration = 0;
                    this.volume = 0;
                    this.caloricIntake = 0;
                };

                var vm = this;

                vm.test = function(){
                    vm.testMethod();
                };
                vm.selectedDextrose = {};  //vm.dextroses[0];


                vm.removeEntry = function (indx) {
                    vm.results.splice(indx, 1);
                };

                function calculateCaloricIntake(dexForm) {
                    var infusion = new Infusion();
                    infusion.dextroseConcentration = vm.selectedDextrose.percent;
                    infusion.volume = dexForm.volume.$viewValue;
                    infusion.caloricIntake = vm.selectedDextrose.percent * .034 * infusion.volume;
                    return infusion;
                }

                vm.addSelection = function () {
                    console.log("before form.invalid addSelection:", $scope.dexForm);

                    //$scope.$broadcast('show-errors-event');
                    if ($scope.dexForm.$invalid) {
                        return;
                    }

                    console.log("addSelection form object:", $scope.dexForm);
                    var infusion = calculateCaloricIntake($scope.dexForm);
                    vm.results.push(infusion);

                };
                vm.submitForm = function () {
                    alert('submitForm');
                };
            },
            controllerAs: 'vm',
            bindToController: true
        };
    };

    var jrDropdownResults = function () {

        var link = function (scope, elem, attrs, ctrl) {
            console.log("results:", scope);
        };

        return {
            require: jrDropdown,
            link: link,
            scope: {
                results: '=',
                removeResult: '&'
            },
            templateUrl: 'app/ddResultsTempl.html',
            controller:function($scope){
                var vm = this;

                vm.test = function(){
                    vm.removeResult();
                };
            },
            controllerAs: 'vm',
            bindToController: true

        };
    };

    var jrRemoveResult = function(){
        var link = function (scope, elem, attrs) {

        };

        return {
            restrict: 'E',
            link:link,
            templateUrl: 'app/removeResult.html',
            scope: {
                index: '@',
                testThis: '&'
            },
            controller: function($scope) {
                $scope.removing = false;
                $scope.startRemove = function() {
                    $scope.removing = true;
                }
                $scope.cancelRemove = function() {
                    $scope.removing = false;
                }
                $scope.confirmRemove = function() {
                    alert('confirmed' + $scope.index);
                    $scope.testThis();
                };
            }
        };
    };

    var jrNumbersOnly = function () {
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

    var optionValueRequired = function () {
        return {
            restrict: "A",
            require: "ngModel",
            scope: {
                // Prefix "=" two-way binding
                required: "@"
            },
            link: function (scope, element, attrs, ngModel) {
                ngModel.$validators.optionValueRequired = function (modelValue) {
                    console.log("optionValueRequired modelValue:", modelValue);
                    if (modelValue === null || !modelValue.percent) {
                        console.log('returning false');
                        return false;
                    }
                    console.log('returning true');
                    return true;
                };
            }
        };
    };

    angular.module('app')
        .directive('jrRemoveResult', jrRemoveResult);

    angular.module('app')
        .directive('optionValueRequired', optionValueRequired);

    angular.module('app')
        .directive('jrNumbersOnly', jrNumbersOnly);

    angular.module('app')
        .directive('jrDropdown', jrDropdown);

    angular.module('app')
        .directive('jrDropdownResults', jrDropdownResults);
}());