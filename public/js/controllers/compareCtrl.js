angular.module('akjch')
    .controller('compareCtrl', ['$scope', 'portfolioFactory', function($scope, portfolioFactory){

        function insertIntoSeries(symbol, cell){
                console.log($scope.chartConfig.series);

        }
        function drawChart(stocks, symList){
            console.log('trigger redrawing chart now');
            //Pre-adding only names in the series for better find for insertIntoSeries
            symList.forEach(function(symbol){
                $scope.chartConfig.series.push({
                    name:symbol
                });
            })
            stocks.forEach(function(elem){
                var sym = elem.results[0].symbol;
                elem.results.forEach(function(cell){
                    insertIntoSeries(sym, cell);
                })
            })

        }
        //populate user's portfolio list
        portfolioFactory.getPortfolioList()
            .then(function success(response){
                $scope.portfolios = response;
            })

        
        //get historical data
        $scope.getHistory = function(stocks){
            $scope.chartConfig.loading=true;
            portfolioFactory.getHistoricalData(stocks)
                .then(function(response){
                    var symList=[];
                    $scope.historicalData=response;
                    $scope.chartConfig.loading=false;
                    console.log('>>>>>>>');
                    console.log(response);
                    response.forEach(function(elem){
                        symList.push(elem.results[0].symbol);
                    })
                    drawChart(response, symList);
                    }, function err(){
                    console.log('Something went wrong');
                    });
            };

        $scope.chartConfig = {
            options: {
                chart: {
                    type: 'line'
                },
                rangeSelector:{
                    selected:1
                },

                tooltip:{
                    shared:true,

                    formatter: function () {
                        var s = $.each(this.points, function(i,point){
                            return '<p>'+point.point.something+'</p><hr/>';
                            //console.log(s);
                        })
                        return s.point.point.something;
                        // TODO : Update with return of all keys of all series
                        }


                }

            },
            /*series: [{
                name:'AHC',
                data: [{y:10, something:'dwd'}, {y:15, something:1}, {y:12, something:2}, {y:8, something:3}, {y:7, something:4}]
            },
                {
                    name:'demo2',
                    data:[{y:8, something:1}, {y:16, something:9}, {y:27, something:8}, {y:19, something:7},{y:21, something:11}]
                }],*/
            series:[],
            title: {
                text: 'Hello'
            },
            loading: false,
            useHighStocks:true
        }
        
        //initial date
        

        //populate data from
    }])