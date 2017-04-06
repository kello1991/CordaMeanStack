(function () {
    'use strict';

    angular.module('BlurAdmin.pages.form')
        .controller('PanelsCtrl', PanelsCtrl);

    /** @ngInject */
    function PanelsCtrl($scope, $http) {
        $http.get('http://localhost:10009/api/example/me')
            .then(function(response) {
            $scope.vault = response.data;
            console.log($scope.vault);
        });


    }
})

