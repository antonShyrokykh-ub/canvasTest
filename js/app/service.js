
(function () {
    function dataService($http, $q) {
        var url = 'data/data1.json';

        var factory = {};
        var _state = { isLoading: false };
        // TODO some params
        function _getData() {
            var defered = $q.defer();
            $http.get(url).then(function (responce) {
                defered.resolve(responce.data);
            }, function (err) {
                console.log(err);
                defered.reject(err);
            })

            return defered.promise;
        }


        factory.state = _state;
        factory.getData = _getData;

        return factory;
    }

    dataService.$inject = ['$http', '$q'];

    angular.module(globalModuleName).factory('dataService', dataService);
})();