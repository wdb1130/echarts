let app = angular.module('myApp', ['ng']);
app.controller('monitoringCtrl', function ($scope, $http) {

  // 攻击路线起点与终点数据生成函数
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
    return res;
  };
  let worldChart = echarts.init(document.getElementById('worldMap'));
  let color = ['#ffd7cf ', '#ffbdb0 ', '#ff7c61  ', '#f40011 '];
  
  // 用来中英文转换，使地图可以识别中文数据
  let nameMap = {
    'Afghanistan': '阿富汗',
    'Singapore': '新加坡',
    'Angola': '安哥拉',
    'Albania': '阿尔巴尼亚',
    'United Arab Emirates': '阿联酋',
    'Argentina': '阿根廷',
    'Armenia': '亚美尼亚',
    'French Southern and Antarctic Lands': '法属南半球和南极领地',
    'Australia': '澳大利亚',
    'Austria': '奥地利',
    'Azerbaijan': '阿塞拜疆',
    'Burundi': '布隆迪',
    'Belgium': '比利时',
    'Benin': '贝宁',
    'BurkinaFaso': '布基纳法索',
    'Bangladesh': '孟加拉国',
    'Bulgaria': '保加利亚',
    'TheBahamas': '巴哈马',
    'Bosnia and Herzegovina': '波斯尼亚和黑塞哥维那',
    'Belarus': '白俄罗斯',
    'Belize': '伯利兹',
    'Bermuda': '百慕大',
    'Bolivia': '玻利维亚',
    'Brazil': '巴西',
    'Brunei': '文莱',
    'Bhutan': '不丹',
    'Botswana': '博茨瓦纳',
    'Central African Republic': '中非共和国',
    'Canada': '加拿大',
    'Switzerland': '瑞士',
    'Chile': '智利',
    'China': '中国',
    'Ivory Coast': '象牙海岸',
    'Cameroon': '喀麦隆',
    'Democratic Republic of the Congo': '刚果民主共和国',
    'Republic of the Congo': '刚果共和国',
    'Colombia': '哥伦比亚',
    'Costa Rica': '哥斯达黎加',
    'Cuba': '古巴',
    'Northern Cyprus': '北塞浦路斯',
    'Cyprus': '塞浦路斯',
    'Czech Republic': '捷克共和国',
    'Germany': '德国',
    'Djibouti': '吉布提',
    'Denmark': '丹麦',
    'Dominican Republic': '多明尼加共和国',
    'Algeria': '阿尔及利亚',
    'Ecuador': '厄瓜多尔',
    'Egypt': '埃及',
    'Eritrea': '厄立特里亚',
    'Spain': '西班牙',
    'Estonia': '爱沙尼亚',
    'Ethiopia': '埃塞俄比亚',
    'Finland': '芬兰',
    'Fiji': '斐',
    'Falkland Islands': '福克兰群岛',
    'France': '法国',
    'Gabon': '加蓬',
    'United Kingdom': '英国',
    'Georgia': '格鲁吉亚',
    'Ghana': '加纳',
    'Guinea': '几内亚',
    'Gambia': '冈比亚',
    'Guinea Bissau': '几内亚比绍',
    'Equatorial Guinea': '赤道几内亚',
    'Greece': '希腊',
    'Greenland': '格陵兰',
    'Guatemala': '危地马拉',
    'French Guiana': '法属圭亚那',
    'Guyana': '圭亚那',
    'Honduras': '洪都拉斯',
    'Croatia': '克罗地亚',
    'Haiti': '海地',
    'Hungary': '匈牙利',
    'Indonesia': '印尼',
    'India': '印度',
    'Ireland': '爱尔兰',
    'Iran': '伊朗',
    'Iraq': '伊拉克',
    'Iceland': '冰岛',
    'Israel': '以色列',
    'Italy': '意大利',
    'Jamaica': '牙买加',
    'Jordan': '约旦',
    'Japan': '日本',
    'Kazakhstan': '哈萨克斯坦',
    'Kenya': '肯尼亚',
    'Kyrgyzstan': '吉尔吉斯斯坦',
    'Cambodia': '柬埔寨',
    'South Korea': '韩国',
    'Kosovo': '科索沃',
    'Kuwait': '科威特',
    'Laos': '老挝',
    'Lebanon': '黎巴嫩',
    'Liberia': '利比里亚',
    'Libya': '利比亚',
    'Sri Lanka': '斯里兰卡',
    'Lesotho': '莱索托',
    'Lithuania': '立陶宛',
    'Luxembourg': '卢森堡',
    'Latvia': '拉脱维亚',
    'Morocco': '摩洛哥',
    'Moldova': '摩尔多瓦',
    'Madagascar': '马达加斯加',
    'Mexico': '墨西哥',
    'Macedonia': '马其顿',
    'Mali': '马里',
    'Myanmar': '缅甸',
    'Montenegro': '黑山',
    'Mongolia': '蒙古',
    'Mozambique': '莫桑比克',
    'Mauritania': '毛里塔尼亚',
    'Malawi': '马拉维',
    'Malaysia': '马来西亚',
    'Namibia': '纳米比亚',
    'New Caledonia': '新喀里多尼亚',
    'Niger': '尼日尔',
    'Nigeria': '尼日利亚',
    'Nicaragua': '尼加拉瓜',
    'Netherlands': '荷兰',
    'Norway': '挪威',
    'Nepal': '尼泊尔',
    'New Zealand': '新西兰',
    'Oman': '阿曼',
    'Pakistan': '巴基斯坦',
    'Panama': '巴拿马',
    'Peru': '秘鲁',
    'Philippines': '菲律宾',
    'Papua New Guinea': '巴布亚新几内亚',
    'Poland': '波兰',
    'Puerto Rico': '波多黎各',
    'North Korea': '北朝鲜',
    'Portugal': '葡萄牙',
    'Paraguay': '巴拉圭',
    'Qatar': '卡塔尔',
    'Romania': '罗马尼亚',
    'Russia': '俄罗斯',
    'Rwanda': '卢旺达',
    'Western Sahara': '西撒哈拉',
    'Saudi Arabia': '沙特阿拉伯',
    'Sudan': '苏丹',
    'South Sudan': '南苏丹',
    'Senegal': '塞内加尔',
    'Solomon Islands': '所罗门群岛',
    'Sierra Leone': '塞拉利昂',
    'El Salvador': '萨尔瓦多',
    'Somaliland': '索马里兰',
    'Somalia': '索马里',
    'Republic of Serbia': '塞尔维亚',
    'Suriname': '苏里南',
    'Slovakia': '斯洛伐克',
    'Slovenia': '斯洛文尼亚',
    'Sweden': '瑞典',
    'Swaziland': '斯威士兰',
    'Syria': '叙利亚',
    'Chad': '乍得',
    'Togo': '多哥',
    'Thailand': '泰国',
    'Tajikistan': '塔吉克斯坦',
    'Turkmenistan': '土库曼斯坦',
    'East Timor': '东帝汶',
    'Trinidad and Tobago': '特里尼达和多巴哥',
    'Tunisia': '突尼斯',
    'Turkey': '土耳其',
    'United Republic of Tanzania': '坦桑尼亚',
    'Uganda': '乌干达',
    'Ukraine': '乌克兰',
    'Uruguay': '乌拉圭',
    'United States of America': '美国',
    'Uzbekistan': '乌兹别克斯坦',
    'Venezuela': '委内瑞拉',
    'Vietnam': '越南',
    'Vanuatu': '瓦努阿图',
    'West Bank': '西岸',
    'Yemen': '也门',
    'South Africa': '南非',
    'Zambia': '赞比亚',
    'Zimbabwe': '津巴布韦'
  };

  // 攻击数据，被攻击点以及攻击点数据
  let attackData = [
    [
      {name: "中国", geoCoordMap: ["116.20", "39.55"]},
      {name: "阿尔巴尼亚", value: "195", geoCoordMap: ["19.49", "41.18"]}
    ],
    [
      {name: "中国", geoCoordMap: ["116.20", "39.55"]},
      {name: "缅甸", value: "149", geoCoordMap: ["96.20", "16.45"]}
    ],
    [
      {name: "中国", geoCoordMap: ["116.20", "39.55"]},
      {name: "美国", value: "120", geoCoordMap: ["-77.02", "39.91"]}
    ],
    [
      {name: "中国", geoCoordMap: ["116.20", "39.55"]}, 
      {name: "巴西", value: "70", geoCoordMap: ["-47.55", "-15.47"]}
    ],
    [
      {name: "中国", geoCoordMap: ["116.20", "39.55"]}, 
      {name: "俄罗斯", value: "60", geoCoordMap: ["37.35", "55.45"]}
    ]
  ];

  // 世界各国的value值 可以用来设置国家所在区域的颜色
  let worldData = [
    {name: "阿富汗", value: "28397"},
    {name: "安哥拉", value: "19549"},
    {name: "阿尔巴尼亚", value: "3150"},
    {name: "UnitedArabEmirates", value: " 8441"},
    {name: "阿根廷", value: "40374"},
    {name: "亚美尼亚", value: "2963"},
    {name: "法属南半球和南极领地", value: " 268"},
    {name: "澳大利亚", value: "22404000"},
    {name: "奥地利", value: "8401"},
    {name: "阿塞拜疆", value: "9094"},
    {name: "布隆迪", value: "9232"},
    {name: "比利时", value: "10941"},
    {name: "贝宁", value: "9509"},
    {name: "布基纳法索", value: "15540"},
    {name: "孟加拉国", value: "151125"},
    {name: "保加利亚", value: "7389"},
    {name: "巴哈马", value: "66402"},
    {name: "波斯尼亚和黑塞哥维那", value: " 3845"},
    {name: "白俄罗斯", value: "9491"},
    {name: "伯利兹", value: "308"},
    {name: "百慕大", value: "64"},
    {name: "玻利维亚", value: "716"},
    {name: "巴西", value: "222"},
    {name: "文莱", value: "27"},
    {name: "不丹", value: "716"},
    {name: "博茨瓦纳", value: "1969"},
    {name: "中非共和国", value: "4349"},
    {name: "加拿大", value: "3412600"},
    {name: "瑞士", value: "7830"},
    {name: "智利", value: "17150"},
    {name: "中国", value: "888"},
    {name: "象牙海岸", value: "60508"},
    {name: "喀麦隆", value: "20624"},
    {name: "刚果民主共和国", value: " 62191"},
    {name: "刚果共和国", value: " 3573"},
    {name: "哥伦比亚", value: "46444"},
    {name: "哥斯达黎加", value: "4669"},
    {name: "古巴", value: "11281"},
    {name: "北塞浦路斯", value: "1"},
    {name: "塞浦路斯", value: "1103"},
    {name: "捷克共和国", value: "10553"},
    {name: "德国", value: "83017"},
    {name: "吉布提", value: "834"},
    {name: "丹麦", value: "5550"},
    {name: "多明尼加共和国", value: "10016"},
    {name: "阿尔及利亚", value: "37062"},
    {name: "厄瓜多尔", value: "15001"},
    {name: "埃及", value: "78075"},
    {name: "厄立特里亚", value: "5741"},
    {name: "西班牙", value: "46182"},
    {name: "爱沙尼亚", value: "1298"},
    {name: "埃塞俄比亚", value: "87095"},
    {name: "芬兰", value: "5367"},
    {name: "斐", value: "860"},
    {name: "福克兰群岛", value: "49"},
    {name: "法国", value: "63230"},
    {name: "加蓬", value: "1556"},
    {name: "英国", value: "62066"},
    {name: "格鲁吉亚", value: "4388"},
    {name: "加纳", value: "24262"},
    {name: "几内亚", value: "10876"},
    {name: "冈比亚", value: "1680"},
    {name: "几内亚比绍", value: "10876"},
    {name: "赤道几内亚", value: "696"},
    {name: "希腊", value: "11109"},
    {name: "格陵兰", value: "56"},
    {name: "危地马拉", value: "14341"},
    {name: "法属圭亚那", value: "231"},
    {name: "圭亚那", value: "786"},
    {name: "洪都拉斯", value: "7621"},
    {name: "克罗地亚", value: "4338"},
    {name: "海地", value: "9896"},
    {name: "匈牙利", value: "10014"},
    {name: "印尼", value: "240676"},
    {name: "印度", value: "120564"},
    {name: "爱尔兰", value: "4467"},
    {name: "伊朗", value: "240676"},
    {name: "伊拉克", value: "30962"},
    {name: "冰岛", value: "318000"},
    {name: "以色列", value: "7420"},
    {name: "意大利", value: "60508"},
    {name: "牙买加", value: "2741"},
    {name: "约旦", value: "6454"},
    {name: "日本", value: "127352"},
    {name: "哈萨克斯坦", value: "15921"},
    {name: "肯尼亚", value: "40909"},
    {name: "吉尔吉斯斯坦", value: "5334"},
    {name: "柬埔寨", value: "14364"},
    {name: "韩国", value: "51452"},
    {name: "科索沃", value: "97"},
    {name: "科威特", value: "2991"},
    {name: "老挝", value: "6395"},
    {name: "黎巴嫩", value: "4341"},
    {name: "利比里亚", value: "3957"},
    {name: "利比亚", value: "6040"},
    {name: "斯里兰卡", value: "20758"},
    {name: "莱索托", value: "2008"},
    {name: "立陶宛", value: "3068"},
    {name: "卢森堡", value: "507"},
    {name: "拉脱维亚", value: "2090"},
    {name: "摩洛哥", value: "31642"},
    {name: "摩尔多瓦", value: "103"},
    {name: "马达加斯加", value: "21079"},
    {name: "墨西哥", value: "117886"},
    {name: "马其顿", value: "507"},
    {name: "马里", value: "13985"},
    {name: "缅甸", value: "51931"},
    {name: "黑山", value: "620"},
    {name: "蒙古", value: "2712"},
    {name: "莫桑比克", value: "23967"},
    {name: "毛里塔尼亚", value: "3609"},
    {name: "马拉维", value: "15013"},
    {name: "马来西亚", value: "28275"},
    {name: "纳米比亚", value: "2178"},
    {name: "新喀里多尼亚", value: "246"},
    {name: "尼日尔", value: "15893"},
    {name: "尼日利亚", value: "159707"},
    {name: "尼加拉瓜", value: "5822"},
    {name: "荷兰", value: "16615"},
    {name: "挪威", value: "4891"},
    {name: "尼泊尔", value: "26846"},
    {name: "新西兰", value: "4368"},
    {name: "阿曼", value: "2802"},
    {name: "巴基斯坦", value: "173149"},
    {name: "巴拿马", value: "3678"},
    {name: "秘鲁", value: "29262"},
    {name: "菲律宾", value: "93444"},
    {name: "巴布亚新几内亚", value: "6858"},
    {name: "波兰", value: "38198"},
    {name: "波多黎各", value: "3709"},
    {name: "北朝鲜", value: "1"},
    {name: "葡萄牙", value: "10589"},
    {name: "巴拉圭", value: "6459"},
    {name: "卡塔尔", value: "1749"},
    {name: "罗马尼亚", value: "21861"},
    {name: "俄罗斯", value: "21861"},
    {name: "卢旺达", value: "10836"},
    {name: "西撒哈拉", value: "514"},
    {name: "沙特阿拉伯", value: "27258"},
    {name: "苏丹", value: "35652"},
    {name: "南苏丹", value: "9940"},
    {name: "塞内加尔", value: "12950"},
    {name: "所罗门群岛", value: "526"},
    {name: "塞拉利昂", value: "5751"},
    {name: "萨尔瓦多", value: "6218"},
    {name: "索马里兰", value: "9636"},
    {name: "索马里", value: "9636"},
    {name: "塞尔维亚", value: "3573"},
    {name: "苏里南", value: " 524"},
    {name: "斯洛伐克", value: "5433"},
    {name: "斯洛文尼亚", value: "2054"},
    {name: "瑞典", value: "938200"},
    {name: "斯威士兰", value: "1193"},
    {name: "叙利亚", value: "7830"},
    {name: "乍得", value: "11720"},
    {name: "多哥", value: "6306"},
    {name: "泰国", value: "66402"},
    {name: "塔吉克斯坦", value: "7627"},
    {name: "土库曼斯坦", value: "5041"},
    {name: "东帝汶", value: "10016"},
    {name: "特里尼达和多巴哥", value: "1328"},
    {name: "突尼斯", value: "10631"},
    {name: "土耳其", value: "72137"},
    {name: "坦桑尼亚", value: "44973"},
    {name: "乌干达", value: "33987"},
    {name: "乌克兰", value: "46050"},
    {name: "乌拉圭", value: "3371"},
    {name: "美国", value: "31247"},
    {name: "乌兹别克斯坦", value: "27769"},
    {name: "委内瑞拉", value: "236"},
    {name: "越南", value: "89047"},
    {name: "瓦努阿图", value: "236"},
    {name: "西岸", value: "13"},
    {name: "也门", value: "22763"},
    {name: "南非", value: "51452"},
    {name: "赞比亚", value: "13216"},
    {name: "津巴布韦", value: "13076"}
  ]


  let mySeries = [
    // 攻击线的设置
    {
      type: 'lines',
      zlevel: 2,
      // 攻击头部样式设置
      effect: {
        show: true,
        period: 6,
        // 尾巴长度
        trailLength: 0.6,
        // 移动点的类型
        symbol: 'pin',
        symbolSize: 15
      },
      // 攻击轨迹线的样式设置
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

    // 攻击点样式设置
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
          show: true,
          position: 'right',
          formatter: '{b}'
        }
      },
      // 攻击点涟漪大小设置
      symbolSize: 15,
      itemStyle: {
        normal: {
          color: color[3]
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

    //被攻击点样式设置
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
          show: true,
          position: 'right',
          formatter: '{b}'
        }
      },
      // 被攻击点涟漪大小设置
      symbolSize: 25,
      itemStyle: {
        normal: {
          color: color[3]
        }
      },
      data: attackData.map(function (data) {
        return {
          name: data[0].name,
          value: data[0].geoCoordMap
          // x坐标, y坐标
        };
      })
    },

    // 地图样式设置
    {
      type: 'map',
      map: 'world',
      zoom: 1.2,
      zlevel: 1,
      nameMap: nameMap,
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
      // 各国家颜色设置
      itemStyle: {
        normal: {
          borderColor: '#fff',
          color: function (params) {
            let tmp = params.value;
            console.log(tmp);
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
          areaColor: '#ff5613'
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
    color: color,
    // 需要坐标地图绘制
    geo: {
      map: 'world',
      // 地图缩放，需和map中的设置一致
      zoom: 1.2,
      show: false
    },
    series: mySeries
  });

  window.onresize = function () {
    worldChart.resize();
    lineChart.resize();
  };


  //折线图
  $scope.lineOption = function (data) {
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
          lineStyle: {
            normal: {
              width: 3,
            }
          }
        },
        {
          name: '报警数',
          type: 'line',
          stack: '报警数总量',
          lineStyle: {
            normal: {
              width: 3,
            }
          },
          data: data.alarmNums
        }
      ]
    }
  }
  let lineChart = echarts.init(document.getElementById('line'));
  let lineData = [{
    "type": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    "logNums": ["320", "332", "301", "334", "390", "330", "320"],
    "alarmNums": ["820", "932", "901", "934", "1290", "1330", "1320"]
  }, {
    "type": ["一月", "二月", "三月", "四月", "五月", "六月"],
    "logNums": ["320", "332", "301", "334", "390", "330"],
    "alarmNums": ["820", "932", "901", "934", "1290", "1330"]
  }, {
    "type": ["2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016"],
    "logNums": ["320", "332", "301", "334", "390", "330", "320"],
    "alarmNums": ["820", "932", "901", "934", "1290", "1330", "1320"]
  }]
  lineChart.setOption($scope.lineOption(lineData[1]));

  //year month day data switch
  $scope.switch = function (e, id) {
    $(e.target).addClass('active').siblings('.active').removeClass('active');
    lineChart.setOption($scope.lineOption(lineData[id]));
  };


  // alarm details
  $scope.dataList = '';
  $scope.dataList = [
    {"ip": "111.111.111.112", "attackTime": "15-04 2017-05-08"},
    {"ip": "111.111.111.113", "attackTime": "15-05 2017-05-08"},
    {"ip": "111.111.111.114", "attackTime": "15-06 2017-05-08"},
    {"ip": "111.111.111.115", "attackTime": "15-07 2017-05-08"},
    {"ip": "111.111.111.116", "attackTime": "15-08 2017-05-08"},
    {"ip": "111.111.111.117", "attackTime": "15-09 2017-05-08"},
    {"ip": "111.111.111.118", "attackTime": "15-10 2017-05-08"},
    {"ip": "111.111.111.119", "attackTime": "15-11 2017-05-08"},
    {"ip": "111.111.111.110", "attackTime": "15-12 2017-05-08"},
    {"ip": "111.111.111.110", "attackTime": "15-12 2017-05-08"},
    {"ip": "111.111.111.110", "attackTime": "15-12 2017-05-08"},
    {"ip": "111.111.111.110", "attackTime": "15-12 2017-05-08"},
    {"ip": "111.111.111.110", "attackTime": "15-12 2017-05-08"},
    {"ip": "111.111.111.110", "attackTime": "15-12 2017-05-08"},
    {"ip": "111.111.111.110", "attackTime": "15-12 2017-05-08"},
    {"ip": "111.111.111.110", "attackTime": "15-12 2017-05-08"},
    {"ip": "111.111.111.110", "attackTime": "15-12 2017-05-08"},
    {"ip": "111.111.111.110", "attackTime": "15-12 2017-05-08"}
  ];
})