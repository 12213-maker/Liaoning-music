
<template>
  <div class="fixed-trend-wrap" v-loading="loading">
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
    :minInterval="1"
    :sameMinMax="true"
    :min='0'
    ></LineBarChart>
  </div>
</template>

<script>
import LineBarChart from '@/components/common/charts/LineBarChart.vue';
import {getCustomerGroupFixTrend} from '@/api/dy/unsatifyAnalysis.js';
export default {
  name: "FixedTrend",
  props:['areaId','groupId'],
  components:{
    LineBarChart
  },
  data() {
    return {
      chartColors:[["#5FAEFF,#0682FF", "#FFBE4D"],["#FFBE4D", "#4CD1C3"]],
      xName: [''],
      legendsBar: ['修复量','接触量'],
      legendsLine: [],
      barValue: [[],[]],
      lineValue: [],
      loading:false
    }
  },

  watch:{
    areaId() {
      this.getCustomerGroupFixTrend();
    }
  },

  methods: {
    getCustomerGroupFixTrend() {
      this.loading = true;
      // console.log(this.xName,this.barValue)
      getCustomerGroupFixTrend({
        "id": this.groupId,
        "cityId": this.areaId
      })
      .then(res=>{
        console.log('结果趋势', res);
        if(res.data && res.data.length) {
          this.xName = res.data.map(item => {
            return `${item.fix_date.split('-')[1]}-${item.fix_date.split('-')[2]}`;
          });
          this.barValue[0] = res.data.map(item => Number(item.fix_num));
          this.barValue[1] = res.data.map(item => Number(item.contacted_num));

          setTimeout(()=>{
            this.$refs.chart.drawChart();
          },100)
        } else {
          this.loading = false;
          this.xName = [];
        }
      })
      .finally(()=>{
        this.loading = false;
      })
    }
  },

  mounted() {
    this.getCustomerGroupFixTrend();
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