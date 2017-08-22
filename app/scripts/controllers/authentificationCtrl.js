'use strict';

angular.module('ordersApp')
    .controller('authentificationCtrl', function($state){
        $state.go('home');
});
