'use strict';

module.exports = function($scope, $state, $uibModal) {

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

    //Script Directive pour appeler un template mis en cache :
    $scope.open = function(size){
        var modalInstance = $uibModal.open({
            templateUrl: 'myModalContent.html',
            controller: 'modalInstanceCtrl',
            size: size
        });
        //$templateCache.get('iDModalContent.html');
    };

    //Test appel du contrôleur dans la console :
    console.log("contrôleur dashboardCtrl chargé !");
}
