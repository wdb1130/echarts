<template>
  <div class = "right-box rt">
    <div class = "tab">
      <div class = "title">
        <span></span>
        TOP10 主机漏洞排行
      </div>
      <div class = "tab-box">
        <div class = "t-head">
          <span>序号</span>
          <span>目标地址</span>
          <span>危险系数</span>
          <span>地区</span>
        </div>
        <div class = "t-body">
          <div class = "t-body-line" v-for = "hole in holeCompare">
            <div>
              <span>{{hole.id}}</span>
            </div>
            <div>
              <span>{{hole.addressTarget}}</span>
            </div>
            <div>
              <span>{{hole.dangerCoefficient}}</span>
            </div>
            <div>
              <span>{{hole.area}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class = "tab tab2">
      <div class = "title">
        <span></span>
        TOP10 漏洞详情
      </div>
      <div class = "tab-box">
        <div class = "t-head">
          <span>序号</span>
          <span>漏洞类型</span>
          <span>数量</span>
          <span>威胁程度</span>
        </div>
        <div class = "t-body">
          <div class = "t-body-line animate" v-for = "hole in holeDetails">
            <div>
              <span>{{hole.id}}</span>
            </div>
            <div>
              <span>{{hole.holeType}}</span>
            </div>
            <div>
              <span>{{hole.count}}</span>
            </div>
            <div>
              <span>{{hole.threatTargets}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default ({
    data(){
      return {
        holeDetails: [],
        holeCompare: []
      }
    },
    created (){
      $.get('./static/holeData.json', (data) =>{
        let i = 0;
        let timer = setInterval(() => {
          //每秒压入一组数据
          this.holeCompare.push(data.holeCompare[i]);
          this.holeDetails.push(data.holeDetails[i]);
          i++;
          //如果数据展示完毕 全部清零重新展示
          if (i > data.holeCompare.length) {
            this.holeCompare = [];
            this.holeDetails = [];
            i = 0;
          }
           // 数组长度>10 后数组清零 i值不变
          if (this.holeCompare.length > 10) {
            this.holeCompare = [];
            this.holeDetails = [];
            i--;
          }
        }, 1000)
      });
    }
  })
</script>

<style lang="scss" scoped>
  .box {
    overflow: hidden;
    background: rgba(58, 75, 39, 0.5);
    height: 45%;
  }
  .right-box {
    width: 22%;
    height: 100%;
    margin-top: 4%;
    margin-bottom: 2%;
    .tab {
      @extend .box;
      .title {
        height: 10%;
        line-height: 40px;
        border: 1px solid #6C9C36;
        color: #bae450;
        padding-left: 18px;
        position: relative;
        font-size: 21px;
        span {
          width: 16px;
          height: 16px;
          border-right: 1px solid #6C9C36;
          transform: rotate(45deg);
          position: absolute;
          top: -9px;
          left: -9px;
          background: #48594F;
        }
      }
      .tab-box {
        height: 90%;
        padding: 16px 0;
        border: 1px solid #6C9C36;
        border-top: 0;
        text-align: center;
        .t-head {
          color: #fff;
          line-height: 30px;
          >span {
            width: 23%;
          }
          >span:nth-child(2){
            text-align: left;
          }
        }
        .t-body-line {
          line-height: 30px;
          color: #D8E29D;
          -webkit-animation: myfirst 1s;
          -o-animation: myfirst 1s;
          animation: myfirst 1s;
          > div {
            display: inline-block;
            width: 23%;
          }
          > div:nth-child(2) {
            text-align: left;
          }
          &:first-child {
            color: #ff0a0f;
          }
          &:nth-child(2) {
            color: #8dc50e;
          }
          &:nth-child(3) {
            color: #fcf40d;
          }
        }
      }
    }
    .tab:last-child {
      @extend .box;
      margin-top: 4%;
      .title {
        span {
          background: #556042;
        }
      }
    }
  }
  @keyframes myfirst
  {
    from {
      margin-top: 100%;
      opacity: 0;
    }
    to {
      margin-top: 0;
      opacity: 1;
    }
  }
</style>
