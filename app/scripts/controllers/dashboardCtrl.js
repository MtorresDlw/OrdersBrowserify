'use strict';

module.exports = function($scope, $state) {

    $scope.syncing = false;

    //Go to ORDERS :
    $scope.viewOrders = function viewOrders() {
        $state.go('orderList');
    };

    //Go to NOTIFICATIONS :
    $scope.viewNotifications = function viewNotifications() {
        $state.go('notificationList');
    };

    //On assigne pageClass à celle de la vue courante :
    $scope.pageClass = "page-dashboard";

    //Test appel du contrôleur dans la console :
    console.log("contrôleur dashboardCtrl chargé !");
}
