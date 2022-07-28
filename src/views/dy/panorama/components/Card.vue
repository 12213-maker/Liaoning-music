<template>
	<div class="service-card" v-if="data.label" style="background:#f5f5f5">
    <div class="inner-wrap">
      <span style="width:40%">{{data.label}}</span>
      <span style="width:30%;color:#666">排名：{{data.rank}}</span>
      <Arrow style="width:30%;" :num="Number(data.rankScore)"/>
    </div>

    <div class="inner-wrap">
      <span style="width:40%; font-size:28px; font-family:syhtMedium">{{data.score}}</span>
      <span style="width:30%; color:#666">环比：{{data.ratio}}</span>
      <Arrow style="width:30%;" :num="Number(-data.ratioScore)"/>
    </div>
  </div>
  <div v-else class="service-card"  style="background:#fff">
    
  </div>
</template>

<script>
  import Arrow from '@/components/common/arrow';
  export default {
    name:"ServiceCard",
    components:{
      Arrow
    },
    props:['data'],
    data(){
      return {

      }
    },
    watch: {
    },
    mounted(){

    },
    methods:{ 

    }

  };
</script>

<style lang="scss" scoped>
.service-card {
  width: 30%;
  flex-grow:2;
  height: auto;
  padding:12px 20px;
  box-sizing:border-box;
  font-size:14px;
  color:#262626;
  font-family:syht;

  .inner-wrap {
    width:100%; 
    display:flex;
    height: 40px;
    align-items:center; 
    justify-content:space-between;

    span {
      display: inline-block;
    }
  }
}
</style>

