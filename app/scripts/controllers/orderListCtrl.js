'use strict';

module.exports = function($scope, $state) {
    //Go Back To Dashboard View :
    $scope.goToDashboard = function goToDashboard(){
        $state.go('dashboard');
    };

    //Affichage console :
    console.log("contrôleur orderListCtrl chargé !");
}
