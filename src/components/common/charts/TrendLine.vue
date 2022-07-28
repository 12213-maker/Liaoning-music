<template>
  <div 
  style="width: 100%" 
  :style="{ height: height }" 
  ref="chart"></div>
</template>
<script>
import Vue from "vue";
import * as echarts from "echarts";

export default {
  name: "TrendLine",
  props: {
    datas: Array,
    title: String,
    subtext: String,
    unit: String,
    height: String,
    showLegend: {
      type: Boolean,
      default: false,
    },
    serieName: String,
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    datas(val) {
      if (!this.chart) {
        this.initChart();
      } else {
        this.updateOption();
      }
    },
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart, null, {
        render: "svg",
      });
      window.addEventListener("resize", () => {
        this.chart.resize();
      });
      this.updateOption();
    },

    updateOption() {
      let xData = [];
      this.datas.forEach((item) => {
        xData.push(item.label);
      });
      const _this = this;

      let option = {
        title: {
          text: this.title,
          subtext: this.subtext,
          textStyle: {
            fontSize: 14,
            color: "#262626",
            fontFamily: "syht",
            fontWeight: "normal",
          },
          subtextStyle: {
            color: "#8C8C8C",
            lineHeight: 20,
            fontFamily: "syhtLight",
            fontSize: 12,
          },
          top: 0,
          left: -4,
        },

        tooltip: {
          trigger: "axis",
          showContent: true,
          axisPointer: {
            // type:'none'
            lineStyle: {
              color: "#dcdcdc",
              type: "dashed",
            },
          },
          textStyle: {
            color: "#000",
            decoration: "none",
          },
          confine: true,
          borderColor: "rgba(0,0,0,0)",
          backgroundColor: "rgba(255,255,255,0.90)",
          formatter: (params) => {
            // ${params[0].data.label}
            return `
                <div style="border-radius:4px;box-shadow: 0px 4px 11px 1px rgba(99,99,99,0.19); font-size:14px; color:#262626; font-family:syht; padding: 16px 12px;">
                  ${params[0].seriesName}：
                  <span style="font-size:24px;">${params[0].data.value}</span>
                  <span style="font-family:syht; color:#8c8c8c; margin-left:4px;">${_this.unit}</span>
                </div>
              `;
          },
        },

        legend: {
          show: this.showLegend,
          top: 40,
          textStyle: {
            color: "#8c8c8c",
            fontFamily: "syhtLight",
          },
        },

        color: ["#FF9900", "#000000"],
        grid: {
          top: 70,
          bottom: 10,
          containLabel: true,
          left: 0,
          right: 0,
        },
        xAxis: {
          show: true,
          type: "category",
          boundaryGap: true,
          data: xData,
          axisLabel: {
            color: "#8C8C8C",
            fontSize: 12,
            fontFamily: "syhtLight",
            lineHeight: 30,
          },
          axisLine: {
            lineStyle: {
              color: "#DCDCDC",
            },
          },

          axisTick: {
            show: false,
          },
        },

        yAxis: {
          show: true,
          type: "value",
          axisLabel: {
            color: "#8C8C8C",
            fontSize: 10,
            fontFamily: "syhtLight",
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dotted",
              color: "#DCDCDC",
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          min: 0,
          max: 100,
          splitNumber: 5,
        },

        series: [
          {
            data: this.datas,
            name: this.serieName,
            type: "line",
            smooth: true,
            symbol: "emptyCircle",
            symbolSize: 8,
            lineStyle: {
              width: 3,
            },
            showSymbol: this.datas.length == 1 ? true : false,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(255,153,0,0.5)",
                  },
                  {
                    offset: 1,
                    color: "rgba(255,153,0,0)",
                  },
                ],
                false
              ),
            },
            label: {
              show: false,
            },
          },
        ],
      };
      this.chart.setOption(option);
    },
  },
};
</script>
<style scoped lang="scss">
</style>

