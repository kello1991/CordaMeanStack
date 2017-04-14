/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts.amCharts')
      .controller('LineChartCtrl', LineChartCtrl);

  /** @ngInject */
  function LineChartCtrl($scope, $http,baConfig, $element, layoutPaths) {
    var layoutColors = baConfig.colors;
    var id = $element[0].getAttribute('id');
    console.log("hello from ctrl stat");
      $http.get('http://localhost:3000/admin/bank/transactions')
          .then(function(response,err) {
            var data=[];
            if (err)
            { console.log(err)}
            response.data.forEach(function (element) {
              data.push({ year: element.date,
                  value: element.amount})
                console.log(data);
            })


              var lineChart = AmCharts.makeChart(id, {
                  type: 'serial',
                  theme: 'blur',
                  color: layoutColors.defaultText,
                  marginTop: 0,
                  marginRight: 15,
                  dataProvider: data,
                  valueAxes: [
                      {
                          axisAlpha: 0,
                          position: 'left',
                          gridAlpha: 0.5,
                          gridColor: layoutColors.border,
                      }
                  ],
                  graphs: [
                      {
                          id: 'g1',
                          balloonText: '[[value]]',
                          bullet: 'round',
                          bulletSize: 8,
                          lineColor: layoutColors.danger,
                          lineThickness: 1,
                          negativeLineColor: layoutColors.warning,
                          type: 'smoothedLine',
                          valueField: 'value'
                      }
                  ],
                  chartScrollbar: {
                      graph: 'g1',
                      gridAlpha: 0,
                      color: layoutColors.defaultText,
                      scrollbarHeight: 55,
                      backgroundAlpha: 0,
                      selectedBackgroundAlpha: 0.05,
                      selectedBackgroundColor: layoutColors.defaultText,
                      graphFillAlpha: 0,
                      autoGridCount: true,
                      selectedGraphFillAlpha: 0,
                      graphLineAlpha: 0.2,
                      selectedGraphLineColor: layoutColors.defaultText,
                      selectedGraphLineAlpha: 1
                  },
                  chartCursor: {
                      categoryBalloonDateFormat: 'YYYY',
                      cursorAlpha: 0,
                      valueLineEnabled: true,
                      valueLineBalloonEnabled: true,
                      valueLineAlpha: 0.5,
                      fullWidth: true
                  },
                  dataDateFormat: 'YYYY',
                  categoryField: 'year',
                  categoryAxis: {
                      minPeriod: 'YYYY',
                      parseDates: false,
                      minorGridAlpha: 0.1,
                      minorGridEnabled: true,
                      gridAlpha: 0.5,
                      gridColor: layoutColors.border,
                  },
                  export: {
                      enabled: true
                  },
                  creditsPosition: 'bottom-right',
                  pathToImages: layoutPaths.images.amChart
              });

              lineChart.addListener('rendered', zoomChart);
              if (lineChart.zoomChart) {
                  lineChart.zoomChart();
              }

              function zoomChart() {
                  lineChart.zoomToIndexes(Math.round(lineChart.dataProvider.length * 9), Math.round(lineChart.dataProvider.length * 0.55));
              }

          });





  }

})();
