(function () {
    'use strict';

    angular.module('BlurAdmin.pages.form')
        .controller('WizardCtrl', WizardCtrl);

    /** @ngInject */
    function WizardCtrl($scope) {
        var vm = this;

        console.log ("wizart 1 ctrl");
        vm.arePersonalInfoPasswordsEqual = function () {
            return vm.personalInfo.confirmPassword && vm.personalInfo.password == vm.personalInfo.confirmPassword;
        };
    }

})();

