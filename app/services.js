(function() {
    var dataService = function() {
        var dextrosePercents = [
            {
                percent: 5,
                display: '5%',
                tag: ''
            },
            {
                percent: 7.5,
                display: '7.5%',
                tag: ''
            }
        ];

        var getDextrosePercents = function () {
            return dextrosePercents;
        };

        return {
            getDextrosePercents: getDextrosePercents
        };
    };

    angular.module('app')
        .factory('dataService', dataService);
}());