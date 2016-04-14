angular.module('akjch')
    .controller('signinCtrl', ['$scope', function($scope){

        $scope.send = function(user){
            console.log(user);

        }
    }]);
