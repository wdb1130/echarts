<template>
  <div class = "geoMap">
    <div id = "main" style = "width: 110%; height: 100%; margin: 0 auto;"></div>
    <!--时间-->
    <div class = "time">
      <span>{{currentTime}}</span>&nbsp;
      <span>{{currentList}}</span>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import $ from 'jquery'

  export default ({
    name: 'geo-map',
    data(){
      return {
        msg: "this is a jiangsu Map",
        currentList : '',
        currentTime:''
      }
    },
    created(){
      setInterval(() => {
        let t =new Date();
        // 日期格式化
        // this.currentTime = a.toLocaleDateString(); //.format('yyyy,mth,dd,hh,mm,ss');
        let month = t.getMonth() > 8 ? (t.getMonth() + 1) : ( "0" + (t.getMonth() + 1) );
        let day = t.getDate() >9 ? t.getDate() : ("0" + t.getDate());
        let hour = t.getHours() >9 ? t.getHours() : ("0" + t.getHours());
        let minutes = t.getMinutes() > 9 ? t.getMinutes() : ("0"+t.getMinutes());
        let seconds = t.getSeconds() >9 ? t.getSeconds() : ("0" + t.getSeconds());
        // 拼接日期 yyyy-mm-dd  hh:mm:ss
        this.currentTime = t.getFullYear() + "-" +month + "-" +day;
        this.currentList = hour +":" + minutes + ":" + seconds;
      }, 1000);
    },
    mounted(){
      let geoCoordMap = {
        '无锡': [120.301663, 31.574729],
        '徐州': [117.184811, 34.261792],
        '常州': [119.946973, 31.772752],
        '苏州': [120.619585, 31.299379],
        '南通': [120.864608, 32.016212],
        '连云港': [119.178821, 34.600018],
        '淮安': [119.021265, 33.597506],
        '盐城': [120.139998, 33.377631],
        '扬州': [119.421003, 32.393159],
        '镇江': [119.452753, 32.204402],
        '泰州': [119.915176, 32.484882],
        '宿迁': [118.275162, 33.963008],
        '南京': [118.767413, 32.041544]
      };
      let data = [
        {name: '无锡', value: 18},
        {name: '徐州', value: 70},
        {name: '常州', value: 90},
        {name: '苏州', value: 200},
        {name: '南通', value: 70},
        {name: '连云港', value: 90},
        {name: '淮安', value: 40},
        {name: '盐城', value: 70},
        {name: '扬州', value: 70},
        {name: '镇江', value: 58},
        {name: '泰州', value: 88},
        {name: '宿迁', value: 199}
      ];
      //攻击lines  地理坐标值 数据值 南京
      function formtGCData(geoData, data, srcNam, mark) {
        let tGeoDt = [];
        if (mark === '高危') {
          data.forEach((item, i) => {
            if (parseInt(data[i].value) >= 100) {
              tGeoDt.push({coords: [geoData[srcNam], geoData[data[i].name]]});
            }
          })
        } else if (mark === '中危') {
          for (let i = 0, len = data.length; i < len; i++) {
            let val = parseInt(data[i].value);
            if (val <= 100 && val >= 80) {
              tGeoDt.push({coords: [geoData[srcNam], geoData[data[i].name]]});
            }
          }
        } else if (mark === '安全') {
          for (let i = 0, len = data.length; i < len; i++) {
            let val = parseInt(data[i].value);
            if (val <= 60) {
              tGeoDt.push({coords: [geoData[srcNam], geoData[data[i].name]]});
            }
          }
        }
        else {
          for (let i = 0, len = data.length; i < len; i++) {
            let val = parseInt(data[i].value);
            if (val <= 80 && val >= 60) {
              tGeoDt.push({coords: [geoData[srcNam], geoData[data[i].name]]});
            }
          }
        }
        return tGeoDt;
      }

      //攻击点样式
      function formtVData(geoData, data, srcNam) { //攻击点 城市坐标 城市数据 南京
        let tGeoDt = [];
        for (let i = 0, len = data.length; i < len; i++) {
          let tNam = data[i].name;
          let val = parseInt(data[i].value);
          if (val >= 100) {
            tGeoDt.push({ //高危
              name: tNam,
              value: geoData[tNam],
              symbolSize: 8,
              itemStyle: {
                normal: {
                  color: '#C60A0A',
                  borderColor: '#000'
                }
              }
            })
          }
          else if (val >= 80) {
            tGeoDt.push({ //中危
              name: tNam,
              value: geoData[tNam],
              symbolSize: 6,
              itemStyle: {
                normal: {
                  color: '#FF590A',
                  borderColor: '#000'
                }
              }
            })
          }
          else if (val >= 60) {
            tGeoDt.push({ //预警
              name: tNam,
              value: geoData[tNam],
              symbolSize: 4,
              mark: '预警',
              itemStyle: {
                normal: {
                  color: '#FFEF12',
                  borderColor: '#000'
                }
              }
            })
          }
          else {
            tGeoDt.push({//安全
              name: tNam,
              value: geoData[tNam],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#469D1A',
                  borderColor: '#000'
                }
              }
            })
          }
        }
        tGeoDt.push({ //南京的数据
          name: srcNam,
          value: geoData[srcNam],
          symbolSize: 10,
          itemStyle: {
            normal: {
              color: 'gold',
              borderColor: '#000'
            }
          }
        });
        return tGeoDt;
      }
      //初始化series
      let series = [];
      //城市分类 以及对应的颜色
      let lineData = [
        {mark: '高危', color: '#C60A0A'},
        {mark: '中危', color: '#F25A17'},
        {mark: '预警', color: '#FAED01'},
        {mark: '安全', color: '#469D1A'}
      ];
      //添加series数据
      lineData.forEach((item, i) => {
        series.push({
          name: item.mark,
          type: 'lines',
          zlevel: 2, //第几层
          effect: {
            show: true,
            period: i+2, //时间
            trailLength: 0.1, //尾巴长度
            color: item.color,
            symbol: 'pin',
            symbolSize: 12
          },
          lineStyle: { //攻击线的样式
            normal: {
              width: 0,
              curveness: -0.3 //攻击弧度
            }
          },
          data: formtGCData(geoCoordMap, data, '南京', item.mark)
        })
      });
      series.push({
        type: 'effectScatter',
        coordinateSystem: 'geo', //坐标系
        zlevel: 2,
        rippleEffect: { //涟漪特效
          period: 3,  //动画时间
          scale: 12.5, //最大缩放比例
          brushType: 'stroke'  //波纹绘制方式 stroke fill填充
        },
        label: { //图形上的文本标签
          normal: {
            show: true,
            position: 'right',
            formatter: '{b}',
            textStyle: {
              color: '#f1f1f1',
              fontSize: 14,
              fontFamily: '宋体'
            }
          }
        },
        data: formtVData(geoCoordMap, data, '南京')
      });

      //生成地图
      $.get('./static/jiangsu.json', function (data) {
        echarts.registerMap('jiangsu', data);
        const chart = echarts.init(document.getElementById('main'));
        chart.setOption(
          {
            color: ['#C60A0A', '#F25A17', '#FAED01', '#469D1A'],
            legend: {
              orient: 'vertical', //朝向
              right: '10%',
              top: '10%',
              itemHeight: 15,
              itemWidth: 15,
              data: [
                {name: '高危', icon: 'rect', textStyle: {color: '#fff', fontSize: '22px'}},
                {name: '中危', icon: 'rect', textStyle: {color: '#fff', fontSize: '22px'}},
                {name: '预警', icon: 'rect', textStyle: {color: '#fff', fontSize: '22px'}},
                {name: '安全', icon: 'rect', textStyle: {color: '#fff', fontSize: '22px'}}
              ]
            },
            tooltip: {
              trigger: 'item'
            },
            geo: [
              {
                map: 'jiangsu',
                roam: false, //缩放
                silent: true,
                top:'5%',
                bottom:'2%',
                itemStyle: {
                  normal: {
                    borderWidth: 2,
                    shadowBlur: 20,
                    shadowColor: 'gold'
                  },
                  emphasis: {
                    show: false,
                  }
                }
              }, {
                map: 'jiangsu',
                top:'5%',
                bottom:'2%',
                label: { //文字样式
                  normal: {
                    show: false,
                  },
                  emphasis: {
                    show: false,
                  }
                },
                itemStyle: { //重置地图样式
                  normal: {
                    borderWidth: 3,
                    borderColor: '#919B45',
                    areaColor: '#454F2D', //地图颜色
                  },
                  emphasis: {
                    show: false,
                    areaColor: '#4D5734', //鼠标悬浮颜色
                  }
                }
              }],
            series: series
          }
        );
      });
    },

  })
</script>

<style lang="scss" scoped>
  .geoMap {
    overflow: visible;
    position: absolute;
    left: 23%;
    right: 27%;
    bottom: 0;
    top: 0;
    .time {
      position: absolute;
      bottom: 5%;
      left: 20%;
      color: #FFF70E;
      font-size: 27px;
      span {
        margin-right: 20px;
      }
    }
  }
</style>
