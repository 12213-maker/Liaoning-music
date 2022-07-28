<template>
  <div class="flexcontain">
    <div class="leftcontain">
      <div style="width: 100%; height: 100%; box-sizing: border-box">
        <h2 class="title-h3">工信部百万用户申诉量</h2>
        <el-tabs
          class="tabPaneItem"
          v-model="activeName_left"
          @tab-click="handleClickInner($event, 'left')"
        >
          <el-tab-pane name="first">
            <span class="littletab" slot="label" style="padding: 0 24px">
              上月</span
            >
            <div>
              <div class="showinfo">
                <div class="showinfo_item">
                  <div class="item_left">
                    <div>上月来量人次</div>
                    <div class="item_left_data">{{ visitors }}</div>
                  </div>
                  <div class="item_right">
                    <span>环比：</span>
                    <Arrow :num="0.13" unit="pp" />
                  </div>
                </div>
                <div class="showinfo_item">
                  <div class="item_left">
                    <div>上月来量人次</div>
                    <div class="item_left_data">{{ visitors }}</div>
                  </div>
                  <div class="item_right">
                    <span>环比：</span>
                    <Arrow :num="0.13" unit="pp" />
                  </div>
                </div>
              </div>
              <LineBarChart
                ref="Tab3_left_tab1"
                width="100%"
                height="50vh"
                :xName="xName"
                :legendsBar="['上月来量', '上月有效量']"
                :legendsLine="[]"
                :colors="chartColors"
                :barValue="barValue"
                :lineValue="[]"
                :showSymbol="false"
                :clickCb="clickCb"
              ></LineBarChart>
            </div>
          </el-tab-pane>
          <el-tab-pane name="second">
            <span class="littletab" slot="label" style="padding: 0 24px">
              当月</span
            >

            <div v-if="echart_show[2].left[1]">
              <div class="showinfo">
                <div class="showinfo_item">
                  <div class="item_left">
                    <div>上月来量人次</div>
                    <div class="item_left_data">{{ visitors }}</div>
                  </div>
                  <div class="item_right">
                    <span>环比：</span>
                    <Arrow :num="0.13" unit="pp" />
                  </div>
                </div>
                <div class="showinfo_item">
                  <div class="item_left">
                    <div>上月来量人次</div>
                    <div class="item_left_data">{{ visitors }}</div>
                  </div>
                  <div class="item_right">
                    <span>环比：</span>
                    <Arrow :num="0.13" unit="pp" />
                  </div>
                </div>
              </div>
              <LineBarChart
                ref="Tab3_left_tab2"
                width="100%"
                height="50vh"
                :xName="xName"
                :legendsBar="['上月来量', '上月有效量']"
                :legendsLine="[]"
                :colors="chartColors"
                :barValue="barValue"
                :lineValue="[]"
                :showSymbol="false"
                :clickCb="clickCb"
              ></LineBarChart>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="rightcontain">
      <div class="topcontain">
        <h2 class="title-h3">工信部百万用户申诉量对比趋势</h2>
        <el-tabs
          class="tabPaneItem"
          v-model="activeName_right"
          @tab-click="handleClickInner($event, 'right')"
        >
          <el-tab-pane name="first">
            <span class="littletab" slot="label" style="padding: 0 24px">
              年度趋势</span
            >

            <div>
              <LineBarChart
                ref="Tab3_right_tab1"
                width="100%"
                height="28vh"
                :xName="xName"
                :legendsBar="[]"
                :legendsLine="['来量', '有效量']"
                :colors="chartColors"
                :barValue="[]"
                :lineValue="lineValue"
                :showSymbol="false"
                :clickCb="clickCb"
              ></LineBarChart>
            </div>
          </el-tab-pane>
          <el-tab-pane name="second">
            <span class="littletab" slot="label" style="padding: 0 24px">
              月度趋势</span
            >

            <div v-if="echart_show[2].right[1]">
              <LineBarChart
                ref="Tab3_right_tab2"
                width="100%"
                height="28vh"
                :xName="xName"
                :legendsBar="[]"
                :legendsLine="['来量', '有效量']"
                :colors="chartColors"
                :barValue="[]"
                :lineValue="lineValue"
                :showSymbol="false"
                :clickCb="clickCb"
              ></LineBarChart>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="bottomcontain">
        <h3 class="title-h3">TOP10申诉问题改善率</h3>
        <div ref="piechart" style="width: 100%; height: 34vh"></div>
        <!-- <HalfPieChart
          ref="halfpiechartref"
          width="100%"
          height="34vh"
        ></HalfPieChart> -->
      </div>
    </div>
  </div>
</template>

<script>
import LineBarChart from "@/components/common/charts/LineBarChart.vue";
import TrendLine from "@/components/common/charts/TrendLine.vue";
import Arrow from "@/components/common/arrow.vue";
import HalfPieChart from "./HalfPieChart.vue";
export default {
  components: { LineBarChart, TrendLine, Arrow, HalfPieChart },
  name: "Tab",
  props: [
    "echart_show",
    "xName",
    "legendsBar",
    "legendsLine",
    "chartColors",
    "barValue",
    "lineValue",
  ],
  data() {
    return {
      activeName_left: "first",
      activeName_right: "first",
      visitors: "6.70",
      piecolor: [
        "rgb(45, 154, 85)",
        "rgb(67, 165, 93)",
        "rgb(89, 175, 100)",
        "rgb(112, 186, 107)",
        "rgb(134, 196, 115)",
        "rgb(155, 208, 122)",
        "rgb(177, 218, 130)",
        "rgb(200, 228, 137)",
        "rgb(222, 239, 144)",
        "rgb(244, 249, 152)",
      ],
      legendsPie: [
        "服务",
        "资费",
        "收费",
        "营销",
        "安全",
        "网络",
        "客服",
        "宣传",
        "通信",
        "业务",
      ],
      pieLegendData: [
        "服务",
        "资费",
        "收费",
        "营销",
        "安全",
        "网络",
        "客服",
        "宣传",
        "通信",
      ],
    };
  },
  methods: {
    handleClickInner(tab, pos) {
      const page = tab._props.name;
      //pos:柱状图还是折线图
      //page:上月/当月  或者 年度趋势/月度趋势
      if (pos == "left") {
        if (page == "first") {
          console.log("left first");
          //这里面只用处理左边的show的true or false
          this.echart_show[2].left = [true, false];
          this.$nextTick(() => {
            this.$refs.Tab3_left_tab1.drawChart();
          });
        } else {
          console.log("left second");
          this.echart_show[2].left = [false, true];
          this.$nextTick(() => {
            this.$refs.Tab3_left_tab2.drawChart();
          });
        }
      } else {
        if (page == "first") {
          console.log("right first");
          //这里面只用处理左边的show的true or false
          this.echart_show[2].right = [true, false];
          this.$nextTick(() => {
            this.$refs.Tab3_right_tab1.drawChart();
          });
        } else {
          console.log("right second");
          this.echart_show[2].right = [false, true];
          this.$nextTick(() => {
            this.$refs.Tab3_right_tab2.drawChart();
          });
        }
      }
    },

    clickCb(params) {
      console.log(params.data.name, params.data.cityId);
    },
    tryPieChart() {
      let mychart = this.$echarts.init(this.$refs.piechart);
      let option = {
        backgroundColor: "white",
        calculable: true,
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(255,255,255,1)",
          textStyle: {
            color: "black",
          },
          formatter: function (param) {
            let content = `<div style="padding:5px 10px 10px 10px;">
                            <span style="width:140px;display:inline-block;color:#666; font-family:syht">
                                 <span style="color:rgb(153, 153, 153);">${param.name}</span> <br/>
                                 <i style="display: inline-block;width: 10px;height: 10px;background:${param.color};margin-right: 5px;border-radius: 50%;}"></i>
                                 <span style="margin-left:5px;">改善率 ${param.percent}%</span>
                            </span>
                          </div>`;
            return (
              '<div class="showBox"  style="box-shadow:0px 4px 11px 1px rgba(99,99,99,0.19)" >' +
              content +
              "</div>"
            );
          },
        },
        legend: {
          itemGap: 40,
          data: this.pieLegendData,
          textStyle: {
            color: "black",
          },
          orient: "vertical",
          left: "right",
          itemHeight: 14,
          icon: "circle",
          formatter: function (param) {
            return `${param}`;
          },
        },
        calculable: true,
        series: [
          {
            name: "半圆",
            type: "pie",
            //这个圆的大小,只有一个0.2%大
            radius: ["4.8%", "5%"],
            center: ["25%", "75%"],
            startAngle: -180,
            hoverAnimation: false,
            legendHoverLink: true,
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: "500",
                name: "半圆",
                label: {
                  show: false,
                },
              },
              {
                value: "500",
                itemStyle: {
                  normal: {
                    color: "transparent",
                  },
                },
              },
            ],
          },
          {
            name: "第一条圆弧",
            type: "pie",
            radius: ["14.8%", "15%"],
            center: ["25%", "75%"],
            startAngle: -180,
            hoverAnimation: false,
            legendHoverLink: true,
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: "500",
                name: "第一条圆弧",
                label: {
                  show: false,
                },
              },
              {
                value: "500",
                itemStyle: {
                  normal: {
                    color: "transparent",
                  },
                },
              },
            ],
          },
          {
            name: "第二条圆弧",
            type: "pie",
            startAngle: -180,
            center: ["25%", "75%"],
            hoverAnimation: false,
            legendHoverLink: true,
            radius: ["24.8%", "25%"],
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: "500",
                name: "第二条圆弧",
              },
              {
                value: "500",
                itemStyle: {
                  normal: {
                    color: "transparent",
                  },
                },
              },
            ],
          },
          {
            name: "第三条圆弧",
            type: "pie",
            center: ["25%", "75%"],
            startAngle: -180,
            hoverAnimation: false,
            legendHoverLink: true,
            radius: ["34.8%", "35%"],
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: "500",
                name: "第三条圆弧",
              },
              {
                value: "500",
                itemStyle: {
                  normal: {
                    color: "transparent",
                  },
                },
              },
            ],
          },
          {
            name: "第四条圆弧",
            type: "pie",
            center: ["25%", "75%"],
            startAngle: -180,
            hoverAnimation: false,
            legendHoverLink: true,
            radius: ["44.8%", "45%"],
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: "500",
                name: "第四条圆弧",
              },
              {
                value: "500",
                itemStyle: {
                  normal: {
                    color: "transparent",
                  },
                },
              },
            ],
          },
          {
            name: "第五条圆弧",
            type: "pie",
            center: ["25%", "75%"],
            startAngle: -180,
            hoverAnimation: false,
            legendHoverLink: true,
            radius: ["54.8%", "55%"],
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: "500",
                name: "第五条圆弧",
              },
              {
                value: "500",
                itemStyle: {
                  normal: {
                    color: "transparent",
                  },
                },
              },
            ],
          },
          {
            name: "第六条圆弧",
            type: "pie",
            center: ["25%", "75%"],
            startAngle: -180,
            hoverAnimation: false,
            legendHoverLink: true,
            radius: ["64.8%", "65%"],
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: "500",
                name: "第六条圆弧",
              },
              {
                value: "500",
                itemStyle: {
                  normal: {
                    color: "transparent",
                  },
                },
              },
            ],
          },
          {
            name: "第七条圆弧",
            type: "pie",
            center: ["25%", "75%"],
            startAngle: -180,
            hoverAnimation: false,
            legendHoverLink: true,
            radius: ["74.8%", "75%"],
            label: {
              normal: {
                show: false,
              },
            },
            // splitLine: {
            //     show:true,
            //     length: '92%',
            //     lineStyle: {
            //         color: 'red',
            //         width: '1'
            //     }
            // },
            data: [
              {
                value: "500",
                name: "第七条圆弧",
              },
              {
                value: "500",
                itemStyle: {
                  normal: {
                    color: "transparent",
                  },
                },
              },
            ],
          },

          //上面的都是圆弧
          {
            name: "",
            type: "pie",
            radius: [0, 200],
            avoidLabelOverlap: false,
            startAngle: -180,
            center: ["25%", "75%"],
            roseType: "area",
            selectedMode: "single",
            labelLine: {
              normal: {
                show: false,
              },
            },
            label: {
              show: false,
            },
            data: [
              //这下面才是真正的数据
              {
                value: 1000,
                name: this.legendsPie[0],
                itemStyle: {
                  normal: {
                    color: this.piecolor[0],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 1500,
                name: this.legendsPie[1],
                itemStyle: {
                  normal: {
                    color: this.piecolor[1],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 2000,
                name: this.legendsPie[2],
                itemStyle: {
                  normal: {
                    color: this.piecolor[2],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 2500,
                name: this.legendsPie[3],
                itemStyle: {
                  normal: {
                    color: this.piecolor[3],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 3000,
                name: this.legendsPie[4],
                itemStyle: {
                  normal: {
                    color: this.piecolor[4],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 3500,
                name: this.legendsPie[5],
                itemStyle: {
                  normal: {
                    color: this.piecolor[5],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 4000,
                name: this.legendsPie[6],
                itemStyle: {
                  normal: {
                    color: this.piecolor[6],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 4500,
                name: this.legendsPie[7],
                itemStyle: {
                  normal: {
                    color: this.piecolor[7],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 5000,
                name: this.legendsPie[8],
                itemStyle: {
                  normal: {
                    color: this.piecolor[8],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 5000,
                name: this.legendsPie[9],
                itemStyle: {
                  normal: {
                    color: this.piecolor[9],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
            ],
          },
        ],
      };
      mychart.setOption(option);
    },
    commitdrawchart() {
      this.activeName_left = "first";
      this.activeName_right = "first";

      this.$nextTick(() => {
        this.$refs.Tab3_left_tab1.drawChart();
        this.$refs.Tab3_right_tab1.drawChart();
        this.tryPieChart();
        // this.$refs.halfpiechartref.drawChart();
      });
    },
  },
};
</script>

<style lang="scss">
.flexcontain {
  display: flex;
  width: 100%;
  .leftcontain {
    background-color: white;
    width: 48%;
    margin-right: 30px;

    padding: 30px;
    .el-tabs__content {
      overflow: hidden;
      position: relative;
      padding-top: 20px;
    }
    .showinfo {
      position: relative;
      top: -25px;
      font-size: 15px;
      color: rgb(127, 127, 127);
      width: 100%;
      height: 14vh;
      margin: 20px 0;
      display: flex;
      justify-content: space-between;
      align-content: center;
      .showinfo_item {
        background-color: rgb(245, 245, 245);
        height: 100%;
        width: 48%;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-around;
        .item_left {
          width: 45%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: left;
          padding-left: 17px;
          .item_left_data {
            width: 100%;
            font-size: 25px;
            color: black;
            position: relative;
            top: 5px;
          }
        }
        .item_right {
          padding-top: 15px;
          font-size: 15px;
          width: 45%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          position: relative;
          top: 7px;
        }
      }
    }
  }
  .rightcontain {
    width: 50%;
    .topcontain {
      background-color: white;
      width: 100%;
      padding: 20px;
    }
    .bottomcontain {
      padding: 20px;
      background-color: white;

      margin-top: 30px;
      width: 100%;
    }
  }
  .btns {
    height: 15%;
  }
  .littletab {
    font-size: 14px;
  }
}
</style>