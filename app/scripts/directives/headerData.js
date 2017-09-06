'use strict';

module.exports = function() {
        return {
            restrict: 'EA',
            templateUrl: 'views/templates/headerData.html',
            transclude: true,
            controller: 'orderDetailCtrl'
        };
};
