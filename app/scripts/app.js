'use strict';

require('angular');
require('angular-animate');
require('angular-touch');
require('angular-ui-bootstrap');
require('angular-ui-router');
//require("angular-translate");

require('./controllers');
require('./directives');

angular
    .module('ordersApp', ['ngAnimate', 'ngTouch', 'ui.bootstrap','ui.router', 'ordersApp.controllers', 'ordersApp.directives'])
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
            })
            .state('orderList', {
                url: '/order',
                templateUrl: 'views/orderList.html',
                controller: 'orderListCtrl'
            })
            .state('orderDetail', {
                url: '/orderDetail',
                templateUrl: 'views/orderDetail.html',
                controller: 'orderDetailCtrl'
            })
            .state('notificationList', {
                url: '/notification',
                templateUrl: 'views/notificationList.html',
                controller: 'notificationListCtrl'
            });

        //Languages Traduction :
        //$translateProvider.translations('en', require('../locales/en'));
        //$translateProvider.translations('fr', require('../locales/fr'));
        //$translateProvider.preferredLanguage('en');

    })
    .run(function($state) {
        $state.go('dashboard');
});
