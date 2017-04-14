(function() {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('baWizardCtrl', baWizardCtrl);

    /** @ngInject */
    function baWizardCtrl($scope,$http) {

        var vm = this;
        vm.tabs = [];
        vm.tabNum = 0;
        vm.progress = 0;
        //get  the sender
        $http.get("http://localhost:3000/admin/me").then(function (response,err) {
            if(err){
                console.log("err get sender");
            }
            $scope.sender=response.data.me;
            if($scope.sender=="NodeC"){
                $scope.itemsType=["Issue","Pay","Exchange","Exit"];
            }else{
                $scope.itemsType=[
                    "Pay",
                    "Exchange",
                    "Exit"
                ];

            }
        });
        $scope.itemsCurrency=["USD","EUR"];

        console.log("hello from ba wizard")
        $http.get('http://localhost:3000/admin/peers')
            .then(function(response) {
                var i=1;

                $scope.items=[];
                if(response.data)
                {response.data.forEach(function (element) {
                    $scope.items.push({label:element,value:i})
                    i++;
                })};

            });


        $scope.result="";


        vm.addTab = function(tab) {
            console.log("addTab")
            tab.setPrev(vm.tabs[vm.tabs.length - 1]);
            vm.tabs.push(tab);
            vm.selectTab(0);
        };

        $scope.$watch(angular.bind(vm, function () {
            return vm.tabNum;}), calcProgress);

        vm.selectTab = function (tabNum) {
            vm.tabs[vm.tabNum].submit();
            if (vm.tabs[tabNum].isAvailiable()) {
                vm.tabNum = tabNum;
                vm.tabs.forEach(function (t, tIndex) {
                    tIndex == vm.tabNum ? t.select(true) : t.select(false);
                });
            }
        };

        vm.isFirstTab = function () {

            return vm.tabNum == 0;
        };

        vm.isLastTab = function () {

            return vm.tabNum == vm.tabs.length - 1 ;
        };

        vm.nextTab = function () {

            vm.selectTab(vm.tabNum + 1)
        };

        vm.previousTab = function () {

            vm.selectTab(vm.tabNum - 1)
        };

        $scope.change1=function (item) {
            $scope.selectedReceiver=item
            console.log($scope.selectedReceiver);

        }

        $scope.show=false;
        $scope.change2=function (item) {
            $scope.commandType=item;
            console.log($scope.itemsType);
            if ($scope.commandType=="Exchange"){
                var len = $scope.items.length;
                $scope.items.push({label:$scope.sender,value:len+1});
            }
            if ($scope.commandType=="Issue"){

                $scope.show=true
                var len = $scope.items.length;
                $scope.items.push({label:$scope.sender,value:len+1});}
            else {$scope.show=false;}


        }
        $scope.change3=function (item) {


            $scope.amount=item;
            console.log($scope.amount);


        }

        $scope.change4=function (item) {
            $scope.currency=item
            console.log($scope.currency);

        }



        function calcProgress() {

            vm.progress = ((vm.tabNum + 1) / vm.tabs.length) * 100;
            console.log(vm.progress);
            console.log(vm.tabs);



            if(vm.progress==50&&$scope.commandType=="Exit"){
                vm.tabNum = 2;
                vm.selectTab(2);
            }
            // form complete
            if(vm.progress==100) {

                if ($scope.commandType=="Pay"){

                    $http.get("http://localhost:3000/admin/pay/"+$scope.selectedReceiver+"/"+$scope.amount)
                        .then(function(response,err) {
                            //get an err
                            if(err)
                            {
                                $scope.result="Failed Payment";
                            }
                            //insuf
                            if(response.data=="net.corda.core.flows.FlowException: net.corda.flows.CashException: Insufficient cash for spend"){
                                $scope.result="Insufficient cash for spend"
                            }
                            else {

                                console.log  (response.data);

                                // save for current Node
                                $http.put("http://localhost:3000/admin/bank/" +
                                    $scope.sender+"/" +
                                    response.data+"/"+
                                    $scope.commandType+"/"+
                                    $scope.amount+"/"+
                                    $scope.selectedReceiver+"/"+
                                    $scope.sender)
                                    .success(function (data) {
                                        console.log("saved mongo for current")

                                    })
                                    .error(function () {
                                        console.log("not saved mongo current");
                                    });
                                // save for receiver Node
                                $http.put("http://localhost:3000/admin/bank/" +
                                    $scope.selectedReceiver+"/" +
                                    response.data+"/"+
                                    $scope.commandType+"/"+
                                    $scope.amount+"/"+
                                    $scope.selectedReceiver+"/"+
                                    $scope.sender)
                                    .success(function (data) {
                                        console.log("saved mongo receiver")

                                    })
                                    .error(function () {
                                        console.log("not saved mongo receiver");
                                    });

                                $scope.result="Success Payment";
                            }
                        });


                }

                if ($scope.commandType=="Exchange"){
                    $http.get("http://localhost:3000/admin/exchange/"+$scope.selectedReceiver+"/"+$scope.amount)
                        .then(function(response,err) {
                            //get an err
                            if(err)
                            {
                                $scope.result="Failed Excahnge";
                            }
                            //ex
                            else {
                                var trid= response.data;
                                var port=""
                                if($scope.selectedReceiver=="NodeC"){
                                    port="10009";
                                }
                                if($scope.selectedReceiver=="NodeB"){
                                    port="10007";
                                }
                                if($scope.selectedReceiver=="NodeA"){
                                    port="10005";
                                }
                                var q;
                                var p;

                                $http.get("http://localhost:"+port+"/api/example/vault/"+trid)
                                    .then(function (response,err) {
                                        if(err){
                                            console.log(err)
                                        }else {
                                             q = response.data.state.data.amount.quantity;
                                             p=response.data.state.data.amount.token.product;
                                            console.log (p,q);
                                        }

                                    }).then(function () {



                                $http.put("http://localhost:3000/admin/bank/" +
                                    $scope.sender+"/" +
                                    response.data+"/"+
                                    $scope.commandType+"/"+
                                    $scope.amount+"/"+
                                    $scope.selectedReceiver+"/"+
                                    $scope.sender+"/"+
                                    q+"/"+ p)
                                    .success(function (data) {
                                        console.log("saved mongo")

                                    })
                                    .error(function () {
                                        console.log("not saved mongo");
                                    });

                                if($scope.sender!=$scope.selectedReceiver){
                                    // save for receiver Node
                                    $http.put("http://localhost:3000/admin/bank/" +
                                        $scope.selectedReceiver+"/" +
                                        response.data+"/"+
                                        $scope.commandType+"/"+
                                        $scope.amount+"/"+
                                        $scope.selectedReceiver+"/"+
                                        $scope.sender+"/"+
                                        q+"/"+ p)
                                        .success(function (data) {
                                            console.log("saved mongo receiver")

                                        })
                                        .error(function () {
                                            console.log("not saved mongo receiver");
                                        });
                                }

                                $scope.result="Success Excahnge";
                                });
                            }
                        });


                }
                if ($scope.commandType=="Exit"){
                    $http.get("http://localhost:3000/admin/exit/"+$scope.amount)
                        .then(function(response,err) {
                            //get an err
                            if(err)
                            {
                                $scope.result="Failed Exit";
                            }
                            if(response.data=="net.corda.core.flows.FlowException: net.corda.flows.CashException: Exiting more cash than exists")
                            {
                                $scope.result="SExiting more cash than exists";
                            }
                            //exit
                            else {

                                console.log  (response.data.slice(21, 85));

                                var b = "--";
                                $http.put("http://localhost:3000/admin/bank/" +
                                    $scope.sender+"/" +
                                    response.data+"/"+
                                    $scope.commandType+"/"+
                                    $scope.amount+"/"+
                                    b+"/"+
                                    $scope.sender)
                                    .success(function (data) {
                                        console.log("saved mongo")

                                    })
                                    .error(function () {
                                        console.log("not saved mongo");
                                    });

                                $scope.result="Success Payment";
                            }
                        });



                }
                if ($scope.commandType=="Issue"){
                    $http.get("http://localhost:3000/admin/issue/"+$scope.selectedReceiver+"/"+$scope.amount+"/"+$scope.currency)
                        .then(function(response,err) {
                            //get an err
                            if(err)
                            {
                                $scope.result="Failed Issue";
                            }
                            //issue
                            else {

                                console.log  (response.data);

                                $http.put("http://localhost:3000/admin/bank/" +
                                    $scope.sender+"/" +
                                    response.data+"/"+
                                    $scope.commandType+"/"+
                                    $scope.amount+"/"+
                                    $scope.selectedReceiver+"/"+
                                    $scope.sender)
                                    .success(function (data) {
                                        console.log("saved mongo")

                                    })
                                    .error(function () {
                                        console.log("not saved mongo");
                                    });

                                if($scope.sender!=$scope.selectedReceiver){
                                    // save for receiver Node
                                    $http.put("http://localhost:3000/admin/bank/" +
                                        $scope.selectedReceiver+"/" +
                                        response.data+"/"+
                                        $scope.commandType+"/"+
                                        $scope.amount+"/"+
                                        $scope.selectedReceiver+"/"+
                                        $scope.sender)
                                        .success(function (data) {
                                            console.log("saved mongo receiver")

                                        })
                                        .error(function () {
                                            console.log("not saved mongo receiver");
                                        });
                                }
                                $scope.result="Success Issue";
                            }
                        });


                }

            };
        }
    }
})();