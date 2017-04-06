(function () {
    'use strict';

    angular.module('BlurAdmin.pages.maps')
        .controller('LeafletPageCtrl', LeafletPageCtrl);

    /** @ngInject */
    function LeafletPageCtrl($scope, $http) {


        var balance = {};
        $http.get('http://localhost:3000/admin/balance')
            .then(function (response) {
                balance = response.data;
                $scope.chart = {
                    color: pieColor,
                    description: 'balance',
                    quantity: balance.USD.quantity,
                    token: balance.USD.token,
                    icon: 'money',
                }
                ;
            });
    }
})
