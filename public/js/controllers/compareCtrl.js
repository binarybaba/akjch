//TODO: Figure out a way to add more data in the tooltip if time is left. Don't get lost in the API
//TODO: See if you can fix rangeSelector to show right.
//TODO: figure out a way to make input dates better

angular.module('akjch')
    .controller('compareCtrl', ['$scope', 'portfolioFactory', 'stockFactory', 'highchartsNG', function($scope, portfolioFactory, stockFactory, highchartsNG){
        $scope.portfolioChartSelected=false;
        $scope.chartloaded=false;
        function insertIntoSeries(symbol, cell, stocksChart, portfolioChart){
                $scope.portfolioChartConfig.series.forEach(function(series){
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
        function drawPortfolioChart(stocks, symList){

                $scope.portfolioChartConfig.series = [];// clearing previous series
                console.log('trigger redrawing chart now');
                //Pre-adding only names in the series for better find for insertIntoSeries
                symList.forEach(function(symbol){
                    $scope.portfolioChartConfig.series.push({
                        name:symbol,
                        data:[]
                    });
                });
                /*console.log($scope.portfolioChartConfig.series);*/
                stocks.forEach(function(elem){
                    var sym = elem.results[0].symbol;
                    elem.results.forEach(function(cell){
                        insertIntoSeries(sym, cell);
                    })
                });


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
            $scope.stockChartSelected=false;
            $scope.portfolioChartSelected=true;
            $scope.portfolioChartConfig.loading=true;
            $scope.chartloaded=true;
            $scope.portfolioChartConfig.title.text= 'Portfolio - '+portfolio.name;
            portfolioFactory.getHistoricalData(stocks)
                .then(function(response){
                    var symList=[];
                    //$scope.historicalData=response;
                    $scope.portfolioChartConfig.loading=false;
                    response.forEach(function(elem){
                        symList.push(elem.results[0].symbol);

                    });
                   /* console.log('Got this response from getHistoricalData');
                    console.log(response);*/
                    drawPortfolioChart(response,symList);
                    }, function err(){
                    console.log('Something went wrong');
                    });
            };
        $scope.getMoreDetails = function(stock){
            $scope.stockChartSelected = true;
            $scope.portfolioChartSelected=false;
            $scope.stockChartConfig.series=[];// clearing the previous series
            $scope.stockChartConfig.loading = true;
            $scope.stockChartConfig.title.text = 'Historical Data for '+stock;
            var ar = []; //converting stock to 1 element array since server accepts arrays
            ar.push(stock);
            var series=[];
            portfolioFactory.getHistoricalData(ar)
                .then(function(response){
                    var results = response[0].results;
                    series.push({
                        name:stock,
                        data:[]
                    });
                    results.forEach(function(elem){
                        series[0].data.push({
                            y:elem.close,
                            high:elem.high,
                            low:elem.low,
                            open:elem.open,
                            tradingDay:elem.tradingDay,
                            volume:elem.volume
                        });

                    });
                    $scope.stockChartConfig.loading=false;
                    $scope.stockChartConfig.series = series;


                }, function(response){
                    console.log('Something went wrong'+response);
                });

        };


        $scope.addIndividualStock = function(stock){
            var data=[];
            var len = $scope.portfolioChartConfig.series[0].data.length;
            console.log('length is '+len);
            for(var i = 0; i< len;i++){
                var dummy = [];
                dummy.push($scope.portfolioChartConfig.series[0].data[i][0]); //date
                dummy.push(parseFloat((Math.random() * (11.20 - 10.20) + 10.20).toFixed(2))); //datavalue
                dummy.push({}); //experimental extra object for tooltip
                data.push(dummy);
            }
            $scope.portfolioChartConfig.series.push({
                data:data,
                id:'individual-'+stock,
                name:'Individual - '+stock

            });
            console.log($scope.portfolioChartConfig.series);

        };
        //TODO: Add toggle for individuals




        $scope.stockChartConfig = {
            options: {
                chart: {
                    height:600,
                    type: 'line',
                    zoomType: 'x'

                },

                subtitle: {
                    text: document.ontouchstart === undefined ?
                        'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                },
                tooltip:{
                    formatter: function(){
                        var h = this.point.high,
                            l = this.point.low,
                            o = this.point.open,
                            td= this.point.tradingDay,
                            v= this.point.volume;
                        
                        return '<em>'+td+'</em><br> High: <span style="color:#3E6617">'+h+'</span><br> Low: <span style="color:#991818">'+l+'</span><br> Open: <span style="color:#556D7D">'+o+'</span><br> Volume: <span style="color:#4A4C4D">'+v+'</span>'
                    }
                }


            },

            series:[],
            title: {
                text:''
            },
            loading: false,
            useHighStocks:false
        };
        highchartsNG.ready(function(){
            $scope.portfolioChartConfig = {
                options: {
                    chart: {
                        height:600,
                        type: 'line',
                        zoomType: 'x'

                    },
                    subtitle: {
                        text: document.ontouchstart === undefined ?
                            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                    },
                    navigator: {
                        enabled: true,
                        series: {
                            data: []
                        }
                    },
                    rangeSelector: {
                        enabled: true,
                        selected:4

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
        }, this)


    }]);