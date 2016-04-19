//TODO: Figure out a way to add more data in the tooltip if time is left. Don't get lost in the API
//TODO: See if you can fix rangeSelector to show right.
//TODO: figure out a way to make input dates better

angular.module('akjch')
    .controller('compareCtrl', ['$scope', 'portfolioFactory', 'stockFactory',function($scope, portfolioFactory, stockFactory){

        $scope.chartloaded=false;
        function insertIntoSeries(symbol, cell){
            $scope.chartConfig.series.forEach(function(series){
                if(series.name === symbol){
                    series.data.push([Date.parse(cell["timestamp"]),cell.close, {high:cell.high}]);


                   /* series.data.push({
                        y: cell.close,
                        high:cell.high,
                        low:cell.low,
                        day:cell.tradingDay,
                        volume:cell.volume
                    });*/
                }
            });

        }
        function drawChart(stocks, symList){
            $scope.chartConfig.series = [];// clearing previous series
            console.log('trigger redrawing chart now');
            //Pre-adding only names in the series for better find for insertIntoSeries
            symList.forEach(function(symbol){
                $scope.chartConfig.series.push({
                    name:symbol,
                    data:[],
                    high:'',
                    low:'',
                    volume:''
                });
            });
            console.log($scope.chartConfig.series);
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
            });

        //populate master stock list
        stockFactory.getStockList()
            .then(function(data){
                $scope.MasterStocks = data;
            });

        //get historical data
        $scope.getHistory = function(stocks,portfolio){
            $scope.chartConfig.loading=true;
            $scope.chartloaded=true;
            $scope.chartConfig.title=portfolio;
            portfolioFactory.getHistoricalData(stocks)
                .then(function(response){
                    var symList=[];
                    $scope.historicalData=response;
                    $scope.chartConfig.loading=false;
                    response.forEach(function(elem){
                        symList.push(elem.results[0].symbol);

                    });

                    drawChart(response, symList);
                    }, function err(){
                    console.log('Something went wrong');
                    });
            };
        $scope.addIndividualStock = function(stock){
            var data=[];
            for(var i = 0; i< 251; i++ ) {
                data.push((Math.random() * (210.20 - 152.20) + 210.20).toFixed(2));
            }

            $scope.chartConfig.series.push({
                name:'Individual - '+stock,
                data:data
            });
            $scope.ch = $scope.chartConfig.getHighcharts();
            $scope.ch.redraw();
        };




        $scope.chartConfig = {
            options: {
                chart: {
                    type: 'line',

                },
                rangeSelector: {
                    selected: 4
                },

                theme:{
                    fill:"white",
                    stroke:'silver',
                    r:0,
                    states:{
                        hover:{
                            fill:'#41739D',
                            style:{
                                color:'white'
                            }

                        }
                    }

                },


             },
            rangeSelector: {
                selected: 4
            },
            series:[],
            title: {
                text:''
            },
            loading: false,
            useHighStocks:true
        };



        


    }]);