
<template>
  <div class="fixed-result-wrap">
    <div style="width: 35%; height: 100%">
      <h3 class="title-h3" style="margin: 0px">修复结果构成</h3>
      <PieChart
        ref="pieChart"
        width="100%"
        height="320px"
        labelName="客户"
        :lengendTitles="['', '', '']"
        :tableData="pieData"
      ></PieChart>
    </div>
    <div
      style="
        width: 65%;
        height: 100%;
        padding-left: 40px;
        box-sizing: border-box;
      "
    >
      <h3 class="title-h3" style="margin: 0px">修复结果排名</h3>
      <LineBarChart
        ref="chart"
        width="100%"
        height="280px"
        :xName="xName"
        :legendsBar="legendsBar"
        :legendsLine="legendsLine"
        :colors="chartColors"
        :barValue="barValue"
        :lineValue="lineValue"
        :showSymbol="false"
        :clickCb="clickCb"
      ></LineBarChart>
    </div>
  </div>
</template>

<script>
import PieChart from "./PieChart.vue";
import LineBarChart from "@/components/common/charts/LineBarChart.vue";

export default {
  name: "FixedResult",
  props: [],
  components: {
    PieChart,
    LineBarChart,
  },
  data() {
    return {
      pieData: [
        {
          score: 0,
          target_name: "标题",
          partrate: "-",
        },
        {
          score: parseInt(Math.random() * 100),
          target_name: "已修复",
          partrate: Math.random().toFixed(1),
        },
        {
          score: parseInt(Math.random() * 100),
          target_name: "已接触未修复",
          partrate: Math.random().toFixed(1),
        },
        {
          score: parseInt(Math.random() * 100),
          target_name: "未接触成功",
          partrate: Math.random().toFixed(1),
        },
        {
          score: parseInt(Math.random() * 100),
          target_name: "无反馈信息",
          partrate: Math.random().toFixed(1),
        },
      ],
      showPie: false,
      chart: null,

      chartColors: [
        ["#5FAEFF,#0682FF", "#FFBE4D"],
        ["#FFBE4D", "#4CD1C3"],
      ],
      xName: [
        "沈阳",
        "本溪",
        "辽阳",
        "朝阳",
        "鞍山",
        "抚顺",
        "丹东",
        "锦州",
        "营口",
        "阜新",
        "盘锦",
        "铁岭",
        "葫芦岛",
      ],
      legendsBar: ["修复量"],
      legendsLine: ["成功率"],
      barValue: [
        [
          {
            name: "沈阳",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "本溪",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "辽阳",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "朝阳",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "鞍山",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "抚顺",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "丹东",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "锦州",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "营口",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "阜新",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "盘锦",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "铁岭",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "葫芦岛",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
        ],
      ],
      lineValue: [
        [
          {
            name: "沈阳",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "本溪",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "辽阳",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "朝阳",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "鞍山",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "抚顺",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "丹东",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "锦州",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "营口",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "阜新",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "盘锦",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "铁岭",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "葫芦岛",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
        ],
      ],
    };
  },

  methods: {
    clickCb(params) {
      console.log(params.data.name, params.data.cityId);
    },
  },

  mounted() {
    /*setTimeout(()=>{
      this.showPie = true;
    },1000)*/

    this.$refs.chart.drawChart();
  },
};
</script>

<style lang="scss">
.fixed-result-wrap {
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  height: 388px;
}
</style>
