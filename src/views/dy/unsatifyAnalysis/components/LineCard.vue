<template>
	<div class="line-card">
    <div class="title-wrap">
      <a class="title">{{data.targetName}}</a>
      <a class="score">
        <span class="text" v-if="data.courseScore">{{formatterNum(data.courseScore)}}</span>
        <span v-else></span>
        <Arrow :num="Number(data.courseOpp)" unit="pp" fontFamily="syht" style="font-size:14px; margin-top:4px;"/>
      </a>
    </div>
    <div ref="chart" class="chart"></div>
    <div class="score-wrap">
      <p v-for="(item,idx) in data.indexList" class="score-list">
        <a class="title">{{item.label_name}}</a>
        <a class="score">
          <span class="text">{{item.group_score?Number(item.group_score).toFixed(1)+'分':'-'}}</span>
          <Arrow :num="Number(item.mom_rate)" unit="pp" fontFamily="syht" style="font-size:14px;"/>
        </a>
      </p>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import * as echarts from "echarts";
  import Arrow from '@/components/common/arrow.vue';
  const fuhao = require("@/assets/images/fuhao.png");

  export default {
      name:"LineCard",
      props:{
      	data:Object,
        order:Number
      },
      components:{
        Arrow
      },
      data(){
          return {
            chart:null
          }
      },
      watch: {
         
      },
      computed:{


      },
      created(){
      },
      mounted(){
        this.initChart(this.data.trendLists);
      },
      methods:{
      	initChart(trendList){
          this.chart = echarts.init(this.$refs.chart, null, {
              render: "svg"
            });
          this.updateOption(trendList);
          window.addEventListener("resize", ()=>{
              this.chart.resize();
          });
		    },

  			updateOption(trendList){
            // console.log('updateOption',trendList)
  			  let maxVal= Number(trendList[0].value);
          let xData = [];
          let _this = this;
  			  trendList = trendList.map(item=>{
            item.value = Number(item.group_score);
            item.op_time = item.satisfied_date;
  			    maxVal = item.value>maxVal ? item.value : maxVal;
  			    return item;
  			  })

          xData = trendList.map(item=>{
            return item.satisfied_date;
          }) 

				  let option = {
			      color: ['#FF9900', '#000000'],
			      grid:{
              left:6,
              right:6,
			        top:6,
			        bottom:6
			      },
			      xAxis: {
			        show:false,
			        type: 'category',
			        boundaryGap:false,
              data:xData
			      },
			      yAxis: {
			        show:false,
			        type: 'value',
			        max: Number(maxVal)
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
              backgroundColor:'rgba(255,255,255,0)',
              confine: true,
              renderMode:'html',
              axisPointer:{
                lineStyle:{
                  color:'#dcdcdc',
                  width:1,
                  type:'dashed'
                }
              },
              formatter: function(params) {
                var tipHtml = '';
                var op_time = (params[0].data.op_time).split('-');
                tipHtml = 
                `<div style="max-height:56px;width:auto;border-radius:4px;background:rgba(255,255,255,0.8);box-shadow:0 4px 4px 1px rgba(99,99,99,0.19); padding:4px 12px;  box-sizing:border-box; display:flex; flex-direction:column; justify-content: space-around;font-family: SourceHanSansSC-Light; font-size:12px; color:#8c8c8c">
                    <div style='margin:0px; display:flex; align-items:center; height:24px;'>
                      <img style='margin-right:4px;' src="${fuhao}" />${_this.data.targetName}
                    </div>
                    <div style='height:24px; display:flex; align-items:center;'>
                      <a style='display:inline-block; width:2px; height: 10px; background:#FF9900;margin-left:2px'></a>
                      <span style='margin-left:16px'>${op_time[0]}年${op_time[1]}月&nbsp;&nbsp;&nbsp;</span>
                      <span>${params[0].data.value}分</span>
                    </div>
                  </div>`;
                return tipHtml;
              }
            },

			      series: [
			          {
			            data: trendList,
			            type: 'line',
			            smooth: true,
                  symbol: 'emptyCircle',
                  symbolSize:6,
                  showSymbol:trendList.length==1?true:false,
			            lineStyle:{
                    width:2
                  },
			            areaStyle: {
			              color: new echarts.graphic.LinearGradient(
			                0,
			                0,
			                0,
			                1,
			                [
			                  {
                          offset: 0,
                          color: 'rgba(255,153,0,0.4)',
                        },
                        {
                          offset: 1,
                          color: 'rgba(255,153,0,0)',
                        }
			                ],
			                false
			              ),
			            }
			          }           
			      ]
				  };
				  this.chart.setOption(option);
  			},

        formatterNum(str) {
          return Number(str).toFixed(1);
        }
      }
  };
</script>

<style lang="scss" scoped>
    .line-card {
        width: 100%; 
        height: auto; 
        display: flex; 
        flex-direction: column;
        background: rgba(245, 245, 245, 1);
        padding: 16px;
        padding-top:10px;
        box-sizing: border-box;

        .title-wrap {
            width: 100%;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            height: 40px;

            .title {
              width: auto;
              font-size: 14px;
              color: rgb(89, 89, 89);
              display: flex;
              align-items: center;
              font-family: 'syht';
              height: 40px;
              position:relative;
              padding-left:12px;
              box-sizing:border-box;

              &::before {
                  content:"";
                  display: inline-block;
                  width: 3px;
                  height: 14px;
                  background-color: #ff9900;
                  margin-right: 8px;
                  top:2px;
                  position:absolute;
                  top:14px;
                  left:0px;
              };
            }

            .score {
              width: auto;
              font-size: 14px;
              color: rgb(89, 89, 89);
              display: flex;;
              vertical-align:bottom;
              align-items: center;
              font-family: 'syht';
              height: 40px;
              justify-content: flex-end;

              .text {
                  font-size:20px;
                  margin-right:10px;
                  color: rgb(89, 89, 89);
              }
            }
        }

        .score-wrap {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            font-size:14px;
            color:#595959;

            .score-list {
                display:flex; 
                justify-content:space-between; 
                height: 34px;
                line-height:34px;
                margin:0px;
            }

            .score {
                display: flex;
                align-items: baseline;
                width: auto;

                .text {
                    margin-right:16px;
                    color: rgb(89, 89, 89);
                    display:inline-block;
                }
            }
        }

        .chart {
            height:72px;
            margin: 10px 0;
        }
    }

</style>

