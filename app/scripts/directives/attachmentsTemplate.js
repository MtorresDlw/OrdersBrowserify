'use strict';

module.exports = function() {
        return {
            restrict: 'EA',
            templateUrl: 'views/templates/attachmentsTemplate.html',
            transclude: true,
            controller: 'orderDetailCtrl'
        };
};
