<template>
  <div class="complaintindex no-line-tab">
    <div class="selctChoice">
      <span>地市：</span>
      <el-select @change="selectChange" v-model="value" size="small" placeholder="全部">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.cityname"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>
    <el-tabs
      v-model="activeNameOuter"
      @tab-click="handleClickOuter"
      style="width: 100%"
    >
      <el-tab-pane :name="item.name" v-for="(item, index) in tabs" :key="index">
        <span slot="label" style="padding: 0 24px">{{ item.label }}</span>
        <Tab
          v-if="echart_show[index].Tab_show"
          :ref="'tab_' + Number(index + 1)"
          :cityId="value=='全部'?'999':value"
          :type="activeNameOuter"
        ></Tab>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getCustomer_cityList } from "@/api/dy/panorama";
import Tab from "./components/Tab.vue";
export default {
  name: "ComplaintIndex",
  components: { Tab },
  data() {
    return {
      tabs: [
        {
          name: "1",
          label: "工信部百万用户申诉量",
        },
        {
          name: "2",
          label: "携号转网百万用户申诉量",
        },
        {
          name: "3",
          label: "宣传营销百万用户申诉量",
        },
      ],
      value: "全部",
      options: [
      ],
      echart_show: [
        { Tab_show: true, left: [true, false], right: [true, false] },
        { Tab_show: false, left: [false, false], right: [false, false] },
        { Tab_show: false, left: [false, false], right: [false, false] },
      ],
      activeNameOuter: "1",
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
      setTimeout(()=>{
        this.$refs['tab_'+this.activeNameOuter][0].commitdrawchart()
        this.$refs['tab_'+this.activeNameOuter][0].changeRate()
        
      },50)
    },
    handleClickOuter(tab) {
      const value = {
        Tab_show: true,
        left: [true, false],
        right: [true, false],
      };
      const page = tab._props.name;
      if (page == "1") {
        this.changeTabShow(0, value);
      } else if (page == "2") {
        this.changeTabShow(1, value);
      } else {
        this.changeTabShow(2, value);
      }
    },
    async getCustomer_cityList() {
      const { data } = await getCustomer_cityList({
        cityId: "999",
      });
      console.log(data);
      this.options = data
      this.options.unshift({
        cityname:'全部',
        id:'999'
      })
    },
    selectChange(value){
      console.log('我是选择 , 我改变了',this.value);
    }
  },
  created() {
    this.getCustomer_cityList()
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
    right: 51px;
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
    font-size: 20px;
  }
}
</style>