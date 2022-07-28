<template>
  <div class="complaintindex">
    <div class="selctChoice">
      <span>地市：</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <el-tabs
      v-model="activeNameOuter"
      @tab-click="handleClickOuter"
      style="width: 100%"
    >
      <el-tab-pane name="first">
        <span slot="label" style="padding: 0 24px">工信部百万用户申诉量</span>
        <Tab
          v-if="echart_show[0].Tab_show"
          :xName="xName"
          :legendsBar="legendsBar"
          :legendsLine="legendsLine"
          :chartColors="chartColors"
          :barValue="barValue"
          :lineValue="lineValue"
          ref="tab_1"
          :echart_show="echart_show"
        ></Tab>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label" style="padding: 0 24px">携号转网百万用户申诉量</span>
        <Tab
          v-if="echart_show[1].Tab_show"
          :xName="xName"
          :legendsBar="legendsBar"
          :legendsLine="legendsLine"
          :chartColors="chartColors"
          :barValue="barValue"
          :lineValue="lineValue"
          ref="tab_2"
          :echart_show="echart_show"
        ></Tab>
      </el-tab-pane>
      <el-tab-pane name="third">
        <span slot="label" style="padding: 0 24px">宣传营销百万用户申诉量</span>
        <Tab
          v-if="echart_show[2].Tab_show"
          :xName="xName"
          :legendsBar="legendsBar"
          :legendsLine="legendsLine"
          :chartColors="chartColors"
          :barValue="barValue"
          :lineValue="lineValue"
          ref="tab_3"
          :echart_show="echart_show"
          :changeEchartShow="changeEchartShow"
        ></Tab>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Tab from "./components/Tab.vue";
export default {
  name: "ComplaintIndex",
  components: { Tab },
  data() {
    return {
      value: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      echart_show: [
        { Tab_show: true, left: [true, false], right: [true, false] },
        { Tab_show: false, left: [false, false], right: [false, false] },
        { Tab_show: false, left: [false, false], right: [false, false] },
      ],
      activeNameOuter: "first",
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
      chartColors: [
        ["#5FAEFF,#0682FF", "#FFBE4D"],
        ['#FFBE4D','rgb(255, 137, 102)']
      ],
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
    changeTabShow(flag, value) {
      this.echart_show = [
        { Tab_show: false, left: [false, false], right: [false, false] },
        { Tab_show: false, left: [false, false], right: [false, false] },
        { Tab_show: false, left: [false, false], right: [false, false] },
      ];
      this.echart_show[flag] = value;
      if (flag == 0) {
        this.$nextTick(() => {
          this.$refs.tab_1.commitdrawchart();
        });
      } else if (flag == 1) {
        this.$nextTick(() => {
          this.$refs.tab_2.commitdrawchart();
        });
      } else {
        this.$nextTick(() => {
          this.$refs.tab_3.commitdrawchart();
        });
      }
    },
    handleClickOuter(tab) {
      const value = {
        Tab_show: true,
        left: [true, false],
        right: [true, false],
      };
      const page = tab._props.name;
      if (page == "first") {
        this.changeTabShow(0, value);
      } else if (page == "second") {
        this.changeTabShow(1, value);
      } else {
        this.changeTabShow(2, value);
      }
    },
    changeEchartShow(){

    }
  },
  created() {
    this.$nextTick(() => {
      this.$refs.tab_1.commitdrawchart();
    });
  },
};
</script>

<style lang="scss">
.complaintindex {
  background-color: rgb(242, 242, 242);
  padding: 20px 48px;
  width: 100vw;
  position: relative;
  .selctChoice {
    position: absolute;
    top: 20px;
    right: 48px;
    z-index: 999;
  }
  .el-tabs__nav-wrap::after {
    background-color: rgb(242, 242, 242) !important;
  }
  .title-h3 {
    margin: 0;
  }
  .el-tabs__item,
  .is-top {
    font-size: 21px;
  }
}
</style>