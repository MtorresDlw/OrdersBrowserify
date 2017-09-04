'use strict';

module.exports = function() {
        return {
        //définition de la déclaration de la diective dans le HTML
        restrict: 'EA',
        //chargement du template depuis le fichier :
        templateUrl: 'views/filter/priorityFilter.html',
        //déplacement du template dans l'original :
        transclude: true,
        //ajout de la fonction "link()"
        link: function(scope, element, attrs) {
            scope.localFunction = function($event) {
                var selectedElements = document.getElementsByClassName('selected');
                for(var i = 0; i < selectedElements.length; i++) {
                    selectedElements[i].className = '';
                }

                //Initialisation de la variable
                var elementToSelect;
                if($event.target.className === 'navFa fa fa-exclamation-triangle' || $event.target.className === 'navFa fa fa-list') {
                    elementToSelect = $event.target.parentNode;
                }else{
                    elementToSelect = $event.target;
                }
                elementToSelect.className = 'selected';
            };
        }

    };
};
