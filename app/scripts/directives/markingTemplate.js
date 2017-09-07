'use strict';

module.exports = function() {
        return {
            restrict: 'EA',
            templateUrl: 'views/templates/markingTemplate.html',
            transclude: true,
            controller: 'orderDetailCtrl'
        };
};
