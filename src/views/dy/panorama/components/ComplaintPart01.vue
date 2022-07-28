<template>
	<div class="complaint-part-01">
    <div class="top-wrap" v-loading="topLoading">
      <div class="left-wrap">
        <div class="map-title-wrap">
          <h3 class="title-h3" style="padding:0 20px; margin-bottom:0px;">客户投诉省份地图</h3> 
        </div>
        <div class="map-title-wrap" style="width:100%; display:flex; align-items:center; justify-content:center;">
          <el-tabs v-model="dataType" size="mini"  class="title-tabs" @tab-click="onDataTypeChange">
            <el-tab-pane v-for="(item,idx) in mapDataTypes" :label="item" :name="(idx+1).toString()"></el-tab-pane>
          </el-tabs>
        </div>
      
        <div class="map-outer-wrap" v-loading="mapLoading">
          <Map
          :showValueIdx="dataType=='1'?2:3"
          :zoom='1.1'
          :userInfo="userInfo"
          :getData="onMapChange"
          :permissionSetting="permissionSetting"
          :showDistrict="false"
          :tooltipFormatter="tooltipFormatter"
          :dataType="dataType"
          mapColor="#CCE4FD"
          breadcrumbPosition="left"
          breadcrumbTop='0px'
          :colors="['#E68711','#E5A04A','#F5D194']"
          ref="map" />
          <MapRank 
          :rankLists="rankLists"
          :cityId="currentCityId"
          @hightLightArea="hightLightArea" 
          height="620px" 
          :colors="['#E68711','#E5A04A','#F5D194']"/>
        </div>
      </div>
      <div class="right-wrap">
        <h3 class="title-h3" style="padding-left:4px;">指标看板|{{indexGroupName}}</h3> 
        <SwiperCard 
        ref="swiperCard" 
        :carouselLists="carouselLists" 
        :selectTargetId="selectTargetId"
        @onActiveCardChange="onActiveCardChange"
        @swiperChange="swiperChange"/>
      </div>
    </div>
    
    <ChbnChart 
    v-if='showCHBN' 
    :innerTabs="innerTabs" 
    :pieData="pieData"  
    :targetName="selectTarget"
    ref='bottomWrap'  
    v-loading="bottomLoading" />
    <NoneChbnChart 
    v-else  
    :innerTabs="innerTabs"
    :targetName="selectTarget" 
    ref='bottomWrap' 
    v-loading="bottomLoading"/>
  </div>
</template>

<script>
  import Map from '@/components/common/map/Map';
  import MapRank from '@/components/common/map/MapRank';
  import LineBarChart from '@/components/common/charts/LineBarChart.vue';
  import PieChart from '@/components/common/charts/PieChart.vue';
  import SwiperCard from './SwiperCard';
  import ChbnChart from './ChbnChart';
  import NoneChbnChart from './NoneChbnChart';
  import {getMapData,getComplaintRank,getDetailData,getIndexList,getIndexMapDatas} from '@/api/dy/panorama.js'
  import {tabs,tabs2,innerTabs,pieData,carouselLists} from './mock.js'

  export default {
    name:"ComplaintPart01",
    components:{
      Map,
      MapRank,
      LineBarChart,
      PieChart,
      SwiperCard,
      NoneChbnChart,
      ChbnChart
    },
    props:['date','currentAreaId'],
    data(){
      return {
        
        activeName:'1',
        userInfo:{cityid:''},

        tabs,
        permissionSetting:true,

        innerTabs,
        
        tabs2,
        activeName3:'1',

        rankLists:[],
        dataType:'1',
        mapDataTypes:['投诉总量','万投比'],
        pieData,

        showCHBN: false,

        carouselLists,

        selectTarget:'',
        selectTargetId:'',
        indexGroupName:'',
        currentCityId: '',
        currentCityName:'',
        mapDatas:null,

        topLoading:false,
        bottomLoading:false,
        mapLoading:false
      }
    },

    watch: {
    },

    created() {
      this.currentCityId = sessionStorage.getItem('cityId');
      this.currentCityName = String(sessionStorage.getItem('areaName'))!=='null'? sessionStorage.getItem('areaName'):'辽宁省中心';
      this.userInfo.cityid = this.currentCityId;
      this.userInfo.cityName = this.currentCityName;
      this.topLoading = true;
    },

    methods:{ 

      onDataTypeChange() {
        this.mapLoading = true;
        this.getIndexMapDatas();
        this.getRankData();
      },

      // 没有数据，清空页面展示
      clearDatas() {
        this.rankLists = [];
        this.mapDatas = [];
        this.$refs.map.generateChart(this.currentCityId,[]);
        this.innerTabs.forEach(item=>{
          item.overviewData.xName = [];
          item.overviewData.barValue = [[]];
          item.overviewData.lineValue = [[]];
        })
        this.initPieData();
      },

      initPieData() {
        this.pieData = [{
          score: 0,
          target_name: '标题',
          partrate: '-'
        }]
      },

      onActiveCardChange(item) {
        if(item) {
          this.topLoading= true;
          this.selectTarget = item.target_name;
          this.selectTargetId = item.target_id;
          this.showCHBN = Boolean(Number(item.showchbn));

          setTimeout(()=>{
            this.getIndexMapDatas();
            this.getRankData();
            this.getDetailData();
          },100)
          
        } else {
          this.clearDatas();
        }
      },

      tooltipFormatter(params, fuhao, upImg, downImg) {
        // console.log(params);
        let mapDataType=this.mapDataTypes[this.dataType-1]
        let _this = this;
        if(params.data){
          var tipHtml = '';

          if(this.currentCityId=='999') {
            var value = params.value;
          } else {
            var value = params.value[Number(_this.dataType)+1];
          }

          if((this.currentCityId=='999' && params.componentSubType=="map") || (this.currentCityId!='999' && params.componentSubType=="scatter")) {
            
            tipHtml = `<div style="height:auto;width:260px;border-radius:4px;background:rgba(255,255,255,0.7);box-shadow:0 4px 11px 1px rgba(99,99,99,0.19); padding:20px 14px 10px 20px; display:flex; flex-direction:column; justify-content: space-around;font-family: syht;">
                  <div style='margin:0px; font-size:16px; display:flex; align-items:center;'>
                      <img style='margin-right:12px;' src="${fuhao}" />${params.name}
                  </div>
                  <div style='display:flex; align-items:center; justify-content:space-between; font-size:14px;'>

                      <div style=' display:flex; align-items:center;'>
                          <p style='position:relative'>
                              <i style='display:inline-block; width:2px; height: 12px; background:#FF9900; position:absolute; top:9px;'></i>
                              <span style='margin-left:16px'>${mapDataType}：</span>
                              <span style='font-size:24px;'>${value?value:'-'}</span>
                          </p>
                      </div>
                  </div>

                  <div style='display:flex; align-items:center; justify-content:space-between; font-size:14px;'>

                      <div style=' display:flex; align-items:center;'>
                          <p style='position:relative'>
                              <i style='display:inline-block; width:2px; height: 12px; background:#FF9900; position:absolute; top:9px;'></i>
                              <span style='margin-left:16px'>排名：</span>
                              <span style='font-size:24px;'>${params.data.rank?params.data.rank:'-'}</span>
                          </p>
                      </div>
                  </div>
              </div>
            `;
          }
            /*
            <div style=" display:flex;align-items:center;width:120px;">
                <span style="display:flex; align-items:center;">
                    环比：
                    <img width='${Number(params.value[3])?'14px':''}' 
                    src='${Number(params.value[3])?(Number(params.value[3])>0 ? upImg:downImg):''}' 
                    style='margin-right:6px;'/>
                    <span style="color:${Number(params.value[3])>0?'green':'red'}">
                      ${Number(params.value[3])?Number(params.value[3]):'-'}
                    </span>
                </span>
            </div>*/

            return tipHtml;
        }
      },

      swiperChange(idx) {
        this.indexGroupName = this.carouselLists[idx].name;
      },


      getData() {
        this.getIndexList();
      },

      onMapChange(cityName,cityId) {
        this.currentCityName = cityName;
        this.currentCityId = cityId;
        this.getIndexList();
      },

      // 获取指标排名
      getRankData() {
        getComplaintRank({
          "targetId": this.selectTargetId,
          "statDate": this.date.date,
          "statType": this.date.type,
          "cityId": this.currentAreaId.length==5?this.currentAreaId:this.currentCityId,
          "dataType":this.dataType
        }).then(res=>{
          console.log('概览排名',res)
          this.rankLists = res.data;
        })
      },

      // 获取地图区域数据
      getMapData(cityId) {
        console.log(cityId)
        getMapData({
          "pid": cityId
        }).then(res=>{
          console.log('res map',res)
        })
      },

      // 根据所选指标ID，获取地图展示数据
      getIndexMapDatas(){
        getIndexMapDatas({
          "pCityId": this.currentAreaId.length==5?this.currentAreaId:this.currentCityId,
          "statType": this.date.type,
          "opTime": this.date.date,
          "targetId": this.selectTargetId,
          "dataType":this.dataType
        }).then(res=>{
          if(res.data) {
            const data = res.data.map(item=>{
              // console.log(item);
              let {city_name, city_id, city_lat, city_lon, score, investbasis, rank} = {...item};
              
              if(city_name && city_id) {
                let value = 0;
                if(this.currentCityId=='999') {
                  value = this.dataType=='1' ? 
                  (score||score==0?score:'-') : 
                  (investbasis||investbasis==0?investbasis:'-');
                } else {
                  value = [Number(city_lat), Number(city_lon), score, investbasis, city_id];
                }
                return {
                  name: city_name,
                  value,
                  investbasis:investbasis?investbasis:'-',
                  cityId:city_id,
                  rank
                }
              }
            })

            this.mapDatas = data;
            this.$refs.map.generateChart(this.currentCityId,data);
          }
        }).finally(()=>{
          this.topLoading = false;
          this.mapLoading = false;
        })
      },

      // 获取万投比、投诉量、CHBN等数据
      getDetailData() {
        this.bottomLoading = true;
        getDetailData({
          "opTime": this.date.date,
          "statType": this.date.type,
          // 这个ID应该是目前第一个
          "targetId": this.selectTargetId,
          "cityId": this.currentAreaId.length == 5 ? this.currentAreaId : this.currentCityId
        }).then(res=>{

          this.innerTabs.forEach(item=>{
            item.overviewData.xName = [];
            item.overviewData.barValue = [];
            item.overviewData.lineValue = [[],[]];
          })

          this.initPieData();

          const [complaintValue,complintPercentage,investmentValue,investmentPercentage,peiData] = [...res.data.chartOne];
          const [complaintTab,investmentTab] = [...this.innerTabs];

          // 投诉量柱状图数据
          if(complaintValue) {
            complaintValue.data.forEach((item,idx)=>{
              complaintTab.overviewData.xName.push(item.statdate);
              if(item.score=='-'||item.score=='') item.score = 0;
              complaintTab.overviewData.lineValue[0].push(item.score);
            })
            complaintTab.overviewData.lineValue[1] = complintPercentage.data.map((item) => item.momrate);
          }

          // 万投比柱状图数据
          if(investmentValue) {
            investmentValue.data.forEach((item,idx)=>{
              investmentTab.overviewData.xName.push(item.statdate);
              if(item.investbasis=='-'||item.investbasis=='') item.investbasis = 0;
              investmentTab.overviewData.lineValue[0].push(item.investbasis);
            })
            investmentTab.overviewData.lineValue[1] = investmentPercentage.data.map((item) => item.yearbasis);
          }

          // CHBN饼图数据
          if(this.showCHBN) {
            if(peiData) {
               peiData.data.forEach((item,idx)=>{
                const { num, target_name, percent } = {...item};
                this.pieData.push({
                  score: num,
                  target_name,
                  partrate: percent
                })
              })
            }
          }

          setTimeout(()=>{
            this.$refs.bottomWrap.$refs.chart1[0].drawChart();
            if(this.$refs.bottomWrap.$refs.chart2) this.$refs.bottomWrap.$refs.chart2[0].drawChart();
            if(this.showCHBN) this.$refs.bottomWrap.$refs.pieChart.drawChart();
          },100)
          
        }).finally(()=>{
          this.bottomLoading = false;
        })
      },

      // 获取指标列表数据
      getIndexList() {
        this.topLoading = true;
        getIndexList({
          "cityId": this.currentAreaId.length==5?this.currentAreaId:this.currentCityId,
          "statType": this.date.type,
          "statDate": this.date.date,
        }).then(res=>{
          if(!res.data || res.data.length == 0 ||  res.data[0].data.length==0){
            this.topLoading = false;
            this.carouselLists = res.data
            this.clearDatas();
            return;
          }
          res.data.forEach((item,idx)=>{
            // console.log(123,item.data)
           /* if(item.data.length>5){
              item.data.splice(5,0,{});  
            }*/

            item.data.splice(1,0,{},{});
            item.data.splice(9,0,{});
            item.data.splice(14,0,{});
            // item.data.splice(10,0,{},{});
            
            /*if(item.data.length!==0 && item.data.length % 3 !== 0) {
              let dis = 0;
              if(item.data.length<3) {
                dis = 3-item.data.length;
              } else {
                dis  = 3-item.data.length % 3;
              }

              for(var i=0; i<dis; i++) {
                item.data.push({})
              }
            }*/
          })
          
          if(res.data && res.data.length) this.carouselLists = res.data;

          this.indexGroupName = this.carouselLists[0].name
        }).catch(()=>{
          this.$refs.map.generateChart(this.currentCityId,[]);
          this.topLoading = false;
          this.mapLoading = false;
        })
      },

      hightLightArea(flag,cityId) {
        this.$refs.map.hightLightArea(flag,cityId);
      }

    }

  };
</script>

<style lang="scss" scoped>
.complaint-part-01 {
  width: 100%;
  height: auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  .top-wrap {
    width: 100%; 
    height: 780px; 
    background: #fff; 
    display: flex;

    .left-wrap {
      width: 48%; 
      display: flex; 
      flex-direction: column;
      padding-right: 20px;
      box-sizing: border-box;

      .map-title-wrap {
        width: 100%; 
        display: flex; 
        justify-content: space-between; 
        align-items: center;
      }

      .map-outer-wrap {
        width: 100%; 
        min-height: 100px; 
        flex-grow: 2; 
        display: flex; 
        padding-left: 20px; 
        box-sizing: border-box; 
        position: relative;
        padding-bottom:20px;
      }
    }

    .right-wrap {
      width: 52%; 
      height: 100%;
      box-sizing: border-box;
      padding: 0px 0px 0px 16px; 
      position: relative;
      display:flex;
      flex-direction:column;
      padding-bottom:16px;

      &::before {
        content: '';
        display: block;
        height: 94%;
        width: 1px;
        background: #f5f5f5;
        position: absolute;
        left: 0px;
        top: 3%;
      }
    }
  }

  
}
</style>

