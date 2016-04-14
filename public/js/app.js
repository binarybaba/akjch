angular.module('akjch', ['ui.router'])



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

    })


