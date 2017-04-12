/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tables')
      .controller('TablesPageCtrl', TablesPageCtrl);

  /** @ngInject */
  function TablesPageCtrl($http,$scope, $filter, editableOptions, editableThemes) {

    $scope.smartTablePageSize = 10;
      $http.get('http://localhost:3000/admin/vault')
          .then(function(response) {
              $scope.smartTableData=[];
              response.data.forEach(function (element) {
                var ligne ={};
                ligne.idTransaction=element.ref.txhash;
                ligne.inputi="input";
                ligne.outputi="output";
                ligne.inputParty=element.state.data.amount.token.issuer.party;
                ligne.outputParty=element.state.data.owner;
                ligne.commandType="CommandType";
                ligne.totalValue=element.state.data.amount.quantity;
                console.log(ligne);
                $scope.smartTableData.push(ligne);
              });

    $scope.editableTableData = $scope.smartTableData;
          });




    $scope.showGroup = function(user) {
      if(user.group && $scope.groups.length) {
        var selected = $filter('filter')($scope.groups, {id: user.group});
        return selected.length ? selected[0].text : 'Not set';
      } else return 'Not set'
    };

    $scope.showStatus = function(user) {
      var selected = [];
      if(user.status) {
        selected = $filter('filter')($scope.statuses, {value: user.status});
      }
      return selected.length ? selected[0].text : 'Not set';
    };


    $scope.removeUser = function(index) {
      $scope.users.splice(index, 1);
    };

    $scope.addUser = function() {
      $scope.inserted = {
        id: $scope.users.length+1,
        name: '',
        status: null,
        group: null
      };
      $scope.users.push($scope.inserted);
    };

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';


  }

})();
