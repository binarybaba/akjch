angular.module('akjch')
    .factory('portfolioFactory', ['$http', function($http){
        var url = '/dashboard/user/portfolios';
        var portfolioSvcs = {
            getPortfolioList: function(){
                var promise = $http({
                    url: url,
                    method: 'GET',
                }).then(function success(response){
                    return response.data;
                }, function err(response){
                    return response.data;
                });
                return promise;
            },
            postPortfolios: function(portfolios){
                var promise = $http({
                    url: url,
                    method: 'POST',
                    data:portfolios
                }).then(function success(response){
                    return response.data;
                }, function err(response){
                    return response.data;
                });
                return promise;
            },
            deletePortfolio: function (portfolio){
                var promise = $http({
                    url: url,
                    method:'PUT',
                    data:{"name":portfolio}
                }). then(function success(response){
                    console.log('got this data for delete from server '+response.data);
                    return response.data;
                }, function err(response){
                    return response.data;
                });
                return promise;
            },
            getHistoricalData: function(portfolio){
                var promise = $http({
                    url:'/dashboard/historical-data',
                    method:'POST',
                    data:portfolio
                }) .then(function success(response){
                    return response.data;
                }, function err(response){
                    return response.data;
                })
                return promise;
            }
        }

        return portfolioSvcs;
    }])