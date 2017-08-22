'use strict';

require('angular-ui-router');

var modules = ['ui.router', 'ui.bootstrap'];

angular
    .module('ordersbrowserify', modules)

    .config(function($stateProvider){

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/login.html',
                controller: 'authentificationCtrl'
        });

        $state.go('home');
});
