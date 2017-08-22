'use strict';

require('angular');
require('angular-touch');
require('angular-animate');
require('angular-ui-router');
require('angular-ui-bootstrap');

require('./controllers');

angular
    .module('ordersbrowserify', ['ngAnimate', 'ngTouch', 'ui.bootstrap', 'ui.router', 'ordersbrowserify.controllers'])
    .config(function($stateProvider){

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/login.html',
                controller: 'authentificationCtrl'
            });

        $state.go('home');
});
