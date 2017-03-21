
(function (){

    function controller($scope, $q, dataService){
        $scope.Loading = dataService.state.isLoading;

        // TODO parameters
        dataService.getData().then(function (data){
            Init(data);
            // Some buffer object
        }, function (err){
            console.log(err);
        });    

        

    }
    controller.$inject = ['$scope', '$q', 'dataService'];


    angular.module(globalModuleName).controller('testCtrl', controller);
})();