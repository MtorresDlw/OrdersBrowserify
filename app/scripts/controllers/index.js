'use strict';

angular.module('ordersApp.controllers', [])
    .controller('authentificationCtrl', require('./authentificationCtrl'))
    .controller('contactCtrl', require('./contactCtrl'))
    .controller('dashboardCtrl', require('./dashboardCtrl'))
    .controller('modalInstanceCtrl', require('./modalInstanceCtrl'))

    .controller('notificationListCtrl', require('./notificationListCtrl'))

    .controller('orderListCtrl', require('./orderListCtrl'))
    .controller('orderDetailCtrl', require('./orderDetailCtrl'));
