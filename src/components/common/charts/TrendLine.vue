<template>
    <div style="width:100%;" :style="{height:height}" ref="chart"></div>
</template>
<script>
import Vue from 'vue';
import * as echarts from "echarts";
const fuhao = require("@/assets/images/fuhao.png");


export default {
  name:"TrendLine",
  props: {
    datas: Array,
    title: String,
    subtext: String,
    unit:String,
    height: String,
    showLegend: {
      type: Boolean,
      default:false
    },
    serieName: String
  },
  data(){
    return {
      chart: null
    }
  },
  watch: {
    datas(val) {
      console.error(val)
      if(!this.chart) {
        this.initChart();
      } else {
        this.updateOption();
      }
    } 
  },
  methods:{

    initChart(){
      this.chart = echarts.init(this.$refs.chart, null, {
        render: "svg"
      });
      window.addEventListener("resize", ()=>{
        this.chart.resize();
      });
      this.updateOption();
    },

    updateOption(){
        let xData = [];
        this.datas.forEach((item)=>{
          xData.push (`${parseInt(item.label.split('-')[1])}月`);
        });
        const _this = this;

        let option = {
          title:{
            text:this.title,
            subtext: this.subtext,
            textStyle:{
              fontSize: 14,
              color:'#262626',
              fontFamily:'syht',
              fontWeight:'normal'
            },
            subtextStyle: {
              color:'#8C8C8C',
              lineHeight: 20,
              fontFamily: 'syhtLight',
              fontSize: 12
            },
            top:0,
            left:-4
          },  

          tooltip: {
            show:true,
            padding: 0,
            trigger:'axis',
            textStyle: {
                color: '#000',
                decoration: 'none'
            },
            borderColor:"rgba(255,255,255,0)",
            backgroundColor:'rgba(255,255,255,0.9)',
            confine: true,
            renderMode:'html',
            axisPointer:{
              lineStyle:{
                color:'#dcdcdc',
                width:1,
                type:'dashed'
              }
            },
            /*formatter:(params)=>{
              return `
                <div style="border-radius:4px;box-shadow: 0px 4px 11px 1px rgba(99,99,99,0.19); font-size:14px; color:#262626; font-family:syht; padding: 16px 12px;">
                  ${params[0].seriesName}：
                  <span style="font-size:24px;">${params[0].data.value}</span>
                  <span style="font-family:syht; color:#8c8c8c; margin-left:4px;">${_this.unit}</span>
                </div>
              `
            },*/

            formatter: (params) => {
              var tipHtml = '';
              if(params[0].data.label && params[0].data.value) {
                var op_time = (params[0].data.label).split('-');
                tipHtml = 
                `<div style="max-height:56px;width:auto;border-radius:4px;background:rgba(255,255,255,0.8);box-shadow:0 4px 4px 1px rgba(99,99,99,0.19); padding:4px 12px;  box-sizing:border-box; display:flex; flex-direction:column; justify-content: space-around;font-family: SourceHanSansSC-Light; font-size:12px; color:#8c8c8c">
                    <div style='margin:0px; display:flex; align-items:center; height:24px;'>
                      <img style='margin-right:4px;' src="${fuhao}" />${params[0].seriesName}
                    </div>
                    <div style='height:24px; display:flex; align-items:center;'>
                      <a style='display:inline-block; width:2px; height: 10px; background:#FF9900;margin-left:2px'></a>
                      <span style='margin-left:16px'>${op_time[0]}年${op_time[1]}月&nbsp;&nbsp;&nbsp;</span>
                      <span>${params[0].data.value}分</span>
                    </div>
                  </div>`;
              }
              
              return tipHtml;
            }
          },

          legend:{
            show: this.showLegend,
            top:40,
            textStyle:{
              color:'#8c8c8c',
              fontFamily:'syhtLight'
            },
          },

          color: ['#FF9900', '#000000'],
          grid:{
            top: 70,
            bottom: 10,
            containLabel: true,
            left: 0,
            right: 0
          },
          xAxis: {
            show:true,
            type: 'category',
            boundaryGap: true,
            data: xData,
            axisLabel:{
              color:'#8C8C8C',
              fontSize:12,
              fontFamily:'syhtLight',
              lineHeight: 30
            },
            axisLine:{
              lineStyle: {
                color: '#DCDCDC'
              }
            },

            axisTick: {
              show:false
            },

          },

          yAxis: {
            show:true,
            type: 'value',
            axisLabel:{
              color:'#8C8C8C',
              fontSize:10,
              fontFamily:'syhtLight',
            },
            splitLine:{
              show:true,
              lineStyle: {
                type:'dotted',
                color: '#DCDCDC'
              }
            },
            axisLine:{
              show:false
            },
            axisTick: {
              show:false
            },
            splitNumber:5,
            boundaryGap:'5%'
          },

          series: [
            {
              data: this.datas,
              name: this.serieName,
              type: 'line',
              smooth: true,
              symbol: 'emptyCircle',
              symbolSize: 8,
              lineStyle:{
                width:3
              },
              showSymbol:this.datas.length==1?true:false,
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0,0,0,1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(255,153,0,0.5)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(255,153,0,0)',
                    }
                  ],
                  false
                ),
              },
              label:{
                show: false
              }
            }           
          ]
        };
        this.chart.setOption(option);
    }
  },

  mounted() {
    if(!this.chart) {
      this.initChart();
    } else {
      this.updateOption();
    }
  }
};
</script>
<style scoped lang="scss">
    


</style>

