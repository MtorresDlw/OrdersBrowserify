'use strict';

angular.module('ordersApp.directives', [])
    .directive('priorityFilter', require('./priorityFilter'))
    .directive('orderTemplate', require('./orderTemplate'));
