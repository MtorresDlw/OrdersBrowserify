'use strict';

angular.module('ordersApp.directives', [])
    .directive('priorityFilter', require('./priorityFilter'))
    .directive('orderTemplate', require('./orderTemplate'))
    .directive('headerData', require('./headerData'))
    .directive('markingTemplate', require('./markingTemplate'))
    .directive('equipementsTemplate', require('./equipementsTemplate'));
