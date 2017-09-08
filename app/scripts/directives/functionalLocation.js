'use strict';

module.exports = function() {
        return {
            restrict: 'EA',
            templateUrl: 'views/templates/functionalLocation.html',
            transclude: true,
            controller: 'orderDetailCtrl'
        };
};
