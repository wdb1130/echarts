<template>
  <div class = "detail">
    <div class = "corner-box">
      <span class = "corner-left-top"></span>
      <span class = "corner-left-bottom"></span>
      <span class = "corner-right-top"></span>
      <span class = "corner-right-bottom"></span>
    </div>
    <div class = "title">实时扫描详情</div>
    <div class = "content">
      <div>
        目标IP :
        <span>{{scanDetails.ipTarget}}</span>
      </div>
      <div>
        扫描输出 :
        <p>{{scanDetails.scanOutput}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default ({
    data(){
      return {
        scanDetails: {},
      }
    },
    created () {
      $.get("./static/holeData.json", (data) => {
        let i = 0;
        let timer = setInterval(() => {
          i = ( i === data.scanInfo.length - 1) ? 0 : ++i;
          this.scanDetails = data.scanInfo[i];
        }, 2000)
      })
    }
  })
</script>

<style lang = "scss" scoped>
  .detail {
    width: 75%;
    height: 380px;
    background: rgba(58, 75, 39, 0.5);
    position: relative;
    margin-top: 40px;
    margin-left: 30px;
    .corner-box {
      > span {
        position: absolute;
        width: 24px;
        height: 24px;
      }
      .corner-left-top {
        top: 0;
        left: 0;
        border-top: 5px solid #688C34;
        border-left: 5px solid #688C34;
      }

      .corner-left-bottom {
        bottom: 0;
        left: 0;
        border-bottom: 5px solid #688C34;
        border-left: 5px solid #688C34;
      }

      .corner-right-top {
        top: 0;
        right: 0;
        border-top: 5px solid #688C34;
        border-right: 5px solid #688C34;
      }

      .corner-right-bottom {
        bottom: 0;
        right: 0;
        border-right: 5px solid #688C34;
        border-bottom: 5px solid #688C34;
      }
    }
    .title {
      width: 176px;
      margin: 0 auto;
      height: 34px;
      line-height: 34px;
      text-align: center;
      color: #D0FC9A;
      background: #5B8F06;
      font-family: '宋体';
      font-weight: bold;
    }
    .content {
      width: 355px;
      margin: 0 auto;
      color: #A3FF18;
      line-height: 30px;
      padding-top: 15px;
      div {
        span {
          /*margin-left: 10px;*/
          color: #FAFF9C;
        }
        p {
          height: 152px;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #FAFF9C;
        }
      }
    }
  }
</style>
