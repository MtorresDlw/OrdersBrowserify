'use strict';

angular.module('ordersApp.controllers', [])
    .controller('authentificationCtrl', require('./authentificationCtrl'))
    .controller('contactCtrl', require('./contactCtrl'))
    .controller('dashboardCtrl', require('./dashboardCtrl'))

    .controller('notificationListCtrl', require('./notificationListCtrl'))

    .controller('orderListCtrl', require('./orderListCtrl'));
