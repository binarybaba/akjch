angular.module('akjch')
    .controller('portfoliosCtrl', ['$scope', 'stockFactory', 'portfolioFactory','$http', function($scope, stockFactory, portfolioFactory, $http){
        function findPortfolio(portf){
            var filtered = $scope.tempPortfolios.filter(function(val){
                return val.name === portf;
            });
            return filtered;
        }
        function findStock(stock){
            var results = [];
            $scope.tempPortfolios.filter(function(p){
                if(p.name === $scope.portfolioName){
                    results = p.stocks.filter(function(s){
                        return s === stock;
                    });
                }
            });
            return results;
        }
        
        /*Populating view with list of users portfolios*/
        var updateUserPortfolio = function(){
            portfolioFactory.getPortfolioList()
                .then(function(data){
                    $scope.userPortfolios = data;
                })
        }
        updateUserPortfolio();
        /*Populating view with stock list from db*/
        stockFactory.getStockList()
            .then(function(data){
                $scope.MasterStocks = data;
        });

        //Placeholder for temporary portfolios
        $scope.tempPortfolios= [
           /* {
                "name":"dummyPortfolios",
                "stocks":['ABC','NASDAQ']
            }*/
        ];

        $scope.addPortfolio = function(stock,portfolio){
            if($scope.portfolioName){ //cheap validation
                var pf = findPortfolio(portfolio);
                var sf = findStock(stock.ticker);

                if(pf.length != 0){ //if portfolio exists
                    if(sf.length===0){ // if stock not present, add it
                        $scope.tempPortfolios.map(function(p){
                            if(p.name === portfolio){
                                p.stocks.push(stock.ticker);
                            }
                        });
                    }
                }
                else{ //make a new portfolio and add the stock
                    var newPortfolio = {
                        "name":portfolio,
                        "stocks":[]
                    };
                    newPortfolio.stocks.push(stock.ticker);
                    $scope.tempPortfolios.push(newPortfolio);

                }
            }
        };

        $scope.removeStock = function(portfolio,stock){
            $scope.tempPortfolios.map(function(elem){
                if(elem.name == portfolio){
                    elem.stocks.map(function(stkElem){
                        if(stkElem === stock){
                            var index = elem.stocks.indexOf(stkElem)
                            elem.stocks.splice(index,1);
                        }
                    })
                }
            })
        };

        $scope.removePortfolio = function(name){
            $scope.tempPortfolios.map(function(elem){
                if(elem.name === name){
                    var index = $scope.tempPortfolios.indexOf(elem);
                    $scope.tempPortfolios.splice(index,1);
                }
            })
        };

        $scope.deletePortfolio = function(name){
            portfolioFactory.deletePortfolio(name)
                .then(function(response){
                    console.log('Success! '+response.data);
                    updateUserPortfolio();
                }, function err(response){
                    console.log('something went wrong: '+response.data);
                })
        };
        $scope.updatePortfolios = function(){
            portfolioFactory.postPortfolios($scope.tempPortfolios)
                .then(function(response){
                    console.log('Success!');
                    $scope.tempPortfolios=[];
                    updateUserPortfolio();
                }, function(response){
                    console.log('Something went wrong: '+response.data);
                });
            /*$http({
                url:'/dashboard/user/portfolios',
                method:'POST',
                data:$scope.tempPortfolios
            }).then(function(response){
                console.log(response);
                $scope.tempPortfolios=[];
            })*/

        }

    }]);