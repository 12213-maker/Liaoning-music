<template>
	<div class="complaint-part-02">
    <div class="charts-wrap">
      <h3 class="title-h3">CHBN投诉总量</h3>
      <LineBarChart
      ref="LineBarChart"
      width="100%"
      height="270px"
      :xName="xName"
      :legendsBar="legendsBar"
      :legendsLine="legendsLine"
      :colors="chartColors"
      :barValue="barValue"
      :lineValue="lineValue"
      ></LineBarChart>
    </div>

    <div class="charts-wrap">
      <h3 class="title-h3">CHBN业务占比</h3>
      <PieChart
      width="100%"
      height="270px"
      labelName="投诉总量"
      :lengendTitles="['业务员名称','投诉量','占比']"
      :tableData="pieData"
      ></PieChart>
    </div>
  </div>
</template>

<script>
  import LineBarChart from '@/components/common/charts/LineBarChart.vue'
  import PieChart from '@/components/common/charts/PieChart.vue'
  export default {
    name:"ComplaintPart02",
    components:{
      LineBarChart,
      PieChart
    },
    props:{
    },
    data(){
      return {
        activeName:'1',
        userInfo:{cityid:999},
        selectTarget:'',

        xName:['1月','2月','3月'],
        legendsBar:['投诉量'],
        legendsLine:['环比'],
        barValue:[[parseInt(Math.random()*100).toString(),parseInt(Math.random()*100).toString(),parseInt(Math.random()*100).toString()]],
        lineValue:[[parseInt(Math.random()*10).toString(),parseInt(Math.random()*10).toString(),parseInt(Math.random()*10).toString()]],
        chartColors:[["#5FAEFF,#0682FF", "#FFBE4D"],["#FFBE4D", "#4CD1C3"]],

        pieData:[
          {
            score:0,
            target_name:'标题',
            partrate:0
          },
          {
            score:parseInt(Math.random()*100).toString(),
            target_name:'C-移动业务',
            partrate:'0.25'
          },{
            score:parseInt(Math.random()*100),
            target_name:'H-家庭业务',
            partrate:'0.25'
          },{
            score:parseInt(Math.random()*100),
            target_name:'B-集团业务',
            partrate:'0.25'
          },{
            score:parseInt(Math.random()*100),
            target_name:'N-新增业务',
            partrate:'0.25'
          }
        ]
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

<style lang="scss" scope>
.complaint-part-02 {
  width:100%;
  height:auto;
  margin-top:20px;
  display:flex;
  background:#fff;

  .charts-wrap {
    width:50%; 
    padding-left:20px; 
    padding-bottom:20px; 
    box-sizing:border-box;
  }
}
</style>

