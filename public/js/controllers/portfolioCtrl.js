angular.module('akjch')
    .controller('portfoliosCtrl', ['$scope', 'stockFactory', function($scope, stockFactory){


        /*Populating view with stock list from db*/
        stockFactory.getStockList()
            .then(function(data){
                $scope.MasterStocks = data;
        });

        //pulled in from user's database Wire up service to send the list.
        $scope.tempPortfolios= [
            {
                "name":"dummyPortfolios",
                "stocks":['ABC','NASDAQ']
            }
        ];

        //list of all portfolios pulled in from service.
         /*   $scope.MasterStocks = [
            {
                "ticker":"SPYV",
                "name":"S&P 500"
            },
            {
                "ticker":"DDD",
                "name":"3D Systems Corporation"
            },
            {
                "ticker":"MMM",
                "name":"3M Company"
            },
            {
                "ticker":"WBAI",
                "name":"500.com Limited"
            },
            {
                "ticker":"WUBA",
                "name":"500.com Limited"
            },
            {
                "ticker":"AHC",
                "name":"A.H Belo Corporation"
            },
            {
                "ticker":"ATEN",
                "name":"A10 Networks"
            },
            {
                "ticker":"AAC",
                "name":"AAc Holdings"
            },
            {
                "ticker":"AIR",
                "name":"AAR Corp"
            },
            {
                "ticker":"AAN",
                "name":"Aaron Corp"
            },
            {
                "ticker":"ABB",
                "name":"ABB Ltd"
            }
];*/

        function findPortfolio(){
              var filtered = $scope.tempPortfolios.filter(function(val){
                  return val.name == $scope.portfolioName;
              });
             return filtered;
         }

        $scope.addP = function(stock,portfolio){
            //TODO: if portfolio exists { 
            //TODO:      if stock !exist { 
            //TODO:             push stock.ticker
            //TODO:            }else {
            //TODO:                  do nothing
            //TODO:            } 
            //TODO:    else {
            //TODO:          add new portfolio with stock
            //TODO:         }
            
            console.log(stock.ticker);
            console.log(portfolio);
        }



        $scope.addPortfolio = function(stock){
             var pf = findPortfolio();
            //if the portfolio name is already present ie if the user is updating a portfolio

            if(pf.length != 0){
                $scope.tempPortfolios.map(function(elem){
                    if(elem.name == $scope.portfolioName){
                        elem.stocks.push(stock.ticker);
                    }
                })
            }
            else {
                 var newPortfolio = {
                     "name":$scope.portfolioName,
                     "stocks":[]
                 }
                newPortfolio.stocks.push(stock.ticker);
                $scope.tempPortfolios.push(newPortfolio);
             }








            /*var newPortfolio = {
                "name":$scope.portfolioName,
                "stocks":[]
            }
            newPortfolio.stocks.push(stock);*/

            /*$scope.tempPortfolios.name=$scope.name;
            $scope.tempPortfolios*/
            /*$scope.tempPortfolios.map(function(portfolio){
                //if user is udating already present portfolio
                if(portfolio.name.toLowerCase() == $scope.portfolioName.toLowerCase()){
                    portfolio.stocks.push(stock);
                }
            });*/
            
            /*$scope.tempPortfolios.push(newPortfolio);*/

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

    }]);