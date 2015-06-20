(function() {
    function DexController (dataService){
        var vm = this;
        vm.dextroses = [];
        vm.results =[];
        vm.model = {};

        var getDextroses = function(){
            vm.dextroses = dataService.getDextrosePercents();
            vm.dextrose = vm.dextroses[0];
        };

        vm.removeOne = function(item){
          alert("testThis:" + item.value);
        };

        getDextroses();
    }

    DexController.$inject = ['dataService'];

    angular.module('app')
        .controller('DexController', DexController);
})();