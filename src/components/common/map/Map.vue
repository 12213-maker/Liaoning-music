<template>
  <div class="map-wrap">
    <div ref="map" class="map"></div>
    <div 
    style="display:flex;position:absolute;" 
    :style="{justifyContent:breadcrumbPosition=='right'?'flex-end':'flex-start',top:breadcrumbTop}">
      <el-breadcrumb separator="/" style="font-size:14px;">
        <el-breadcrumb-item v-for='(item,index) in titles'>
          <a @click="goBack(item,index)">{{item.cityName}}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="position:absolute; bottom:0px; display:flex; column-gap:50px;">
      <p class="item-wrap">
        <a class="square" :style="{background:colors[0]}"></a>
        <span>投诉较多</span>
      </p>

      <p class="item-wrap">
        <a class="square"  :style="{background:colors[2]}"></a>
        <span>投诉较少</span>
      </p>
    </div>
	  
  </div>
</template>

<script>
    import Vue from 'vue';
    import * as echarts from "echarts";

    import province from './json/province.json';
    import chaoyang from './json/chaoyang.json';
    import fuxin from './json/fuxin.json';
    import huludao from './json/huludao.json';
    import jinzhou from './json/jinzhou.json';
    import yingkou from './json/yingkou.json';
    import dalian from './json/dalian.json';
    import shenyang from './json/shenyang.json';
    import liaoyang from './json/liaoyang.json';
    import anshan from './json/anshan.json';
    import tieling from './json/tieling.json';
    import fushun from './json/fushun.json';
    import benxi from './json/benxi.json';
    import dandong from './json/dandong.json';
    import panjin from './json/panjin.json';



    import {mapData} from './mapData.js';
    import {areaData} from './areaData.js';


    export default {
        name:"Map",
        props:['getData','userInfo','permissionSetting','showDistrict','tooltipFormatter','breadcrumbPosition','breadcrumbTop',
        'zoom','left','mapColor','visualMapColors','colors', 'showValueIdx','dataType'],
        data(){
          return {
            titles:[],
            chart:null,
            thirdScore:0,
            lastThirdScore:0,
            // svg:beijingSvg,
            loading: false,

            upImg: require('@/assets/images/up-icon.png'),
            downImg: require('@/assets/images/down-icon.png'),

            mapJson:{
            	'999':province,
            	'421':chaoyang,
            	"429":huludao,
            	"418":fuxin,
            	"416":jinzhou,
              "427":panjin,
            	"417":yingkou,
            	"411":dalian,
            	"240":shenyang,
            	"419":liaoyang,
            	"412":anshan,
              "410":tieling,
              "413":fushun,
              "414":benxi,
              "415":dandong
            },

            areaData,
            mapData,
            clickAreas:['999','421',"429","418","416","427","417","411","240","419","412","410","413","414","415"],
            mapInfo:{
            	cityName:'',
            	cityId:''
            },

            fuhao: require("@/assets/images/fuhao.png"),
            upImg: require('@/assets/images/up-icon.png'),
            downImg: require('@/assets/images/down-icon.png'),
            lastThirdScore:0,
            thirdScore:0,
            datas:null,
            currentHighlightIdx:null
          }
        },
        watch: {
        },
        mounted(){
            this.mapInfo.cityName = !this.permissionSetting?'辽宁省中心':(this.userInfo.cityid=='999'?'辽宁省中心':this.userInfo.cityName);
            this.mapInfo.cityId = !this.permissionSetting?'999':this.userInfo.cityid;
            this.titles.push({
              cityName: this.mapInfo.cityName,
              cityId: this.mapInfo.cityId
            })
            // this.generateChart('辽宁省');
        },
        methods:{
          goBack(map,idx) {
            if(map.cityId!==this.mapInfo.cityId) {
              // this.$refs.map.loading = true;
              this.titles.splice(idx+1,this.titles.length);
              this.mapInfo = {
                cityName:map.cityName,
                cityId:map.cityId
              }

              // 获取数据
              this.getData(this.mapInfo.cityName,this.mapInfo.cityId);
            }
          },

          // 修改title
          changeTitles() {

            if(this.titles.length==2) {
              this.titles.splice(1,2,this.mapInfo);
            } else {
              this.titles.push(this.mapInfo);
            }

            /*// 后期不需要
            this.generateChart(this.mapInfo.cityName);*/
              
          },

        	generateChart(name,datas){

        		if(this.chart && this.clickAreas.includes(name)) {
        			this.chart.dispose();
        		}

        		if(this.clickAreas.includes(name)) {
        			this.chart = echarts.init(this.$refs.map, null, {render: "json"}); 
		        	window.addEventListener("resize", ()=>{
	                this.chart.resize();
	            });

	            this.initChart(name,datas);
        		}
        	},

        	initChart(name,datas){
        		var _this = this;
        		this.chart.on('click',(params)=>{
      				if(this.clickAreas.includes(params.data.cityId) && this.mapInfo.cityId !== params.data.cityId  || this.showDistrict ) {
      					this.mapInfo.cityName = params.name;
      					this.mapInfo.cityId = params.data.cityId || params.value[4];
                this.changeTitles();
                this.getData(this.mapInfo.cityName,this.mapInfo.cityId);
    					}
            })

            if(this.titles.length==0) {
                this.changeTitles();    
            }
            
          	setTimeout(()=>{
            	this.updateMapjson(name,datas);
            },200)
	        },

	        // 更新地图json数据
	        updateMapjson(name,datas) {
	        	echarts.registerMap('map', this.mapJson[name]);
  	    		this.updateOption(name,datas);
  		    	this.loading = false;
	        },

          // 处理地图排名数据
          dealDatas(datas) {

            if(datas && datas.length) {
              datas =  datas.sort( (a,b) => {
                if(this.mapInfo.cityId=='999') {
                  return b.value - a.value; 
                } else {
                  if(this.dataType=='1') {
                    b.value[2] - a.value[2];
                  } else {
                    b.value[3] - a.value[3];
                  }
                }
              });

              if(this.mapInfo.cityId=='999') {
                let noVal = true;
                datas.forEach((d,idx)=>{
                  if(d.value!='-') {
                    noVal = false;
                  }
                })
                if(noVal) {
                  datas.forEach((d,idx)=>{
                    d.itemStyle = {
                      areaColor: this.mapColor
                    }
                  })
                } else {
                  datas.forEach((d,idx)=>{
                    d.itemStyle = {
                      areaColor: this.colors[1]
                    }
                    if(idx<3) {
                      d.itemStyle.areaColor = this.colors[0]
                    } else if(idx>datas.length-4) {
                      d.itemStyle.areaColor = this.colors[2]
                    } else {
                      d.itemStyle.areaColor = this.colors[1]
                    }
                  })
                }
              }
            }
            return {datas};
          },

	        updateOption(name, oriDatas){
	        	let _this = this;

            // mapData为模拟数据
            oriDatas = oriDatas?oriDatas:this.mapData;
            const { datas } = {...this.dealDatas(oriDatas)};
            this.datas = datas;

	        	let option = {
    					geo: {
    						map: "map",
    						name:"map",
                top: 50,
                left: _this.left?_this.left:'center',
    						zoom: _this.zoom?_this.zoom:1.15,
                aspectScale:0.75,
    						roam: false,
    						silent: !this.clickAreas.includes(name),
		            selectedMode: 'single',
		            select:{
		                label:{
		                    show: false
		                }
		            },
    						itemStyle: {
    							normal: {
    								areaColor: _this.mapColor,
    								borderColor: '#fdfdfd',
    								borderWidth: 1
    							},
                  emphasis:{
                      areaColor: _this.mapInfo.cityId=='999'?'rgba(252, 216, 0, 1)':_this.mapColor,
                  }
    						},
    						zlevel:8,
    						label: {
    							show: _this.mapInfo.cityId=='999'?true:false,
    							textStyle: {
    								color: "#333",
    								fontSize:10
    							},
    							position: 'insideLeft',
    							emphasis:{
    								show: false
    							}
    						},

                regions:this.mapInfo.cityId=='999'?datas:[]		
    					},
    					series: [
    						{
    							type: "map",
    							nameProperty:"map",
    							geoIndex:0,
	       				 	selectedMode: 'single',
  	   						roam: true,
  	   						data: this.tooltipFormatter?datas:[]
    						}
    					]
          	}

            if(name!='999') {
              option = this.addScatter(option,datas);
            }

            if(datas.length && this.tooltipFormatter) {
              option = this.showToolTips(option, datas);
            }

	        	this.chart.setOption(option);
	        },

          // 市级使用地市显示
          addVisualMap(option,lastThirdScore,thirdScore) {
            let _this = this;
            option.visualMap = {
              type: 'piecewise',
              show: false,
              pieces: [
                {
                  max: lastThirdScore,
                  label: '后三',
                  color: _this.colors[2]
                },{
                  min: lastThirdScore,
                  max: thirdScore,
                  label: '其他',
                  color: _this.colors[1]
                },{
                  min: thirdScore,
                  label: '前三',
                  color: _this.colors[0]
                }
              ],
              visibility: 'on'
            };

            return option;
          },

          // 区县级使用散点
          addScatter(option,datas) {
            let _this = this;
            option.series.push({
              type: "scatter",
              coordinateSystem: 'geo',
              // geoIndex:0,
              symbolSize:60,
              zlevel:999,
              itemStyle:{
                color:(params)=>{
                  if(params.dataIndex<3) {
                    return _this.colors[0];
                  } else if(params.dataIndex>datas.length-4) {
                    return _this.colors[2];
                  } else {
                    return _this.colors[1];
                  }
                },
                opacity:1
              },

              emphasis:{
                itemStyle:{
                  color:'rgba(252, 216, 0, 1)'
                }
              },

              data:datas,
              label: {
                formatter: (params)=>{
                  return params.name+'\n'+(params.value[_this.showValueIdx]?params.value[_this.showValueIdx]:'-');
                  // return params.name;
                },
                show: true,
                position: 'inside' ,
                width:50,
                height:20,
                color:'#fff',
                fontSize:12,
                rotate:-15,
                lineHeight:18,
                fontFamily:'syhtNoraml',
                overflow:'truncate',
                ellipsis:'...',
                textShadowColor:'rgba(0,0,0,0.3)'
              }
            })

            return option;
          },

          // 展示信息
          showToolTips(option, datas) {
            let _this = this;
            option.tooltip = {
                show:true,
                padding: 0,
                enterable: true,
                transitionDuration: 1,
                textStyle: {
                    color: '#000',
                    decoration: 'none'
                },
                confine:true,
                borderColor:"rgba(0,0,0,0)",
                backgroundColor:'rgba(255,255,255,0.5)',
                formatter: (params) => _this.tooltipFormatter(params, _this.fuhao, _this.upImg, _this.downImg)
            }
            return option;
          },

          //选中高亮数据
          hightLightArea(flag,cityId) {
            if(this.mapInfo.cityId == '999') {
              return;
            }

            // 取消之前高亮区域
            if(this.currentHighlightIdx!=null) {
              this.chart.dispatchAction({
                type: 'downplay',
                seriesIndex: this.mapInfo.cityId == '999' ? 0 : 1,
                dataIndex:this.currentHighlightIdx
              })
            }

            if(!flag) {
              this.chart.dispatchAction({
                type: 'hideTip'
              })
              return;
            }
            
            let dataIndex = '';
            this.datas.forEach((item,idx)=>{
              if(item.cityId == cityId) {
                dataIndex = idx;
                return;
              }
            })
            this.currentHighlightIdx = dataIndex;

            this.chart.dispatchAction({
              type: 'highlight',
              seriesIndex: this.mapInfo.cityId == '999' ? 0 : 1,
              dataIndex:dataIndex
            })

            this.chart.dispatchAction({
              type: 'showTip',
              seriesIndex: this.mapInfo.cityId == '999' ? 0 : 1,
              dataIndex:dataIndex
            })
          }
        }
    };
</script>

<style lang="scss" scoped>
  .map-wrap {
    min-width:300px;
    flex-grow:2;
    display: flex; 
    flex-direction: column;
    box-sizing: border-box;
    font-family: SourceHanSansSC-Regular;
    box-sizing:border-box;
    position:relative;

    .item-wrap {
      height:30px; 
      display:flex; 
      align-items:center;
      font-size:12px;

      .square {
        display:inline-block;
        width:16px; 
        height:16px; 
        line-height:16px; 
        text-align:center; 
         
        color:#fff; 
        font-family:syhtLight; 
        margin-right:10px; 
        border-radius:2px;
      }
    }
  }
  .map {
  	width:100%; 
    height:100%;
    display:absolute;
    top:0px;
    left:0px;
  }

  
</style>

