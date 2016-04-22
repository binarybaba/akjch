angular.module('akjch', ['ui.router', 'angular-toArrayFilter', 'highcharts-ng'])



    .config(function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state('signUp', {
                url:'/signup',
                templateUrl:'partials/signup.html',
                controller:'signupCtrl'
            })

            .state('signIn', {
                url:'/signin',
                templateUrl:'partials/signin.html',
                controller:'signinCtrl'
            })
            .state('portfolios', {
                url:'/portfolios',
                templateUrl:'/partials/portfolios.html',
                controller:'portfoliosCtrl'
            })
            .state('compare',  {
                url:'/compare',
                templateUrl:'/partials/compare.html',
                controller:'compareCtrl'
            })
            

    });


