(function () {
  'use strict';

  angular.module('BlurAdmin.pages.form')
      .controller('WizardCtrl', WizardCtrl);

  /** @ngInject */
  function WizardCtrl($scope) {
   var vm = this;

      console.log ("wizart 2 ctrl");
   console.log("hello its me ");
    vm.personalInfo = {};
    vm.productInfo = {};
    vm.shipment = {};

    vm.arePersonalInfoPasswordsEqual = function () {
      return vm.personalInfo.confirmPassword && vm.personalInfo.password == vm.personalInfo.confirmPassword;
    };
  }

})();

