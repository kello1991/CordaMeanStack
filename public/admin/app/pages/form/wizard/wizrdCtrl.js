(function () {
    'use strict';

    angular.module('BlurAdmin.pages.form')
        .controller('WizardCtrl', WizardCtrl);

    /** @ngInject */
    function WizardCtrl($scope, $http) {
        var vm = this;

        var notaries = {};
        var peers = {};
        var identity = {};
        $http.get('http://localhost:10009/api/example/notaries').then(function (response) {
            notaries = response.data;
            $scope.notaries = notaries[0];
            console.log(notaries[0]);

        });


        $http.get('http://localhost:10009/api/example/peers').then(function (response) {
            peers = response.data;
            $scope.peers = peers;
            console.log(peers);
        });


        $http.get('http://localhost:10009/api/example/me').then(function (response) {
            identity = response.data;
            $scope.identity = identity;

            console.log(identity);


        });


    }


})();

