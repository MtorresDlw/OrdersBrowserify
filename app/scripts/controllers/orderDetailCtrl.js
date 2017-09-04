'use strict';

module.exports = function($scope, $state) {

    //Navigate Back to the Dashboard :
    $scope.goToDashboard = function() {
        $state.go('dashboard');
    }

    console.log("contrôleur orderDetailCtrl chargé !");
}
