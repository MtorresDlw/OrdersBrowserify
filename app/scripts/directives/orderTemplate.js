'use strict';

module.exports = function() {
        return {
            restrict: 'EA',
            templateUrl: 'views/templates/orderTemplate.html',
            transclude: true,
            controller: 'orderListCtrl'
        };
};
