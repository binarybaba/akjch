angular.module('akjch')
    .factory('stockFactory', ['$http', function($http){
        var stockSvc = {
            getStockList: function(){
                var promise = $http({
                    url: '/dashboard/stocklist',
                    method:'GET'
                }).then(function(response){
                        return response.data;
                    });
                return promise;
            }
        };

        return stockSvc;
    }]);