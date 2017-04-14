(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('DashboardPieChartCtrl', DashboardPieChartCtrl);

    /** @ngInject */
    function DashboardPieChartCtrl($scope, $http, $timeout, baConfig, baUtil) {


        var balance = {};
        var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);


        $http.get('http://localhost:3000/admin/bank/transactions')
            .then(function(response) {

console.log(response.data);
                var nbr =response.data.length;
                console.log("nbr trans"+ nbr)

        $http.get('http://localhost:3000/admin/balance')
            .then(function(response) {
                console.log(response.data);
                var balance=response.data

                if(balance.USD === undefined) {
                    balance.USD={quantity:0,token:"USD"};
                }

                if(balance.EUR === undefined) {
                    balance.EUR={quantity:0,token:"EUR"};
                }

                $scope.chart = {
                    color: pieColor,
                    description: 'BALANCE',
                    quantity: balance.USD.quantity,
                    token:balance.USD.token,
                    quantity1: balance.EUR.quantity,
                    token1:balance.EUR.token,
                    nbr:nbr
                };

            });
            });
        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }

        function loadPieCharts() {
            $('.chart').each(function () {
                var chart = $(this);
                chart.easyPieChart({
                    easing: 'easeOutBounce',
                    onStep: function (from, to, percent) {
                        $(this.el).find('.percent').text(Math.round(percent));
                    },
                    barColor: chart.attr('rel'),
                    trackColor: 'rgba(0,0,0,0)',
                    size: 84,
                    scaleLength: 0,
                    animation: 2000,
                    lineWidth: 9,
                    lineCap: 'round',
                });
            });

            $('.refresh-data').on('click', function () {
                updatePieCharts();
            });
        }

        function updatePieCharts() {
            $('.pie-charts .chart').each(function(index, chart) {
                $(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
            });
        }

        $timeout(function () {
            loadPieCharts();
            updatePieCharts();
        }, 1000);
    }
})();