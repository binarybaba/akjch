angular.module('akjch')
    .controller('portfoliosCtrl', ['$scope', function($scope){
        $scope.portfolios= [
        {
            "name": "Portfolio 1",
            "set":['A','B']
        },
        {
            "name":"Portfolio 2",
            "set":['C','D']
        }
        ];
        console.log('Portfolio controller working');
    }]);