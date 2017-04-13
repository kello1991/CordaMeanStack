/**
 * @author v.lugovsky
 * created on 22.04.2016
 * @deprecated
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.form')
      .controller('OldSelectpickerPanelCtrl', OldSelectpickerPanelCtrl);

  /** @ngInject */
  function OldSelectpickerPanelCtrl($http,$scope) {
    var vm = this;
    console.log("hello from ctrl")
      vm.standardSelectItems = [
          { label: 'helo', value: 1 },
          { label: 'helloo 2', value: 2 },
          { label: 'Option 3', value: 3 },
          { label: 'Option 4', value: 4 },
      ];
      $scope.items=[];
      $http.get('http://localhost:3000/admin/peers')
          .then(function(response) {
              var i=1;

            if(response.data)
              {response.data.forEach(function (element) {
                $scope.items.push({label:element,value:i})
                  i++;
              })};
          });

      console.log($scope.items);
      vm.standardSelectItems=$scope.items;
    vm.selectWithSearchItems = [
      { label: 'Hot Dog, Fries and a Soda', value: 1 },
      { label: 'Burger, Shake and a Smile', value: 2 },
      { label: 'Sugar, Spice and all things nice', value: 3 },
      { label: 'Baby Back Ribs', value: 4 },
    ];

    vm.groupedSelectItems = [
      { label: 'Group 1 - Option 1', value: 1, group: 'Group 1' },
      { label: 'Group 2 - Option 2', value: 2, group: 'Group 2' },
      { label: 'Group 1 - Option 3', value: 3, group: 'Group 1' },
      { label: 'Group 2 - Option 4', value: 4, group: 'Group 2' },
    ];

  }

})();
