(function () {
    'use strict';

    angular.module('BlurAdmin.pages.form')
        .controller('WizardCtrl', WizardCtrl);

    /** @ngInject */
    function WizardCtrl($scope) {
        var vm = this;

        console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
        vm.personalInfo = {};
        vm.productInfo = {};
        vm.shipment = {};

        $http.get('http://localhost:10005/api/example/me').then(function (response) {
            var notaries = response.data;
            vm.notaries = notaries.me;
            console.log(notaries);

        });


        vm.arePersonalInfoPasswordsEqual = function () {
            return vm.personalInfo.confirmPassword && vm.personalInfo.password == vm.personalInfo.confirmPassword;
        };
    }

})();

