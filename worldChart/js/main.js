let app = angular.module('myApp', ['ng']);
app.controller('monitoringCtrl', function ($scope, $http) {

  let convertData = function (data) {//data attackData
    let res = [];
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      let fromCoord = item[1].geoCoordMap;
      let toCoord = item[0].geoCoordMap;
      if (fromCoord && toCoord) {
        res.push({
          fromName: item[1].name,
          toName: item[0].name,
          coords: [fromCoord, toCoord]
        });
      }
    }
    //console.log(res);
    return res;
  };
  let worldChart = echarts.init(document.getElementById('worldMap'));
  $http.post('data/world.json').then(function(respones){
    // need svg pic
    let path = 'image://img/arrows.png';//effect：{ symbol：path }
    let color = ['#ffd7cf ', '#ffbdb0 ', '#ff7c61  ', '#f40011 '];
    // 颜色设置，依次加深
    let attackData = respones.data.attackData;
    let worldData = respones.data.worldData;
    let mySeries = [
      { //线
        type: 'lines',
        zlevel: 1,
        effect: {
          show: false,
          period: 6,
          trailLength: 0.7,
          //color: '#fff',
          symbolSize: 3
        },
        lineStyle: {
          normal: {
            color: color[3],
            width: 0,
            curveness: 0.2,
            type: "dashed"
          }
        },
        data: convertData(attackData)
      },
      {
        type: 'lines',
        zlevel: 2,
        effect: {
          show: true,
          period: 6,
          trailLength: 0.6,
          // 移动点的类型
          symbol: 'pin',
          symbolSize: 15
        },
        lineStyle: {
          normal: {
            color: color[3],
            width: 1,
            opacity: 1,
            //线的弧度
            curveness: 0.15,
            type: "dashed"
          }
        },
        data: convertData(attackData)
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 3,
        rippleEffect: {
          brushType: 'stroke',//fill
        },
        label: {
          normal: {
            //国家名称是否显示
            show: false,
            position: 'right',
            formatter: '{b}'
          }
        },
        
        // 攻击点涟漪大小设置
        symbolSize: function (val) {
            // China geoCoor
            if(val[0] === "116.20" && val[1] === "39.55"){
                return 25;
            }else{
                return 12;
            }
          //return val[2] / 16;
        },
        itemStyle: {
          normal: {
            color: color[3]
            //可以分开给颜色
            //  function (params) {
            //   let tmp = params.data.value[2];
            //   if (tmp < 100) {
            //     return '#FF7010';
            //   } else if (tmp > 150) {
            //     return '#5CB819'
            //   } else {
            //     return '#FFB812';
            //   }
            // }
          }
        },
        data: attackData.map(function (data) {
          return {
            name: data[1].name,
            value: data[1].geoCoordMap.concat([data[1].value])
            // x坐标, y坐标 ,value值
          };
        })
      },
      {
        type: 'map',
        map: 'world',
        zoom: 1.2,
        zlevel: 1,
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: true,
          }
        },
        // 缩放
        roam: false,
        itemStyle: {
          normal: {
            borderColor: '#fff',
            color: function (params) {
              let tmp = params.value;
              if (tmp < 10000) {
                return color[0];
              } else if (tmp > 100000) {
                return color[2];
              } else {
                return color[1];
              }
            }
          },
          emphasis: {
            show: false,
            areaColor:'#ff5613'
          }
        },
        data: worldData.map(function (item) {
          return {
            name: item.name,
            value: item.value
          };
        })
      },
    ];
    worldChart.setOption({
      backgroundColor: '#fff',
      color:color,
      geo: {
        map: 'world',
        zoom: 1.2,
        show: false
      },
      series: mySeries
    });
  });

  window.onresize = function () {
    worldChart.resize();
    lineChart.resize();
  };


  //折线图
  $scope.lineOption = function (data){
    return {
      legend: {
        left: 'center',
        top: '3%',
        data: [{
          name: '日志数',
          icon: 'reac',
          textStyle: {
            color: 'red'
          }
        }, {
          name: '报警数',
          icon: 'reac',
          textStyle: {
            color: '#FFB810'
          }
        }]
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.type
      },
      yAxis: {
        type: 'value'
      },
      color: ['#FF4D07', '#FFB810'],
      series: [
        {
          name: '日志数',
          type: 'line',
          // symbol:'diamond',
          // symbolSize:15,
          stack: '日志数总量',
          data: data.logNums,
          lineStyle:{
            normal:{
              width:3,
            }
          }
        },
        {
          name: '报警数',
          type: 'line',
          stack: '报警数总量',
          lineStyle:{
            normal:{
              width:3,
            }
          },
          data: data.alarmNums
        }
      ]
    }
  }
  let lineChart = echarts.init(document.getElementById('line'));
  $http.post('data/lineChart.json').then(function (responses) {
    lineChart.setOption($scope.lineOption(responses.data[1]));
  });

  //year month day data switch
  $scope.switch = function (e, id) {
    $(e.target).addClass('active').siblings('.active').removeClass('active');
    $http.post('data/lineChart.json').then(function (responses) {
      lineChart.setOption($scope.lineOption(responses.data[id]));
    });
  };

  
  // alarm details
  $scope.dataList = '';
  $http.post('data/alarmDetails.json').then(function (data) {
    $scope.dataList = data.data;
  }, function (err) {
    console.log(err)
  });
})