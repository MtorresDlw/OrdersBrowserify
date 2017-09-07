'use strict';

module.exports = function($scope, $state, $stateParams) {

    //Récupération de notre objet JSON :
    $scope.order = $stateParams.order;
    //console.log($scope.order);

    $scope.order.Customer = $stateParams.order.Customer;
    //console.log($scope.order);

    /****************************************/

    /*
    * MENU NAVIGATION
    */

    //Navigate Back to the Dashboard :
    $scope.goToDashboard = function() {
        $state.go('dashboard');
    }

    //Navigate Back to the OrderList :
    $scope.goToOrderList = function() {
        $state.go('orderList');
    }

    //Navigate to the Order Information :
    $scope.goToOrderInfo = function() {
        $state.go('orderInfo');
    }

    //Navigate to the Service Report :
    $scope.goToServiceReport = function() {
        $state.go('orderServiceReport');
    }

    /****************************************/

    //Filter uppercase :
    $scope.Equipements = "Equipements";
    $scope.Markings = "Markings";

    $scope.gotoAttachment = function gotoAttachment() {
        //TODO
    }

    /****************************************/

    //Test call orderDetailCtrl in console mode :
    console.log("contrôleur orderDetailCtrl chargé !");
}
