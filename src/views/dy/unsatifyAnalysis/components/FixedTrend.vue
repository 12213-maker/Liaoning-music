
<template>
  <div class="fixed-trend-wrap">
    <h3 class="title-h3" style="margin:0px;">修复时间趋势</h3>
    <LineBarChart
    style="margin-top:20px;"
    ref="chart"
    width="100%"
    height="300px"
    :xName="xName"
    :legendsBar="legendsBar"
    :legendsLine="legendsLine"
    :colors="chartColors"
    :barValue="barValue"
    :lineValue="lineValue"
    ></LineBarChart>
  </div>
</template>

<script>
import LineBarChart from '@/components/common/charts/LineBarChart.vue';

export default {
  name: "FixedTrend",
  props:[],
  components:{
    LineBarChart
  },
  data() {
    return {
      chartColors:[["#5FAEFF,#0682FF", "#FFBE4D"],["#FFBE4D", "#4CD1C3"]],
      xName: ['06-01', '06-02', '06-03','06-04','06-05','06-06','06-07','06-08','06-09','06-10','06-11','06-12','06-13','06-14','06-15'],
      legendsBar: ['修复量','接触量'],
      legendsLine: [],
      barValue: [
        [
          parseInt(Math.random() * 100).toString(), 
          parseInt(Math.random() * 100).toString(), 
          parseInt(Math.random() * 100).toString(),
          parseInt(Math.random() * 100).toString(), 
          parseInt(Math.random() * 100).toString(), 
          parseInt(Math.random() * 100).toString(),
          parseInt(Math.random() * 100).toString(), 
          parseInt(Math.random() * 100).toString(), 
          parseInt(Math.random() * 100).toString(),
          parseInt(Math.random() * 100).toString(), 
          parseInt(Math.random() * 100).toString(), 
          parseInt(Math.random() * 100).toString(),
          parseInt(Math.random() * 100).toString(), 
          parseInt(Math.random() * 100).toString(), 
          parseInt(Math.random() * 100).toString(),
        ],
        [
          parseInt(Math.random() * 100).toString(), 
          parseInt(Math.random() * 100).toString(), 
          parseInt(Math.random() * 100).toString(),
          parseInt(Math.random() * 100).toString(), 
          parseInt(Math.random() * 100).toString(), 
          parseInt(Math.random() * 100).toString(),
          parseInt(Math.random() * 100).toString(), 
          parseInt(Math.random() * 100).toString(), 
          parseInt(Math.random() * 100).toString(),
          parseInt(Math.random() * 100).toString(), 
          parseInt(Math.random() * 100).toString(), 
          parseInt(Math.random() * 100).toString(),
          parseInt(Math.random() * 100).toString(), 
          parseInt(Math.random() * 100).toString(), 
          parseInt(Math.random() * 100).toString(),
        ]
      ],
      lineValue: []
    }
  },

  mounted() {
    this.$refs.chart.drawChart();
  }
};
</script>

<style lang="scss">
.fixed-trend-wrap {
  background:#fff;
  padding:20px;
  box-sizing:border-box;
}

</style>