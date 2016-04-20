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
            console.log('chartcongif.series');
            /*console.log($scope.chartConfig.series);*/
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
                   /* console.log('Got this response from getHistoricalData');
                    console.log(response);*/
                    drawChart(response, symList);
                    }, function err(){
                    console.log('Something went wrong');
                    });
            };
        $scope.addIndividualStock = function(stock){
            var series = [];
            var data=[];
            var len = $scope.chartConfig.series[0].data.length;
            console.log('length is '+len);
            //var startDate = $scope.chartConfig.series[0].data[0][0];
            /*console.log($scope.chartConfig.series[0].data[0]);*/

            for(var i = 0; i< len;i++){
                var dummy = [];
                dummy.push($scope.chartConfig.series[0].data[i][0]); //date
                dummy.push(parseFloat((Math.random() * (210.20 - 142.20) + 142.20).toFixed(2))); //datavalue
                dummy.push({}); //experimental extra object
                data.push(dummy);
            }
            $scope.chartConfig.series.push({
                data:data,
                high:'',
                id:'individual-'+stock,
                name:'Individual - '+stock,
                volume:''
            });
            console.log(series);
            console.log($scope.chartConfig.series);

            /*for(var i = 0; i< len; i++ ) {
                console.log($scope.chartConfig.series[0]);
                /!*data.push((Math.random() * (210.20 - 152.20) + 210.20).toFixed(2));*!/
            }*/

            /*$scope.chartConfig.series.push({
                name:'Individual - '+stock,
                data:data
            });*/
            /*$scope.ch = $scope.chartConfig.getHighcharts();
            $scope.ch.redraw();*/
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