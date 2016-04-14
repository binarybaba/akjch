angular.module('akjch')
    .controller('signupCtrl', ['$scope', '$http', function($scope, $http){
        $scope.send = function(user){
            $http({
                method:'POST',
                url:'/auth/signup'
            }).then(function success(res){console.log(res);}, function err(res){console.log(res);});
        }
    }]);