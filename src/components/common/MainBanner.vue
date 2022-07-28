<!-- 全景视图 -->
<template>
  <div style="width:100%; position:relative;" class="main-banner">
    <img :src="url" width="100%" height="100%">
    <p class="counter-wrap" v-if="data">
      <span>{{dateTime}}</span>
      <span>在线人数：{{data.onlineNum}}</span>
      <span>累计人数：{{data.totalNum}}</span>
      <span>当日：{{data.dayNum}}人次</span>
      <span>当月：{{data.monthNum}}人次</span>
    </p>
  </div>
</template>

<script>
import { getAccountNumber } from '@/api/dy/panorama.js'
import {parseTime} from '@/utils/tools.js'
export default {
  name: "MainBanner",
  data() {
  	return {
  		url: require('@/assets/images/main-banner2.png'),
      data:null,
      timer:null,
      dateTime:null,
      dateTimer:null
  	}
  },

  methods:{
    getAccountNumber() {
      getAccountNumber().then(res=>{
        this.data = res.data;
      })
    },

    setTimeGetNum() {
      this.timer = setTimeout(()=>{
        this.getAccountNumber();
        clearTimeout(this.timer);
        this.setTimeGetNum();
      },5*60*1000);
    },

    updateTime() {
      this.dateTime = parseTime(new Date(),"{h}时{i}分{s}秒 星期{a}");
      window.requestAnimationFrame(()=>{
        this.updateTime();
      })
    }
  },

  mounted() {
    this.getAccountNumber();
    this.setTimeGetNum();
    this.updateTime();
  },

  beforeDestroy() {
    clearTimeout(this.timer);
    clearTimeout(this.dateTimer);
  }
};
</script>

<style scoped lang="scss">
  .main-banner {
    .counter-wrap {
      color:#fff; 
      font-size:14px; 
      position:absolute; 
      left:8.3%; 
      bottom: 22%; 
      font-family:syht; 
      display:flex;

      span {
        margin-right: 20px;
        display:inline-block;
      }
    }
  }
</style>
