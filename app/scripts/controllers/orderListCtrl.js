'use strict';

module.exports = function($scope, $state) {
    //Go Back To Dashboard View :
    $scope.goToDashboard = function goToDashboard(){
        $state.go('dashboard');
    };

    //Initialisation des variables :
    $scope.dateCheck = true;
    $scope.descriptionCheck = false;

    //Getting All Orders from Mocks
    $scope.orders = [
        {
            Id: "0001",
            Name: "Order One",
            OrderNr: "4000024",
            Status: "REL  MANC NMAT PRC  SETC",
            PriorityNr: "1",
            Description: "",
            LocationNr: "M01-0G-01-01-SLDO",
            EquipmentNr: "",
            CustomerNr: "",
            ContactPersonNr: "",
            StartDate: "20151002",
            StartTime: "PT11H00M00S",
            FinishDate: "20151002",
            FinishTime: "PT13H00M00S",
            LongText: "",
            WorkCenter: "FM-01-02"
        },
        {
            Id: "0002",
            Name: "Order Two",
            OrderNr: "4000025",
            Status: "REL  MANC NMAT PR SETC",
            PriorityNr: "2",
            Description: "",
            LocationNr: "M01-0G-01-01-SLDO",
            EquipmentNr: "",
            CustomerNr: "",
            ContactPersonNr: "",
            StartDate: "20171030",
            StartTime: "PT11H00M00S",
            FinishDate: "20171002",
            FinishTime: "PT13H00M00S",
            LongText: "",
            WorkCenter: "FM-01-02"
        }
    ];

    //Sort on Customer :
    $scope.customerToggle = function customerToggle() {
        $scope.descriptionCheck = true;
        $scope.dateCheck = false;
    }

    //Sort on Date :
    $scope.dateToggle = function dateToggle() {
        $scope.dateCheck = true;
        $scope.descriptionCheck = false;
    }

    //Affichage console :
    console.log("contrôleur orderListCtrl chargé !");
};
