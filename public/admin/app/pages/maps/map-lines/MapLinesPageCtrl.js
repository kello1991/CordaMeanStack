/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.maps')
        .controller('MapLinesPageCtrl', MapLinesPageCtrl);

    /** @ngInject */
    function MapLinesPageCtrl($scope,baConfig,$timeout, layoutPaths,$http) {
        $scope.a={};
        var controller ={name:"controller",latitude : 51.52, longitude : -0.1,location:"London"};
        var NodeA ={name:"NodeA",latitude : 51.52, longitude : -0.1,location:"London"};
        var NodeB ={name:"NodeB",latitude : 40.67, longitude : -73.94,location:"New York"};
        var NodeC ={name:"NodeC",latitude : 37.77, longitude : -122.45,location:"San Francisco"};

        $http.get('http://localhost:3000/admin/me').then(function (response) {
            var identity = response.data;
            $scope.a.identity = identity;

            var layoutColors = baConfig.colors;
            // svg path for target icon
            var targetSVG = 'M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,' +
                '9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,' +
                '9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,' +
                '3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z';
// svg path for plane icon
            var planeSVG = 'M19.671,8.11l-2.777,2.777l-3.837-0.861c0.362-0.505,0.916-1.683,' +
                '0.464-2.135c-0.518-0.517-1.979,0.278-2.305,' +
                '0.604l-0.913,0.913L7.614,8.804l-2.021,2.021l2.232,1.061l-0.082,0.082l1.701,1.701l0.688-0.687l3' +
                '.164,1.504L9.571,18.21H6.413l-1.137,1.138l3.6,0.948l1.83,1.83l0.947,' +
                '3.598l1.137-1.137V21.43l3.725-3.725l1.504,3.164l-0.687,' +
                '0.687l1.702,1.701l0.081-0.081l1.062,2.231l2.02-2.02l-0.604-2.' +
                '689l0.912-0.912c0.326-0.326,1.121-1.789,0.604-2.306c-0.452-0.452-1' +
                '.63,0.101-2.135,0.464l-0.861-3.838l2.777-2.777c0.94' +
                '7-0.947,3.599-4.862,2.62-5.839C24.533,4.512,20.618,7.163,19.671,8.11z';



            $timeout(function() {
                var map = AmCharts.makeChart( 'map-lines', {
                    type: 'map',
                    theme: 'blur',
                    dataProvider: {
                        map: 'worldLow',
                        linkToObject: 'Controller',
                        images: [ {
                            id: 'Controller',
                            svgPath: targetSVG,
                            title: controller.name+" ["+controller.latitude+" , "+controller.longitude+"]",
                            latitude: controller.latitude,
                            longitude: controller.longitude,
                            scale: 1.5,
                            zoomLevel: 1,
                            zoomLongitude: -20.1341,
                            zoomLatitude: 49.1712,

                            lines: [ {
                                latitudes: [ controller.latitude, NodeA.latitude ],
                                longitudes: [ controller.longitude, NodeA.longitude ]},
                                {
                                latitudes: [ controller.latitude, NodeB.latitude ],
                                longitudes: [ controller.longitude, NodeB.longitude ]},
                                {
                                 latitudes: [ controller.latitude, NodeC.latitude ],
                                 longitudes: [ controller.longitude, NodeC.longitude ]
                                }
                                ],

                            images: [ {
                                label: 'Flights from Controller',
                                svgPath: planeSVG,
                                left: 100,
                                top: 45,
                                labelShiftY: 5,
                                labelShiftX: 5,
                                color: layoutColors.defaultText,
                                labelColor: layoutColors.defaultText,
                                labelRollOverColor: layoutColors.defaultText,
                                labelFontSize: 20
                            }, {
                                label: 'show flights from issuer',
                                left: 106,
                                top: 70,
                                labelColor: layoutColors.defaultText,
                                labelRollOverColor: layoutColors.defaultText,
                                labelFontSize: 11,
                                linkToObject: 'Issuer'
                            } ]
                        },

                            {
                                id: 'Issuer',
                                svgPath: targetSVG,
                                title: NodeC.name+" ["+NodeC.latitude+" , "+NodeC.longitude+"]",
                                latitude: NodeC.latitude,
                                longitude: NodeC.longitude,
                                scale: 1.5,
                                zoomLevel: 1,
                                zoomLongitude: 15.4492,
                                zoomLatitude: 50.2631,

                                lines: [ {
                                    latitudes: [ NodeC.latitude, NodeA.latitude ],
                                    longitudes: [ NodeC.longitude, NodeA.longitude ]
                                }, {
                                    latitudes: [ NodeC.latitude, NodeB.latitude ],
                                    longitudes: [ NodeC.longitude, NodeB.longitude ]
                                }, {
                                    latitudes: [ NodeC.latitude, controller.latitude ],
                                    longitudes: [ NodeC.longitude, controller.longitude ]
                                } ],

                                images: [ {
                                    label: 'Flights from Issuer',
                                    svgPath: planeSVG,
                                    left: 100,
                                    top: 45,
                                    labelShiftY: 5,
                                    labelShiftX: 5,
                                    color: layoutColors.defaultText,
                                    labelColor: layoutColors.defaultText,
                                    labelRollOverColor: layoutColors.defaultText,
                                    labelFontSize: 20
                                }, {
                                    label: 'show flights from Controller',
                                    left: 106,
                                    top: 70,
                                    labelColor: layoutColors.defaultText,
                                    labelRollOverColor: layoutColors.defaultText,
                                    labelFontSize: 11,
                                    linkToObject: 'Controller'
                                } ]
                            }, {
                                svgPath: targetSVG,
                                title: NodeB.name+" ["+NodeB.latitude+" , "+NodeB.longitude+"]",
                                latitude: NodeB.latitude,
                                longitude: NodeB.longitude
                            }, {
                                svgPath: targetSVG,
                                title: NodeA.name+" ["+NodeA.latitude+" , "+NodeA.longitude+"]",
                                latitude: NodeA.latitude,
                                longitude: NodeA.longitude
                            }
                        ]
                    },

                    areasSettings: {
                        unlistedAreasColor: layoutColors.info
                    },

                    imagesSettings: {
                        color: layoutColors.warningLight,
                        selectedColor: layoutColors.warning
                    },

                    linesSettings: {
                        color: layoutColors.warningLight,
                        alpha: 0.8
                    },


                    backgroundZoomsToTop: true,
                    linesAboveImages: true,

                    export: {
                        'enabled': true
                    },
                    pathToImages: layoutPaths.images.amMap
                } );
            }, 100);
        });

        $http.get('http://localhost:3000/admin/notaries').then(function (response) {
            var notaries = response.data;
            $scope.a.notaries = notaries;

            console.log(response.data)
        });
        $http.get('http://localhost:3000/admin/peers').then(function (response) {
            var peers = response.data;
            $scope.a.peers = peers;
        });
    }


})();
