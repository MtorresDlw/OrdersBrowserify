'use strict';

angular
    .module('ordersbrowserify', ['ui.router'])
    .config(function($stateProvider){

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/login.html',
                controller: 'authentificationCtrl'
            });

        $state.go('home');
});
