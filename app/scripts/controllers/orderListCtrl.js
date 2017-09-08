'use strict';

module.exports = function($scope, $state, $http) {
    //Go Back To Dashboard View :
    $scope.goToDashboard = function goToDashboard(){
        $state.go('dashboard');
    };

    //Initialisation des variables :
    $scope.dateCheck = 'true';
    $scope.descriptionCheck = false;
    $scope.orderByReverse = false;

    //Getting All Order from Mocks
    $http.get('mocks/orders.json')
        .then(function success(response){
            $scope.orders = response.data;
    });

    //View the details of an Order :
    $scope.viewDetailsOrder = function viewDetailsOrder(order){
        $state.go('orderDetail', { order: order });
    };

    //Sort on Customer :
    $scope.customerToggle = function customerToggle() {
        $scope.orderByReverse = !$scope.orderByReverse;
        $scope.descriptionCheck = true;
        $scope.dateCheck = false;
    };

    //Sort on Date :
    $scope.dateToggle = function dateToggle() {
        $scope.dateCheck = 'true';
        $scope.descriptionCheck = false;
        $scope.orderByReverse = !$scope.orderByReverse;
    };

    //Affichage console :
    console.log("contrôleur orderListCtrl chargé !");
};
