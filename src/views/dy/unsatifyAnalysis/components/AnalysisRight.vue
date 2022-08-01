<!-- 全景视图 -->
<template>
  <div class="analysis-right" >
    <div style="display:flex; justify-content:flex-end;">
      <el-button size="mini" plain style="height:24px;" @click="goback">返回</el-button>
    </div>
    <TrendLine
    v-if="show"
    :datas="datas" 
    height="260px"
    title="近12月客户满意指数趋势" 
    serieName="客户满意指数"
    unit="分"
    subtext="单位：分"/>
  </div>
</template>

<script>
import TrendLine from '@/components/common/charts/TrendLine';
import Blank from '@/components/common/Blank';
export default {
  name: "AnalysisRight",
  components:{
    TrendLine,
  },
  props: ['datas'],
  data() {
    return {
      // datas:[]
    };
  },
  watch:{
    datas(val) {
      console.log(324,val)
    }
  },
  computed:{
    show() {
      console.log(this.datas && this.datas.length>0);
      return this.datas && this.datas.length>0
    }
  },
  created() {
  },

  mounted() {
    /*for(var i=0; i<12; i++) {
      this.datas.push({label:`${i+1}月`,value:(Math.random()*100).toFixed(1)})
    }*/
  },

  methods: {
   goback() {
    this.$router.go(-1);
   }
  }
};
</script>

<style lang="scss">
.analysis-right {
  width: 100%;
  padding-left:20px;
  padding-right:10px;
  box-sizing:border-box;

}
</style>

