angular.module('akjch')
    .controller('signupCtrl', ['$scope', '$http', function($scope, $http){
        $scope.send = function(user){
            $http({
                method:'POST',
                url:'/auth/signup',
                data: user
            }); //removing promise for now. Redirecting from server
        }
    }]);