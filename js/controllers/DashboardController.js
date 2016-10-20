angular
  .module("pointApp")
  .controller('DashboardController', ['$scope','$location', 'DashboardService',
  function($scope, $location, DashboardService) {
    $scope.greeting = 'Hola!';
    $scope.scienceData = [];
    $scope.form = {};
    $scope.yearOptions = [
        { name: '2007', value: '2007' },
        { name: '2008', value: '2008' },
        { name: '2009', value: '2009' },
        { name: '2010', value: '2010' }
        ];

    $scope.form = {year : $scope.yearOptions[0].value};


    $scope.formSubmit = function(form) {
      console.log(form.year)
      DashboardService.formSubmit(form).then(function(data) {
        console.log(data)
        $scope.portfolio = data.noData;
        $scope.scienceData = data.result;
      });
    };

    $scope.options3 = {
      chart: {
          type: 'lineWithFocusChart',
          // height: 500,
          margin : {
              top: 40,
              right: 40,
              bottom: 100,
              left: 100
          },
          x: function(d){ return d.x; },
          y: function(d){ return Math.round(d.y * 10) / 10; },
          useInteractiveGuideline: true,
          duration: 1500,
          forceY:([-10, 10]),
          color: d3.scale.category10().range(),
          dispatch: {
              stateChange: function(e){ console.log("stateChange"); },
              changeState: function(e){ console.log("changeState"); },
              tooltipShow: function(e){ console.log("tooltipShow"); },
              tooltipHide: function(e){ console.log("tooltipHide"); }
          },
          xAxis: {
              axisLabel: 'Year',
          },
          yAxis: {
              axisLabel: 'Cumulative Change in GHG Emissions Intensity',
              tickFormat: function(d) {
                return d3.format(',.f')(d) + '%';
              },
              axisLabelDistance: 10,
          },
          y2Axis: {
            tickFormat: function(d) {
              return d3.format(',.2f')(d);
            }
          }
      },
      title: {
          enable: true,
          text: 'Investment Portfolio Relative to Science-Based Trajectory',
          css: {
            color: 'darkblue',
            'font-size': '1.1rem',
            'margin-left': '10vw',
            position: 'absolute',
            'margin-top': '5vh'
          }
      },
  };
}]);
