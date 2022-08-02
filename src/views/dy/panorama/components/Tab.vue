<template>
  <div class="flexcontain">
    <div class="leftcontain">
      <div style="width: 100%; height: 100%; box-sizing: border-box">
        <h2 class="title-h3">工信部百万用户申诉量</h2>
        <el-tabs
          class="tabPaneItem second-tabs"
          v-model="activeName_left"
          @tab-click="handleClickInner($event, 'left')"
        >
          <el-tab-pane :name="item.id" v-for="(item, idx) in tabs" :key="idx">
            <span class="littletab" slot="label" style="padding: 0 24px">
              {{ item.label }}</span
            >
            <div>
              <div class="showinfo">
                <div class="showinfo_item">
                  <div class="item_left">
                    <div v-if="activeName_left == '1'">上月来量人次</div>
                    <div v-else>当月来量人次</div>
                    <div class="item_left_data">
                      {{ item.peopleNum || "-" }}
                    </div>
                  </div>
                  <div class="item_right">
                    <span>环比：</span>
                    <Arrow
                      :num="Number(item.peopleMonthly)"
                      :isUpset="true"
                      unit="pp"
                    />
                  </div>
                </div>
                <div class="showinfo_item">
                  <div class="item_left">
                    <div v-if="activeName_left == '1'">上月有效量人次</div>
                    <div v-else>当月有效量人次</div>
                    <div class="item_left_data">
                      {{ item.effectNum || "-" }}
                    </div>
                  </div>
                  <div class="item_right">
                    <span>环比：</span>
                    <Arrow
                      :num="Number(item.effectMonthly)"
                      :isUpset="true"
                      unit="pp"
                    />
                  </div>
                </div>
              </div>
              <LineBarChart_2
                :ref="'linebar' + item.id"
                width="100%"
                height="306px"
                :legendsBar="isCurrentDate ? ['人次(万)'] : ['人次(万)', '']"
                :legendsLine="[]"
                :lineValue="[]"
                :sameMinMax="true"
                :showSymbol="false"
                :clickCb="clickCb"
                :barValue="barValue"
                :xName="xName"
                :colors="chartColors"
              ></LineBarChart_2>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="rightcontain">
      <div class="topcontain">
        <h2 class="title-h3">工信部百万用户申诉量对比趋势</h2>
        <el-tabs
          class="tabPaneItem second-tabs"
          v-model="activeName_right"
          @tab-click="handleClickInner($event, 'right')"
        >
          <el-tab-pane
            :name="item.id"
            v-for="(item, index) in tabright"
            :key="index"
          >
            <span class="littletab" slot="label" style="padding: 0 24px">
              {{ item.label }}</span
            >

            <div>
              <LineBarChart_2
                :ref="'line' + item.id"
                width="100%"
                height="160px"
                :legendsBar="[]"
                :legendsLine="['人次(万)', '']"
                :barValue="[]"
                :showSymbol="false"
                :clickCb="clickCb"
                :sameMinMax="true"
                :lineValue="lineValue"
                :xName="linexName"
                :colors="chartColors"
              ></LineBarChart_2>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="bottomcontain">
        <h3 class="title-h3">TOP10申诉问题改善率</h3>

        <div style="position: relative">
          <div class="backgrondshow">
            <div
              :class="[`circle-${item}`]"
              v-for="(item, index) in [1, 2, 3, 4, 5]"
              :key="'circle' + index"
            ></div>
            <div :class="[`line-${item}`]" v-for="item in 10" :key="item"></div>
          </div>
          <div ref="piechart" style="width: 100%; height: 194px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TrendLine from "@/components/common/charts/TrendLine.vue";
import Arrow from "@/components/common/arrow.vue";
import HalfPieChart from "./HalfPieChart.vue";
import LineBarChart_2 from "@/components/common/charts/LineBarChart_2.vue";
import { parseTime } from "@/utils/tools.js";
import {
  customer_complaint_info,
  customer_complaint_cityList,
  customer_complaint_compare,
  customer_complaint_improveRate,
} from "@/api/dy/panorama";

export default {
  components: { LineBarChart_2, TrendLine, Arrow, HalfPieChart },
  name: "Tab",
  props: ["cityId", "type"],
  data() {
    const _this = this;
    return {
      activeName_left: "1",
      activeName_right: "1",
      currentdate: this.getDate()[0],
      predate: this.getDate()[1],
      isCurrentDate: false,

      tabs: [
        {
          id: "1",
          label: "上月",
          peopleNum: "", //上月来量人次
          effectNum: "", //上月有效量人次
          peopleMonthly: "", //上月环比
          effectMonthly: "", //上月环比
          barValue: this.barValue,
        },
        {
          id: "2",
          label: "当月",
          peopleNum: "",
          effectNum: "",
          peopleMonthly: "",
          effectMonthly: "",
          barValue: this.barValue,
        },
      ],
      tabright: [
        {
          id: "1",
          label: "年度趋势",
          lineValue: this.lineValue,
        },
        {
          id: "2",
          label: "月度趋势",
          lineValue: this.lineValue,
        },
      ],

      //来量人次和环比
      rate: [],
      xName: [],
      linexName: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
      dataType: "1",
      maychart: null,

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
        "业务",
      ],
      chartColors: [
        ["#5FAEFF,#0682FF", "#FFBE4D"],
        ["#FFBE4D", "rgb(255, 137, 102)"],
      ],
      barValue: [],
      lineValue: [],
      pieData: [],
      pieConcatData: [
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
    };
  },
  methods: {
    getDate() {
      const currentdate = parseTime(new Date(), "{y}-{m}");
      let predate;
      const arrdate = currentdate.split("-");
      if (arrdate[1] == "01") {
        const year = Number(arrdate[0]) - 1;
        predate = `${year + ""}-12`;
      } else {
        const month = Number(arrdate[1]) - 1;
        predate = `${arrdate[0]}-${month}`;
      }
      return [currentdate, predate];
    },
    async handleClickInner(tab, pos) {
      const page = tab._props.name;
      //pos:柱状图还是折线图
      //page:上月/当月  或者 年度趋势/月度趋势
      if (pos == "left") {
        if (page == 1) {
          await this.customer_complaint_cityList(this.cityId, this.predate);
          this.isCurrentDate = false;
        } else {
          await this.customer_complaint_cityList(this.cityId, this.currentdate);
          this.isCurrentDate = true;
        }
        setTimeout(() => {
          this.$refs["linebar" + this.activeName_left][0].drawChart();
        }, 50);
      } else {
        if (page == 1) {
          this.dataType = "1";
          await this.customer_complaint_compare(this.cityId);
        } else {
          this.dataType = "2";
          await this.customer_complaint_compare(this.cityId);
        }
        setTimeout(() => {
          this.$refs["line" + this.activeName_right][0].drawChart();
        }, 50);
      }
    },
    clickCb(params) {
      // console.log(params.data.name, params.data.cityId);
    },
    tryPieChart() {
      if (this.maychart) {
        this.chart.dispose();
      }
      this.maychart = this.$echarts.init(this.$refs.piechart);
      var piedatatemp = [];
      this.pieData.forEach((item) => {
        piedatatemp.push(item.value);
      });
      let option = {
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
          itemGap: 25,
          itemHeight: 14,
          data: this.pieLegendData,
          textStyle: {
            color: "black",
          },
          orient: "vertical",
          left: "55%",
          top: "0%",

          icon: "circle",

          formatter: function (param) {
            let content = `${param}      ${piedatatemp.shift()}%`;
            return content;
          },
        },
        series: [
          //上面的都是圆弧
          {
            name: "",
            type: "pie",
            radius: [0, 160],
            avoidLabelOverlap: false,
            startAngle: -180,
            center: [160, "100%"],
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
            data: this.pieData.concat(this.pieConcatData),
          },
        ],
      };
      this.maychart.setOption(option);
      window.onresize = () => {
        this.maychart.resize();
      };
    },
    async customer_complaint_info(cityid) {
      let data1 = {
        type: this.type,
        cityId: this.cityId,
      };
      if (cityid) {
        data1 = {
          type: this.type,
          cityId: cityid,
        };
      }
      const { data } = await customer_complaint_info(data1);
      this.rate = data;
    },
    async customer_complaint_cityList(cityid, date) {
      let currentdate = parseTime(new Date(), "{y}-{m}");

      let data1 = {
        type: this.type,
        cityId: this.cityId,
        date: currentdate,
      };
      if (cityid) {
        data1 = {
          type: this.type,
          cityId: cityid,
        };
      }
      if (date) {
        data1 = {
          type: this.type,
          cityId: this.cityId,
          date: date,
        };
      }
      if (cityid && date) {
        data1 = {
          type: this.type,
          cityId: cityid,
          date: date,
        };
      }
      const { data } = await customer_complaint_cityList(data1);

      if (date == currentdate) {
        const currentValue = [];
        const xname = [];
        data.forEach((item) => {
          xname.push(item.area_name);
          const itemcurrent = {
            name: item.area_name,
            value: item.current_month_num_w,
            rate: Number(item.current_month_mom_rate),
          };

          currentValue.push(itemcurrent);
        });

        this.barValue = [currentValue, []];
        this.xName = xname;
      } else {
        const prevValue = [];
        const currentValue = [];
        const xname = [];
        data.forEach((item) => {
          xname.push(item.area_name);
          const itemprevalue = {
            name: item.area_name,
            value: item.prev_month_num_w,
            rate: Number(item.prev_month_mom_rate),
          };
          prevValue.push(itemprevalue);

          const itemcurrent = {
            name: item.area_name,
            value: item.prev_month_valid_num_w,
            rate: Number(item.prev_month_valid_mom_rate),
          };

          currentValue.push(itemcurrent);
        });
        this.barValue = [prevValue, currentValue];
        this.xName = xname;
      }

      
    },
    async customer_complaint_compare(cityid) {
      let data1 = {
        type: this.type,
        cityId: this.cityId,
        dateType: this.dataType,
      };
      if (cityid) {
        data1 = {
          type: this.type,
          cityId: cityid,
          dateType: this.dataType,
        };
      }
      const { curData, preData } = await customer_complaint_compare(data1);
      let value1 = [];
      let value2 = [];
      curData.forEach((item) => {
        let data = item.complaint_date;
        const tempdata = data.split("-");
        if (tempdata[1].indexOf(0) != -1) {
          tempdata[1] = tempdata[1].slice(1);
        }
        data = tempdata[0] + "年" + tempdata[1] + "月";
        let temp = {
          name: data,
          value: item.current_num,
        };
        let temp2 = {
          name: data,
          value: item.current_valid_num,
        };
        value1.push(temp);
        value2.push(temp2);
      });

      this.lineValue = [value1, value2];
      console.warn(this.lineValue);
    },
    async customer_complaint_improveRate(cityid) {
      let data1 = {
        type: this.type,
        cityId: this.cityId,
        // dateType: this.dataType,
      };
      if (cityid) {
        data1 = {
          type: this.type,
          cityId: cityid,
          // dateType: this.dataType,
        };
      }
      // const {data} = await customer_complaint_improveRate(data1);

      const data = [
        {
          label: "服务",
          improveRate: "19.6",
        },
        {
          label: "资费",
          improveRate: "18.6",
        },
        {
          label: "收费",
          improveRate: "15.6",
        },
        {
          label: "营销",
          improveRate: "5.6",
        },
        {
          label: "安全",
          improveRate: "19.6",
        },
        {
          label: "网络",
          improveRate: "18.6",
        },
        {
          label: "客服",
          improveRate: "15.6",
        },
        {
          label: "宣传",
          improveRate: "5.6",
        },
        {
          label: "通信",
          improveRate: "15.6",
        },
        {
          label: "业务",
          improveRate: "5.6",
        },
      ];

      data.forEach((item, index) => {
        const itemStyle = {
          normal: {
            color: this.piecolor[index],
            borderWidth: 1,
            borderColor: "white",
          },
        };
        let temp = {
          value: item.improveRate,
          name: item.label,
          itemStyle,
        };
        this.pieData.push(temp);
      });

      this.tryPieChart();
    },
    changeRate() {
      this.tabs = [
        {
          id: "1",
          label: "上月",
          peopleNum: Number(this.rate.prev_month_num_w), //上月来量人次
          effectNum: Number(this.rate.prev_month_valid_num_w), //上月有效量人次
          peopleMonthly: Number(this.rate.prev_month_mom_rate), //上月环比
          effectMonthly: Number(this.rate.prev_month_valid_mom_rate), //上月环比
          barValue: this.barValue,
        },
        {
          id: "2",
          label: "当月",
          peopleNum: this.rate.current_month_num_w,
          effectNum: "",
          peopleMonthly: Number(this.rate.current_month_mom_rate),
          effectMonthly: Number(this.rate.current_month_mom_rate),
          barValue: this.barValue,
        },
      ];
    },
    //数据重新加载,视图刷新
    async cityIdChange(value) {
      this.activeName_left = "1";
      this.activeName_right = "1";

      await Promise.all([
        this.customer_complaint_info(value),
        this.customer_complaint_cityList(value, this.predate),
        this.customer_complaint_compare(value),
        this.customer_complaint_improveRate(value),
      ]);

      this.tryPieChart();
      this.$refs["linebar" + this.activeName_left][0].drawChart();
      this.$refs["line" + this.activeName_right][0].drawChart();
    },
  },
  created() {
    const date = new Date();
    const year = date.getFullYear();
    this.linexName = this.linexName.map((item) => {
      return year + "年" + item;
    });
  },

  async mounted() {
    await Promise.all([
      this.customer_complaint_info(),
      this.customer_complaint_cityList(this.cityId, this.predate),
      this.customer_complaint_compare(this.cityId),
      this.customer_complaint_improveRate(this.cityId),
    ]);
    this.changeRate();
    this.$refs["linebar" + this.activeName_left][0].drawChart();
    this.$refs["line" + this.activeName_right][0].drawChart();
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
    margin-right: 24px;
    box-sizing: border-box;

    padding: 20px 24px;
    .el-tabs__content {
      overflow: hidden;
      position: relative;
      padding-top: 0px;
    }
    .showinfo {
      position: relative;
      top: -25px;
      font-size: 15px;
      color: rgb(127, 127, 127);
      width: 100%;
      height: 102px;
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
      padding: 20px 24px;
      height: 272px;
      box-sizing: border-box;
    }
    .bottomcontain {
      padding: 20px 24px;
      background-color: white;
      height: 272px;
      margin-top: 24px;
      width: 100%;
      box-sizing: border-box;
      position: relative;
      .backgrondshow {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 194px;
        overflow: hidden;
        @for $i from 1 through 5 {
          .circle-#{$i} {
            width: 384px - $i * 64;
            height: 384px - $i * 64;
            border-radius: 50%;
            position: absolute;
            bottom: 0;
            left: 160px;
            transform: translate(-50%, 50%);
            border: solid 1px rgb(223, 223, 223);
          }
        }
        @for $i from 1 through 10 {
          .line-#{$i} {
            box-sizing: border-box;
            width: 320px;
            height: 1px;
            position: absolute;
            bottom: 0px;
            background-color: rgb(223, 223, 223);
            transform: rotate(0deg + $i * 18);
          }
        }
      }
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