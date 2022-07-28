<template>
  <div>
    <div  class="echart-box" :style="{ height: height, width: width}" ref="chart" v-show="xName.length"></div>
    <Blank v-show="!xName.length"/>
  </div>
  
</template>
<script>
import Blank from '@/components/common/Blank';
export default {
  components:{
    Blank
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
    clickCb:Function,
    showSymbol:{
      default:true,
      type:Boolean
    }
  },
  data() {
    return {
      names: "totals" + Math.floor(Math.random() * 100),
      chart:null
    };
  },
  mounted() {
    // this.drawChart();
  },
  watch: {

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
      if(this.chart) {
        this.chart.dispose();
      }
      this.chart = this.$echarts.init(this.$refs.chart);
      let option = {
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,1)",
          axisPointer:{
            lineStyle:{
              color:'#dcdcdc',
              width:1,
              type:'dashed'
            }
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
              content += `<div style="padding:5px 10px 10px 10px;">
                            <span style="width:140px;display:inline-block;color:#666; font-family:syht">
                                <i style="display: inline-block;width: 10px;height: 10px;background:${colorStr};margin-right: 5px;border-radius: 50%;}"></i>
                                 <span>${el.seriesName}</span> <span style="margin-left:30px;">${typeof el.data == 'object'? el.data.value : el.data}</span>
                            </span>
                          </div>`;
            });
            return '<div class="showBox"  style="box-shadow:0px 4px 11px 1px rgba(99,99,99,0.19)" >' + content + "</div>";
          },
        },
        grid: [
          {
            top: 50,
            left: 20,
            right: 20,
            bottom: 10,
            containLabel: true
          },
        ],
        legend: {
          data: this.legendsBar.concat(this.legendsLine),
          itemGap: 40, // 设置间距
        },

        xAxis: [
          {
            data: this.xName,
            type: "category",
            axisLine: { show: false },
            axisLabel: {
              color:'#999'
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
        console.log(el,'legendsBar')
        yAxis.push({
          type: "value",
          name: el || "--",
          nameGap:30,
          nameTextStyle:{
            color:'#8c8c8c'
          },
          axisLine: { show: false },
          axisTick: {
            //y轴刻度线
            show: false,
          },
          axisLabel: {
            formatter: "{value}",
            color:'#999'
          },
          splitLine: {
            //网格线
            show: indexs==0 ? true : false,
            lineStyle: {
              type: "dotted", //设置网格线类型 dotted：虚线 solid:实线
            },
          },
          scale: true,
        });
        series.push({
          name: el,
          type: "bar",
          barWidth: 16,
          yAxisIndex:indexs,
          color: this.colors[0][indexs].includes(",")
            ? this.linear(
                this.colors[0][indexs].split(",")[0],
                this.colors[0][indexs].split(",")[1]
              )
            : this.colors[0][indexs],
          data: this.barValue[indexs],
        });

        /*series.push({
          name: el,
          type: "bar",
          smooth: true,
          barWidth:16,
          color: this.colors[0][indexs].split(",")[0],
          data: this.barValue[indexs],
        });*/

      });

      this.legendsLine.forEach((item,idx)=>{
        yAxis.push({
          type: "value",
          name: item,
          nameGap:30,
          nameTextStyle:{
            color:'#8c8c8c'
          },
          axisLine: { show: false },
          axisTick: {
            //y轴刻度线
            show: false,
          },
          axisLabel: {
            formatter: `${item.indexOf('比')!=-1||item.indexOf('率')!=-1?'{value}%':'{value}'}`,
            color:'#999'
          },
          splitLine: {
            //网格线
            show: idx==0 && this.legendsBar.length==0 ? true : false,
            lineStyle: {
              type: "dotted", //设置网格线类型 dotted：虚线 solid:实线
            },
          },
        });

        series.push({
          name: item,
          type: "line",
          yAxisIndex: !this.legendsBar.length?idx:this.legendsBar.length+idx,
          smooth: true,
          showSymbol: this.showSymbol,
          color: this.colors[1][idx],
          data: this.lineValue[idx].map((e) =>{
            return e == "-" || (item.includes("比") && !e.toString().includes("-"))
              ? Number(e)
              : e
          }),
        });
      })
      
      /*if (this.legendsLine.length) {
        yAxis.push({
          type: "value",
          name: this.legendsLine[0] || "--" + "%",
          nameGap:30,
          axisLine: { show: false },
          axisTick: {
            //y轴刻度线
            show: false,
          },
          axisLabel: {
            formatter: "{value}%",
            color:'#999'
          },
          splitLine: {
            //网格线
            show: this.legendsBar.length ? false : true,
            lineStyle: {
              type: "dotted", //设置网格线类型 dotted：虚线 solid:实线
            },
          },
        });
      }*/
      /*this.legendsLine.forEach((el, indexs) => {
        
      });*/
      option.yAxis = yAxis;
      option.series = series;


      this.chart.clear();
      this.chart.setOption(option);
      if(this.clickCb) {
        this.chart.on('click',(params)=>{
          this.clickCb(params);
        })
      }
      
      window.onresize =  () => {
        this.chart.resize();
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.echart-box {
  width: 100%;
  // border: 2px solid pink;
}
</style>
