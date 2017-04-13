(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('DashboardPieChartCtrl', DashboardPieChartCtrl);

    /** @ngInject */
    function DashboardPieChartCtrl($scope, $http, $timeout, baConfig, baUtil) {


        var balance = {};
        var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
        $http.get('http://localhost:3000/admin/balance')
            .then(function(response) {

                if (response.data=={}){
                balance = response.data;

                $scope.chart = {
                    color: pieColor,
                    description: 'balance',
                    quantity: balance.USD.quantity,
                    token:balance.USD.token,
                    icon: 'money',
                };
                }else {
                    $scope.chart = {
                        color: pieColor,
                        description: 'balance',
                        quantity: "no balance found ",
                        token:"",
                        icon: 'money',
                    };

                }
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