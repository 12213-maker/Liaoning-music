<template>
  <div>
    <div
      class="echart-box"
      :style="{ height: height, width: width }"
      ref="chart"
      v-show="xName.length"
    ></div>
  </div>
</template>
<script>
import Blank from "@/components/common/Blank";
import Arrow from "@/components/common/arrow.vue";

export default {
  components: {
    Blank,
    Arrow,
  },
  props: {
    height: String,
    width: String,
    xName: Array,
    barValue: Array,
    lineValue: Array,
    stack: Boolean,
    colors: Array,
    legendsLine: Array,
    legendsBar: Array,
    clickCb: Function,
    showSymbol: {
      default: true,
      type: Boolean,
    },
    sameMinMax: {
      default: false,
      type: Boolean,
    },
    minInterval: Number,
    min: Number,
    formatterAxisLabel: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      names: "totals" + Math.floor(Math.random() * 100),
      chart: null,
    };
  },
  methods: {
    linear(startColor, endColor) {
      // 4个方位参数依次为右、下、左、上，（0 0 0 1）代表从正上方开始
      // 数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
      return new this.$echarts.graphic.LinearGradient(
        0,
        0,
        0,
        1,
        [
          {
            offset: 0,
            color: startColor,
          },
          {
            offset: 1,
            color: endColor,
          },
        ],
        false
      );
    },
    drawChart() {
      let that = this;

      if (this.chart) {
        this.chart.dispose();
      }
      this.chart = this.$echarts.init(this.$refs.chart);
      let min = 0;
      let max = 0;
      if (this.sameMinMax) {
          this.barValue.forEach((item) => {
            if(item.length!=0){
              item.sort((a, b) => {
              if (a.value) {
                return a.value - b.value;
              } else {
                return a - b;
              }
            });

            if (item[0].value && item[0].value < min) {
              min = Number(item[0].value);
            } else if (item[0] < min) {
              min = Number(item[0]);
            }

            if (
              item[item.length - 1].value &&
              item[item.length - 1].value > max
            ) {
              max = Number(item[item.length - 1].value);
            } else if (item[item.length - 1] > max) {
              max = Number(item[item.length - 1]);
            }
            }

          });
        
        if (this.lineValue.length != 0) {
          this.lineValue.forEach((item) => {
            if(item.length!=0){
              item.sort((a, b) => {
              if (a.value) {
                return a.value - b.value;
              } else {
                return a - b;
              }
            });

            if (item[0].value && item[0].value < min) {
              min = Number(item[0].value);
            } else if (item[0] < min) {
              min = Number(item[0]);
            }

            if (
              item[item.length - 1].value &&
              item[item.length - 1].value > max
            ) {
              max = Number(item[item.length - 1].value);
            } else if (item[item.length - 1] > max) {
              max = Number(item[item.length - 1]);
            }
            }
            
          });
        }
      }

      let option = {
        tooltip: {
          show: true,
          padding: 0,
          trigger: "axis",
          textStyle: {
            color: "#000",
            decoration: "none",
          },
          borderColor: "rgba(255,255,255,0)",
          backgroundColor: "rgba(255,255,255,0.9)",
          confine: true,
          renderMode: "html",
          axisPointer: {
            lineStyle: {
              color: "#dcdcdc",
              width: 1,
              type: "dashed",
            },
          },
          formatter: function (val) {
            let content = "";
            content += `<div style="padding:10px 10px 5px 10px;">
                            <span style="width:140px;display:inline-block; color:#999; font-family:syht">${val[0].axisValue}</span>
                        </div>`;

            val.forEach((el) => {
              let colorStr = el.color;
              if (typeof el.color != "string") {
                colorStr =
                  "linear-gradient(180deg, " +
                  el.color.colorStops[0].color +
                  ", " +
                  el.color.colorStops[1].color +
                  ")";
              }
              let value = "";
              if (
                el.seriesName.indexOf("比") != -1 ||
                el.seriesName.indexOf("率") != -1
              ) {
                if (el.data.value) {
                  value = `${el.data.value}%`;
                } else {
                  value = `${el.data}%`;
                }
              } else {
                if (el.data.value) {
                  value = el.data.value;
                } else {
                  value = el.data;
                }
              }
              content += `<div style="padding:5px 10px 10px 10px; display:inline-block;">
                            <span style="width:auto;display:inline-block;color:#666; font-family:syht">
                                <i style="display: inline-block;width: 10px;height: 10px;background:${colorStr};margin-right: 5px;border-radius: 50%;}"></i>
                                 <span>${el.seriesName}</span> <span style="margin-left:30px;">${value}</span>
                            </span>
                          </div>`;

              if (el.data.rate) {
                content += `<div style="padding:5px 10px 10px 10px; display:inline-block;">
                            <span style="width:auto;display:inline-block;color:#666; font-family:syht">环比：${el.data.rate}</span>

                          </div><br/>`;
              } else {
                content += `<br/>`;
              }
            });
            return (
              '<div class="showBox"  style="box-shadow:0px 4px 11px 1px rgba(99,99,99,0.19)" >' +
              content +
              "</div>"
            );
          },
        },
        grid: [
          {
            top: 50,
            left: 20,
            right: 20,
            bottom: 0,
            containLabel: true,
          },
        ],
        legend: {
          //   data: this.legendsBar.concat(this.legendsLine),
          itemGap: 40, // 设置间距
        },

        xAxis: [
          {
            data: this.xName,
            type: "category",
            axisLine: { show: false },
            axisLabel: {
              color: "#999",
              lineHeight: 14,
              formatter: (val) => {
                if (this.formatterAxisLabel) {
                  var strs = val.split(""); //字符串数组
                  var str = "";
                  for (var i = 0, s; (s = strs[i++]); ) {
                    //遍历字符串数组
                    str += s;
                    if (!(i % 3)) str += "\n";
                  }
                  return str;
                }
                return val.length >= 7 ? val.split("").splice(5).join("") : val;
              },
            },

            axisTick: {
              //x轴刻度线
              show: false,
            },
          },
        ],
        yAxis: [],
        series: [],
      };

      let series = [];
      let yAxis = [];

      this.legendsBar.forEach((el, indexs) => {
        let yObj;
        if (this.sameMinMax) {
          yObj = {
            type: "value",
            name: el || "",
            nameGap: 30,
            nameTextStyle: {
              color: "#8c8c8c",
            },
            axisLine: { show: false },
            axisTick: {
              //y轴刻度线
              show: false,
            },
            axisLabel: {
              formatter: indexs == 0 ? "{value}" : "",
              color: "#999",
            },
            splitLine: {
              //网格线
              show: indexs == 0 ? true : false,
              lineStyle: {
                type: "dotted", //设置网格线类型 dotted：虚线 solid:实线
              },
            },
            scale: true,
            minInterval: this.minInterval ? this.minInterval : "",
            boundaryGap: ["0%", "5%"],
            min: min,
            max: parseInt(max * 1.1),
          };
        } else {
          yObj = {
            type: "value",
            name: el || "--",
            nameGap: 30,
            nameTextStyle: {
              color: "#8c8c8c",
            },
            axisLine: { show: false },
            axisTick: {
              //y轴刻度线
              show: false,
            },
            axisLabel: {
              formatter: "{value}",
              color: "#999",
            },
            splitLine: {
              //网格线
              show: indexs == 0 ? true : false,
              lineStyle: {
                type: "dotted", //设置网格线类型 dotted：虚线 solid:实线
              },
            },
            scale: true,
            minInterval: this.minInterval ? this.minInterval : "",
            boundaryGap: ["0%", "5%"],
          };

          if (this.min != undefined) {
            yObj.min = min;
          }
        }
        yAxis.push(yObj);
        series.push({
          name: indexs == 0 ? "上月来量" : "上月有效量",

          type: "bar",
          barWidth: "auto",
          barMaxWidth: "16px",
          yAxisIndex: indexs,
          color: this.colors[0][indexs].includes(",")
            ? this.linear(
                this.colors[0][indexs].split(",")[0],
                this.colors[0][indexs].split(",")[1]
              )
            : this.colors[0][indexs],
          data: this.barValue[indexs],
        });
      });
      console.warn(1);
      this.legendsLine.forEach((item, idx) => {
        let yObj;
        if (this.sameMinMax) {
          yObj = {
            type: "value",
            name: item,
            nameGap: 30,
            nameTextStyle: {
              color: "#8c8c8c",
            },
            axisLine: { show: false },
            axisTick: {
              //y轴刻度线
              show: false,
            },

            axisLabel: {
              formatter:
                idx == 0
                  ? `${
                      item.indexOf("比") != -1 || item.indexOf("率") != -1
                        ? "{value}%"
                        : "{value}"
                    }`
                  : "",
              color: "#999",
            },
            splitLine: {
              //网格线
              show: idx == 0 && this.legendsBar.length == 0 ? true : false,
              lineStyle: {
                type: "dotted", //设置网格线类型 dotted：虚线 solid:实线
              },
            },
            boundaryGap: ["0%", "5%"],
            minInterval: this.minInterval ? this.minInterval : "",
            min: min,
            max: parseInt(max * 1.1),
          };
        } else {
          yObj = {
            type: "value",
            name: item,
            nameGap: 30,
            nameTextStyle: {
              color: "#8c8c8c",
            },
            axisLine: { show: false },
            axisTick: {
              //y轴刻度线
              show: false,
            },
            axisLabel: {
              formatter: `${
                item.indexOf("比") != -1 || item.indexOf("率") != -1
                  ? "{value}%"
                  : "{value}"
              }`,
              color: "#999",
            },
            splitLine: {
              //网格线
              show: idx == 0 && this.legendsBar.length == 0 ? true : false,
              lineStyle: {
                type: "dotted", //设置网格线类型 dotted：虚线 solid:实线
              },
            },
            minInterval: this.minInterval ? this.minInterval : "",
            boundaryGap: ["0%", "5%"],
          };

          if (this.min != undefined) {
            yObj.min = min;
          }
        }
        yAxis.push(yObj);
        console.warn(123);

        series.push({
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: idx == 0 ? "rgb(255, 234, 200)" : "rgb(255, 215, 184)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "white", // 100% 处的颜色
                },
              ],
              global: false,
            },
          },

          name: idx == 0 ? "来量" : "有效量",
          type: "line",
          yAxisIndex: !this.legendsBar.length
            ? idx
            : this.legendsBar.length + idx,
          smooth: true,
          showSymbol: this.showSymbol,
          color: this.colors[1][idx],
          data: this.lineValue[idx].map((e) => {
            return e == "-" ||
              (item.includes("比") && !e.toString().includes("-"))
              ? Number(e)
              : e;
          }),
        });
      });

      option.yAxis = yAxis;
      option.series = series;

      console.log(option);
      this.chart.clear();
      this.chart.setOption(option);

      if (this.clickCb) {
        this.chart.on("click", (params) => {
          this.clickCb(params);
        });
      }

      window.onresize = () => {
        this.chart.resize();
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.echart-box {
  width: 100%;
}
</style>
