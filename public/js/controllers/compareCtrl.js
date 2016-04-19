angular.module('akjch')
    .controller('compareCtrl', ['$scope', 'portfolioFactory', function($scope, portfolioFactory){
        portfolioFactory.getPortfolioList()
            .then(function success(response){
                $scope.portfolios = response;
                console.log(response)
            })
        
            //post selected portfolio to get historical data
            $scope.getHistory = function(stocks){
                portfolioFactory.getHistoricalData(stocks)
                    .then(function(response){
                        console.log(response);
                    })
            }
        
        
        //initial date
        

        //populate data from
    }])