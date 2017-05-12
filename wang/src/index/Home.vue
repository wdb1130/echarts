<template>
  <div class = "home">
    <img src = "../assets/images/bg.jpg" class = "bg">
    <div class = "container" >
      <!--页面左边部分-->
      <div class = "left-box lf">
        <header>
          <!-- LOGO 图标 -->
          <img  class = "logo" src = "../assets/images/logo.png">
          <img class = "logo-font" src = "../assets/images/logo-font.png">
        </header>
        <section>
          <target-show></target-show>
          <pie-chart></pie-chart>
          <scan-detail></scan-detail>
        </section>
      </div>
      <!--中间部分地图-->
      <geo-map></geo-map>
      <!--页面右边部分-->
      <top-ten></top-ten>
    </div>
  </div>
</template>

<script>
  //引入资源
  import TargetShow from '../components/TargetShow.vue'
  import PieChart from '../components/pieCharts.vue'
  import ScanDetail from '../components/ScanDetail.vue'
  import GeoMap from '../components/jiangsuMap.vue'
  import TopTen from '../components/TopTen.vue'
  export default {
    name: 'home',
    components: {
      TargetShow,
      GeoMap,
      PieChart,
      ScanDetail,
      TopTen
    },
    data: function () {
      return {
        msg:'hello wang dong bo!'
      }
    },
  }
</script>
<style lang="scss">
  * {
    box-sizing: border-box;
  }
  body {
    font: 19px "microsoft yahei", Arial, Helvetica, sans-serif;
    margin: 0;
    padding: 0;
  }
  ul, li, p, h1, h2, h3, h4, h5, h6, dl, dt, dd, td {
    margin: 0;
    padding: 0;
    border: none;
    list-style: none;
  }
  label, span, i, b, img {
    display: inline-block;
  }
  .lf {
    float: left;
  }
  .rt {
    float: right;
  }
  /*背景图*/
  .bg {
    min-width: 100%;
    height: 100%;
    position: fixed;
    z-index: 10;
  }
  .container {
    position: absolute;
    z-index: 100;
    left: 20px;
    top: 10px;
    right: 30px;
    bottom: 0;
    /*页面左侧部分*/
    .left-box {
      padding-top: 12px;
      width: 33%;
      header {
        .logo-font {
          margin-bottom: 30px;
        }
      }
      section {
        margin-top: 30px;
      }
    }
  }

</style>
