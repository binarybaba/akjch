angular.module('akjch')
    .controller('portfoliosCtrl', ['$scope', 'stockFactory', function($scope, stockFactory){
        $scope.portfolioName='';
        stockFactory.async()
            .then(function(data){
                $scope.MasterStocks = data;
        });

        //pulled in from user's database Wire up service to send the list.
        $scope.userPortfolios= [
            {
                "name":"P1",
                "stocks":['a','b']
            },
            {
                "name":"P2",
                "stocks":['c','d']
            },
            {
                "name":"P3",
                "stocks":['e','f']
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
              var filtered = $scope.userPortfolios.filter(function(val){
                  return val.name == $scope.portfolioName;
              });
             return filtered;
         }

        $scope.addPortfolio = function(stock){
             var pf = findPortfolio();
            //if user is updating a portfolio
            if(pf.length != 0){
                $scope.userPortfolios.map(function(elem){
                    if(elem.name == $scope.portfolioName){
                        elem.stocks.push(stock);
                    }
                })

            }
            else {
                 var newPortfolio = {
                     "name":$scope.portfolioName,
                     "stocks":[]
                 }
                newPortfolio.stocks.push(stock);
                $scope.userPortfolios.push(newPortfolio);
             }









            /*var newPortfolio = {
                "name":$scope.portfolioName,
                "stocks":[]
            }
            newPortfolio.stocks.push(stock);*/

            /*$scope.userPortfolios.name=$scope.name;
            $scope.userPortfolios*/
            /*$scope.userPortfolios.map(function(portfolio){
                //if user is udating already present portfolio
                if(portfolio.name.toLowerCase() == $scope.portfolioName.toLowerCase()){
                    portfolio.stocks.push(stock);
                }
            });*/
            
            /*$scope.userPortfolios.push(newPortfolio);*/

        };
        console.log('Portfolio controller working');
    }]);