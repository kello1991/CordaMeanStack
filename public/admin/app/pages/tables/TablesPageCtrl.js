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
      $http.get('http://localhost:3000/admin/bank/transactions')
          .then(function(response) {
            console.log(response);
              $scope.contTableData=[];
            $scope.smartTableData=[];
              if(response.data){
              response.data.forEach(function (element) {
                var ligne ={};
                ligne.idTransaction=element.idTran;
                ligne.inputParty=element.sender;
                ligne.outputParty=element.receiver;
                ligne.commandType=element.type;
                ligne.totalValue=element.amount;
                $scope.smartTableData.push(ligne);
                if(element.type=="Exchange"){
                    $scope.contTableData.push(
                        {
                            amount:element.amount,
                            currency:"USD",
                            eq:element.quantity+" "+element.product});
                }
              });}


    $scope.editableTableData = $scope.smartTableData;






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


          });
  }

})();
