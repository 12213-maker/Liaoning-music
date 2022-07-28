<!-- 网络洞察 -->
<template>
  <div class="bottom-wrap">
    <div class="bottom-charts-wrap" v-for="innerTab in innerTabs">
      <h5 class="title-with-left-line">{{targetName+innerTab.label}}</h5>
      <LineBarChart
      :ref="'chart'+innerTab.id"
      width="100%"
      height="280px"
      :xName="innerTab.overviewData.xName"
      :legendsBar="innerTab.overviewData.legendsBar"
      :legendsLine="innerTab.overviewData.legendsLine"
      :colors="chartColors"
      :barValue="innerTab.overviewData.barValue"
      :lineValue="innerTab.overviewData.lineValue"
      ></LineBarChart>
    </div>
  </div>
</template>

<script>
import LineBarChart from '@/components/common/charts/LineBarChart.vue';

export default {
  name:'NoneChbnChart',
  props:['innerTabs','targetName'],
  components:{LineBarChart},

  data () {
    return {
      chartColors:[["#5FAEFF,#0682FF", "#FFBE4D"],["#5FAEFF","#FFBE4D", "#4CD1C3"]],
    }
  },


  
  methods: {

  },

  created(){
  },

  mounted(){
  },
};

</script>
<style lang='scss'>
  @import '~@/assets/styles/variables.scss';

  .bottom-wrap {
    width: 100%; 
    margin-top: 20px; 
    display: flex;

    .bottom-charts-wrap {
      width: 50%;
      background: #fff;
      padding: 20px 20px 10px 20px; 
      box-sizing: border-box;
    }
  }
</style>