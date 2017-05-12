<template>
  <ul>
    <li>
      监控目标
      <div>{{targetChange.monitorTarget}}</div>
    </li>
    <li>
      危险目标
      <div>{{targetChange.dangerTarget}}</div>
    </li>
    <li>
      漏洞数量
      <div> {{targetChange.holeCount}} </div>
    </li>
  </ul>
</template>

<script>
  export default ({
    data(){
      return {
        timer: null,
        target: {
          monitorTarget: parseInt(Math.random()*2000 +300),
          dangerTarget: parseInt(Math.random()*200 +100),
          holeCount: parseInt(Math.random()*200 +100)
        },
        targetChange: {
          monitorTarget: 0,
          dangerTarget: 0,
          holeCount: 0
        },
      }
    },
    created () {
      this.timer = setInterval(() => {
        let m = this.target.monitorTarget;
        let d = this.target.dangerTarget;
        let h = this.target.holeCount;
        this.targetChange.monitorTarget = this.targetChange.monitorTarget - m ? this.targetChange.monitorTarget + 1 : m;
        this.targetChange.dangerTarget = this.targetChange.dangerTarget - d ? this.targetChange.dangerTarget + 1 : d;
        this.targetChange.holeCount = this.targetChange.holeCount - h ? this.targetChange.holeCount + 1 : h;
        let max = m > d ? (m > h ? m : h) : (d > h ? d : h);
        if (this.targetChange.monitorTarget === max || this.targetChange.dangerTarget === max || this.targetChange.holeCount === max) {
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 5);
    }
  })
</script>

<style scoped>
  ul {
    overflow: hidden;
  }

  li {
    float: left;
    width: 150px;
    text-align: center;
    color: #fff;
    font-size: 22px;
  }

  li div {
    color: #FBFD06;
    font-size: 36px;
    height: 60px;
    line-height: 60px;
  }
</style>
