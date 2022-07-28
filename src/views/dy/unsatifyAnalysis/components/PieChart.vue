<template>
  <div class="echart-box" :style="{ height: height, width: width }">
    <div
      ref="pieChart"
      :style="{ width: '100%', minWidth: '500px', height: '100%' }"
    ></div>
    <!--<div
      class="legend-right"
      :style="{ width: 'calc(100% - 300px)', height: '100%' }"
    >
      <div class="table-all">
        <div class="table-line table-headers">
          <div class="table-cells"></div>
          <div class="table-cells">业务名称</div>
          <div class="table-cells">投诉量</div>
          <div class="table-cells">占比</div>
        </div>
        <div class="table-line" v-for="(item, index) in tableData">
          <div class="table-cells">
            <span :style="{ background: colorMap[index] }"></span>
          </div>
          <div class="table-cells">{{ item.target_name }}:</div>
          <div class="table-cells">{{ item.score }}</div>
          <div class="table-cells">{{ item.partrate + "%" }}</div>
        </div>
      </div>
    </div>-->
  </div>
</template>
<script>
export default {
  props: {
    width: String,
    height: String,
    tableData: Array,
    labelName: String,
    lengendTitles: Array
  },
  data() {
    return {
      colorMap: [
        "#FFFFFF",
        "#F98781",
        "#FFC06F",
        "#84C285",
        "#3499FF",
        "#42ABFF",
        "#FDAC15",
        "#FF4248",
        "#ED73EA",
        "#A25FF5",
        "#F98782",
        "#FFC063",
        "#84C284",
        "#3499F5",
        "#42ABF6",
        "#FDAC17",
        "#FF4249",
        "#ED73E1",
        "#A25FF2",
        "#F98731",
        "#FFC04F",
        "#84C255",
        "#34996F",
        "#42AB7F",
        "#FDAC85",
        "#FF4298",
        "#ED73AA",
        "#A25FB5",
      ],
    };
  },
  mounted() {
    this.drawChart();
    console.log(this.datas);
  },
  watch: {
    /*tableData() {
      this.drawChart();
    },*/
  },
  methods: {
    drawChart() {
      let that = this;
      const myChart = this.$echarts.init(this.$refs.pieChart);
      let totalCount = 0;
      this.tableData.forEach((e,idx) => {
        totalCount += Number(e.score);
        if (idx!=0) {
          console.log(e.partrate)
          e.partrate = e.partrate<1?(Number(e.partrate) * 100).toFixed(2):e.partrate;
        }
      });
      let option = {
        tooltip: {
          show: false,
        },
        legend: {
          show: this.tableData.length > 0,
          // type: "scroll",
          orient: "vertical",
          top: "center",
          right: 20,
          icon: "circle",
          itemGap: 18,
          itemWidth: 12,
          itemHeight: 12,
          pageButtonItemGap: 5,
          textStyle: {
            fontSize: 14,
            color: "#D9D9D9",
            rich: {
              name: {
                color: "#262626",
                width: 100,
                fontFamily:'syht'
              },
              val: {
                color: "#262626",
                width: 60,
                fontFamily:'syht'
              },
              numNum: {
                color: "#8c8c8c",
                width: 60
              },
              titleName: {
                color: "#999999",
                width: 100,
                padding:[0,0,0,0]
              },
              titleValue: {
                color: "#999999",
                width: 40,
                padding:[0,0,0,0]
              },

              titlePie: {
                color: "#999999",
                width: 60,
                padding:[0,0,0,0]
              },

            },
          },
          // 控制legend的间距
          padding: [10, 0, 20, 20],
          // 这里设置箭头的路径
          pageButtonPosition: "end", 

          pageIconSize: 14, 

          formatter: function (name) {
            let showNum = "--";
            let percentage = "--";
            for (var i = 0; i < that.tableData.length; i++) {
              if (that.tableData[i].target_name == name) {
                showNum = that.tableData[i].score;
                percentage = that.tableData[i].partrate;
              }
            }

            if(name=='标题') {
              let str = '';
              that.lengendTitles.forEach((item,idx)=>{
                str += idx==0?`{titleName| ${item}} `:`{titleValue| ${item}}`
              })
              return str
            }

            return `{name| ${
              name.length > 10 ? name.slice(0, 5) + "..." : name
            }}     {val| ${percentage}%}`;
          },
        },
        series: [
          {
            name: "--",
            type: "pie",
            radius: ["45%", "60%"],
            center: ["25%", "52%"],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: "center",
              formatter: (params)=>{
                if(params.dataIndex==0){
                  return `{name|${that.labelName}}\n{val|${totalCount}}`
                } else {
                  return ''
                }
              },

              rich: {
                name: {
                  fontSize: 16,
                  fontFamily:'syhtMedium',
                  color: "#262626",
                  padding: [10, 0],
                },
                val: {
                  fontSize: 24,
                  color: "#262626",
                  fontFamily:'syhtMedium',
                  padding: [0, 30 - `${totalCount}`.length * 6],
                },
              },
            },
            emphasis: {
              label: {
                show: true,
                formatter:(params)=>{
                  console.log(params)
                  if(params.dataIndex==0) return; 
                  return `{name|${params.name}}\n{val|${params.value}}`;
                },
                backgroundColor:'#fff',

                rich: {
                  name: {
                    fontSize: 16,
                    fontFamily:'syhtMedium',
                    color: "#262626",
                    padding: [10, 0],
                  },
                  val: {
                    fontSize: 24,
                    color: "#262626",
                    fontFamily:'syhtMedium',
                    padding: [0, 30 - `${totalCount}`.length * 6],
                  }
                },
              },
            },
            labelLine: {
              show: false,
            },
            data: this.tableData.map((el, index) => {
              return {
                value: el.score,
                name: el.target_name,
                itemStyle: { color: this.colorMap[index] },
              };
            }),
            itemStyle:{
              borderWidth:2,
              borderColor:'#fff'
            }
          },
        ],
      };
      myChart.setOption(option);
      setTimeout(function () {
        window.onresize = function () {
          myChart.resize();
        };
      }, 200);
    },
  },
};
</script>
<style lang="scss" scoped>
.echart-box {
  width: 100%;
  display: flex;
  position:relative
}
.legend-right {
  position: relative;
}
.table-all {
  display: flex;
  flex-direction: column;
  position: relative;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  max-height: 295px;
  overflow: auto;
  max-width: 80%;
  .table-line {
    display: flex;
    align-items: center;
    margin-bottom: 7px;
    .table-cells {
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 14px;
      font-family: syht;
      font-weight: 400;
      color: #262626;
      margin-right: 10px;
      &:nth-child(1) {
        width: 15px;
      }
      &:nth-child(2) {
        min-width: 120px;
      }
      &:nth-child(3) {
        width: 50px;
      }
      &:nth-child(4) {
        width: 50px;
      }
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: #f98781;
        border-radius: 50%;
      }
    }
  }
  .table-headers {
    .table-cells {
      color: #8c8c8c !important;
    }
  }
}
</style>
