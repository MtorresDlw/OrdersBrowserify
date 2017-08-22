'use strict';

angular.module('ordersbrowserify')
    .controller('authentificationCtrl', function($state){
        $state.go('home');
        console.log("Contrôleur Authentification chargé !");
});
