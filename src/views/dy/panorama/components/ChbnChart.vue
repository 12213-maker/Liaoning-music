<!-- 网络洞察 -->
<template>
  <div class="bottom-wrap">
    <el-tabs 
    v-model="activeName2"  
    style="width:50%;background:#fff; padding:10px 20px;"  
    class='inner-tabs'
    @tab-click="ontabclick">
      <el-tab-pane 
      v-for="(innerTab,idx) in innerTabs" 
      :key="innerTab.label" 
      :label="targetName+innerTab.label" 
      :name="innerTab.id">
        <LineBarChart
        v-if="activeName2==innerTab.id"
        :ref="'chart'+innerTab.id"
        width="100%"
        height="270px"
        :xName="innerTab.overviewData.xName"
        :legendsBar="innerTab.overviewData.legendsBar"
        :legendsLine="innerTab.overviewData.legendsLine"
        :colors="chartColors"
        :barValue="innerTab.overviewData.barValue"
        :lineValue="innerTab.overviewData.lineValue"
        ></LineBarChart>
      </el-tab-pane>
    </el-tabs>

    <div style="width:50%;background:#fff;">
      <h3 class="title-h3">CHBN业务占比</h3>
      <PieChart
      ref="pieChart"
      width="100%"
      height="270px"
      labelName="投诉总量"
      :lengendTitles="['业务名称','投诉量','占比']"
      :tableData="pieData"
      ></PieChart>
    </div>
  </div>
  
</template>

<script>
import LineBarChart from '@/components/common/charts/LineBarChart.vue';
import PieChart from '@/components/common/charts/PieChart.vue';

export default {
  name:'ChbnChart',
  components:{LineBarChart,PieChart},
  props:['innerTabs','pieData','targetName'],
  data() {
    return {
      activeName2:'1',
      chartColors:[["#5FAEFF,#0682FF", "#FFBE4D"],["#FFBE4D", "#4CD1C3"]],
    }
  },

  
  methods: {
    ontabclick(val) {
      setTimeout(()=>{
        this.$refs['chart'+val.name][0].drawChart();  
      },50)
      
    }
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