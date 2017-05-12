<template>
  <div id="pie"></div>
</template>

<script>
  import echarts from 'echarts'
  export default({
    name:'pie-chart',
    data(){
      return {
        msg:"this is pie-chart"
      }
    },
    mounted(){
      let pie = echarts.init(document.getElementById('pie'));
      pie.setOption({
        series: [
          {
            name: '问题目标',
            type: 'pie',
            color:['#FFF50D','#fff'],
            center:['25%','40%'],
            radius: ['45%', '60%'],
            hoverAnimation: false,
            labelLine:{
              normal:{
                show:false
              }
            },
            data: [{
              value: 30,
              name: '30%',
              label: {
                normal: {
                  position: 'center',
                  show:true,
                  textStyle: {
                    fontSize: '28',
                    color:'#7FF940'
                  }
                }
              }
            },{value:70, name:''}],
          },
          {
            name: '高危漏洞',
            type: 'pie',
            center:['80%','40%'],
            color:['#7FF940','#fff'],
            radius: ['45%', '60%'],
            hoverAnimation: true,
            labelLine:{
              normal:{
                show:false
              }
            },
            data: [{
              value: 40,name:'40%',
              label: {
                normal: {
                  position: 'center',
                  show:true,
                  textStyle: {
                    fontSize: '28',
                    color:'#7FF940'
                  }
                }
              },
            }, {value: 60,name:''}]
          }
        ],
        xAxis: [{
          type: 'category',
          axisLine: {show: true},
          axisTick: {show: false},
          axisLabel:{
            interval:0,//间隔
            show:true,
            inside:true,
            textStyle:{
              align:'right',
              fontSize:44,
              color:'#fff',
              baseline:'top'
            }
          },
          zlevel:100,
          // type:'category',
          // offset:3,
          data: [
            "问题目标","高危漏洞"
      /*      {
              value:'问题目标',
              textStyle:{
                color:'#fff',
                fontSize:16
              }
            },{
              value:'高危漏洞',
              textStyle:{
                color:'#fff',
                fontSize:44
              }
            }*/
          ]
        }],
        yAxis:{
          show: false
        }
      })
    }
  })
</script>

<style scoped>
  div#pie {
    width: 400px;
    height: 220px;
  }
</style>
