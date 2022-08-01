
<template>
  <div class="fixed-result-wrap" v-loading="resultLoading">

    <div style="width:35%;height:auto;">
      <h3 class="title-h3" style="margin:0px;">修复结果构成</h3>
      <PieChart
      v-if="showPieData"
      ref="pieChart"
      width="100%"
      height="320px"
      labelName="客户"
      :lengendTitles="['','','']"
      :tableData="pieData"
      :totalCount="pieTotalCount"
      ></PieChart>
      <Blank v-else/>
    </div>
    <div style="width:65%;height:100%;padding-left:40px; box-sizing:border-box;">
      <h3 class="title-h3" style="margin:0px;">修复结果排名</h3>
      <LineBarChart
      ref="chart"
      width="100%"
      height="300px"
      style="margin-top:16px;"
      :xName="xName"
      :legendsBar="legendsBar"
      :legendsLine="legendsLine"
      :colors="chartColors"
      :barValue="barValue"
      :lineValue="lineValue"
      :showSymbol="false"
      :min='0'
      :minInterval='1'
      :formatterAxisLabel="true"
      ></LineBarChart>
    </div>
  </div>
</template>

<script>
import PieChart from './PieChart.vue';
import LineBarChart from '@/components/common/charts/LineBarChart.vue';
import {getCustomerGroupFix,getCustomerGroupFixRank} from '@/api/dy/unsatifyAnalysis.js';
import Blank from "@/components/common/Blank";
export default {
  name: "FixedResult",
  props:['areaId','groupId'],
  components:{
    PieChart,
    LineBarChart,
    Blank
  },
  data() {
    return {
      pieData:[],
      showPie: false,
      chart:null,

      chartColors:[["#5FAEFF,#0682FF", "#FFBE4D"],["#FFBE4D", "#4CD1C3"]],
      xName: [''],
      legendsBar: ['修复量'],
      legendsLine: ['成功率'],
      barValue: [
        []
      ],
      lineValue: [
        []
      ],

      resultOk:false,
      resultTrend:false,
      showPieData:true,
      pieTotalCount:0
    }
  },
  watch:{
    areaId(val) {
      this.init();
    }
  },

  computed: {
    resultLoading() {
      return !this.resultOk && !this.resultTrend;
    }
  },

  methods: {
    clickCb(params) {
      console.log(params.data.name,params.data.cityId);
    },

    init() {
      this.getCustomerGroupFix();
      this.getCustomerGroupFixRank();
    },

    initPieData() {
      this.pieData = [{
        score: 0,
        target_name: '标题',
        partrate: '-'
      },{
        score: 0,
        target_name: '已修复',
        partrate: 0
      },{
        score: 0,
        target_name: '已接触未修复',
        partrate: 0
      },{
        score: 0,
        target_name: '未接触成功',
        partrate: 0
      },{
        score: 0,
        target_name: '无反馈信息',
        partrate: 0
      }]
    },

    getCustomerGroupFix() {
      this.resultOk =false;
      getCustomerGroupFix({
        "id": this.groupId,
        "cityId": this.areaId
      })
      .then(res=>{
        console.log('结果构成',res)
        if(res.data && res.data.fix_num) {
          const {data} = {...res};
          this.pieData = [{
            score: 0,
            target_name: '标题',
            partrate: '-'
          },{
            score: data.fix_num,
            target_name: '已修复',
            partrate: data.fix_rate
          },{
            score: data.not_contacted_num,
            target_name: '已接触未修复',
            partrate: data.not_contacted_rate
          },{
            score: data.not_feedback_num,
            target_name: '未接触成功',
            partrate: data.not_feedback_rate
          },{
            score: data.not_fix_num,
            target_name: '无反馈信息',
            partrate: data.not_fix_rate
          }]
          this.pieTotalCount = data.user_num;
          this.showPieData = true;
        } else {
          this.showPieData = false;
        }
        
      })
      .catch(err=>{
        this.showPieData = false;
      })
      .finally(()=>{
        this.resultOk = true;
      })
    },

    getCustomerGroupFixRank() {
      this.resultTrend =false;
      getCustomerGroupFixRank({
        "id": this.groupId,
        "cityId": this.areaId
      })
      .then(res=>{

        this.xName = res.data.map(item => item.area_name);
        this.barValue[0] = res.data.map(item => {
          return {
            name: item.area_name,
            value: item.fix_num, 
          }
        });
        this.lineValue[0] = res.data.map(item => {
          return {
            name: item.area_name,
            value: item.fix_rate, 
          }
        });

        setTimeout(()=>{
          this.$refs.chart.drawChart();  
        },100)
        
      })
      .finally(()=>{
        this.resultTrend = true;
      })
    }
  },

  mounted() {
    /*setTimeout(()=>{
      this.showPie = true;
    },1000)*/
    this.init();
    
    
  }
};
</script>

<style lang="scss">
.fixed-result-wrap {
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  height:auto;
  min-height: 388px;
}

</style>
