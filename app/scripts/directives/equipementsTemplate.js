'use strict';

module.exports = function() {
        return {
            restrict: 'EA',
            templateUrl: 'views/templates/equipementsTemplate.html',
            transclude: true,
            controller: 'orderDetailCtrl'
        };
};
