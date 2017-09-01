'use strict';

module.exports = function($scope, $uibModalInstance) {

    //$scope.$uibModalInstance = $uibModalInstance;

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    console.log("contrôleur modalInstanceCtrl chargé !");
}
