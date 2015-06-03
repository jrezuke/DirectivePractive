(function() {
    function DexController (dataService){
        var vm = this;
        vm.dextroses = [];
        vm.results =[];
        vm.model = {};

        vm.addResult = function(){
            //alert('addResult');

        };

        var getDextroses = function(){


            vm.dextroses = dataService.getDextrosePercents();
            vm.dextrose = vm.dextroses[0];
        };

        getDextroses();


    }

    DexController.$inject = ['dataService'];

    angular.module('app')
        .controller('DexController', DexController);
})();