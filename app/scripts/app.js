'use strict';

require('angular');
require('angular-animate');
require('angular-touch');
require('angular-ui-bootstrap');
require('angular-ui-router');

require('./controllers');

angular
    .module('ordersApp', ['ngAnimate', 'ngTouch', 'ui.bootstrap','ui.router', 'ordersApp.controllers'])
    .config(function($stateProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/login.html',
                controller: 'authentificationCtrl'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'views/contact.html',
                controller: 'contactCtrl'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                controller: 'dashboardCtrl'
            });

    })
    .run(function($state) {
        $state.go('home');
});
