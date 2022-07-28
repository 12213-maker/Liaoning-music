<template>
	<div class="service-part-01">
    <div style="width:100%; height:auto; background:#fff; display:flex;">
      <div style="width:38%; position:relative;">
        <h3 class="title-h3" style="position:absolute; left:20px;">客户满意度省份地图</h3>
        <Map
        style="height:100%; padding-bottom:20px;"
        :zoom='1.2'
        left="15%"
        :userInfo="userInfo"
        :getData="getData"
        :permissionSetting="permissionSetting"
        :showDistrict="false"
        :tooltipFormatter="tooltipFormatter"
        mapColor="#a9dcb4"
        :visualMapColors="['#D6EBD6','#85C285','#339933']"
        breadcrumbPosition="right"
        breadcrumbTop='50px'
        ref="map" />
        <MapRank :rankLists="rankLists" height="360px" :colors="['#339933','#D6EBD6']"/>
      </div>
      <div class="right-wrap">
        <h3 class="title-h3" style="margin-top:8px;">满意度</h3>
        <el-tabs v-model="activeName" @tab-click="handleTabClick" class='inner-tabs'>
          <el-tab-pane v-for="(tab,idx) in tabs" :key="tab.label" :label="tab.label" :name="tab.id">
            <LineBarChart
            v-if="activeName==tab.id"
            :ref="'chart'+tab.id+1"
            width="100%"
            height="320px"
            :xName="tab.overviewData.xName"
            :legendsBar="tab.overviewData.legendsBar"
            :legendsLine="tab.overviewData.legendsLine"
            :colors="chartColors"
            :barValue="tab.overviewData.barValue"
            :lineValue="tab.overviewData.lineValue"
            ></LineBarChart>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import Map from '@/components/common/map/Map';
  import MapRank from '@/components/common/map/MapRank';
  import LineBarChart from '@/components/common/charts/LineBarChart.vue';

  export default {
    name:"ServicePart01",
    components:{
      Map,
      MapRank,
      LineBarChart
    },
    props:{
    },
    data(){
      return {
        activeName:'1',
        userInfo:{cityid:999},
        selectTarget:'',

        tabs:[
          {
            label:'手机客户满意度',
            id:'1',
            overviewData:{
              xName:['1月','2月','3月'],
              legendsBar:['投诉量'],
              legendsLine:['环比'],
              barValue:[[parseInt(Math.random()*100).toString(),parseInt(Math.random()*100).toString(),parseInt(Math.random()*100).toString()]],
              lineValue:[[parseInt(Math.random()*10).toString(),parseInt(Math.random()*10).toString(),parseInt(Math.random()*10).toString()]]
            },
            trendData:{
              xName:['1月','2月','3月'],
              legendsBar:[],
              legendsLine:['环比'],
              barValue:[[parseInt(Math.random()*100).toString(),parseInt(Math.random()*100).toString(),parseInt(Math.random()*100).toString()]],
              lineValue:[[parseInt(Math.random()*10).toString(),parseInt(Math.random()*10).toString(),parseInt(Math.random()*10).toString()]]
            }
          },{
            label:'家庭客户满意度',
            id:'2',
            overviewData:{
              xName:['1月','2月','3月'],
              legendsBar:['投诉量'],
              legendsLine:['环比'],
              barValue:[[parseInt(Math.random()*100).toString(),parseInt(Math.random()*100).toString(),parseInt(Math.random()*100).toString()]],
              lineValue:[[parseInt(Math.random()*10).toString(),parseInt(Math.random()*10).toString(),parseInt(Math.random()*10).toString()]]
            },
            trendData:{
              xName:['1月','2月','3月'],
              legendsBar:[],
              legendsLine:['环比'],
              barValue:[[parseInt(Math.random()*100).toString(),parseInt(Math.random()*100).toString(),parseInt(Math.random()*100).toString()]],
              lineValue:[[parseInt(Math.random()*10).toString(),parseInt(Math.random()*10).toString(),parseInt(Math.random()*10).toString()]]
            }
          },{
            label:'政企客户满意度',
            id:'3',
            overviewData:{
              xName:['1月','2月','3月'],
              legendsBar:['投诉量'],
              legendsLine:['环比'],
              barValue:[[parseInt(Math.random()*100).toString(),parseInt(Math.random()*100).toString(),parseInt(Math.random()*100).toString()]],
              lineValue:[[parseInt(Math.random()*10).toString(),parseInt(Math.random()*10).toString(),parseInt(Math.random()*10).toString()]]
            },
            trendData:{
              xName:['1月','2月','3月'],
              legendsBar:[],
              legendsLine:['环比'],
              barValue:[[parseInt(Math.random()*100).toString(),parseInt(Math.random()*100).toString(),parseInt(Math.random()*100).toString()]],
              lineValue:[[parseInt(Math.random()*10).toString(),parseInt(Math.random()*10).toString(),parseInt(Math.random()*10).toString()]]
            }
          }
        ],
        chartColors:[["#5FAEFF,#0682FF", "#FFBE4D"],["#FFBE4D", "#4CD1C3"]],
        titles:['吉林省'],
        permissionSetting:false,

        
        rankLists:['沈阳','大连','鞍山','锦州','抚顺']
      }
    },
    watch: {
    },
    mounted(){

      this.$refs.map.generateChart('吉林省')
    },
    methods:{ 
      handleTabClick(val) {
      },


      getData() {

      },

      tooltipFormatter(params, fuhao, upImg, downImg) {
        if(params.componentSubType=="map" && params.data){
            var tipHtml = '';
            tipHtml = `<div style="height:200px;width:416px;border-radius:4px;background:rgba(255,255,255,0.7);box-shadow:0 4px 11px 1px rgba(99,99,99,0.19); padding:10px 14px 10px 14px;  box-sizing:border-box; display:flex; flex-direction:column; justify-content: space-around;font-family: SourceHanSansSC-Regular;">

                  <div style='margin:0px; font-size:16px; display:flex; align-items:center;'>
                      <img style='margin-right:12px;' src="${fuhao}" />${params.name}
                  </div>
                  <div style='display:flex; align-items:center; justify-content:space-between; font-size:14px;'>

                      <div style=' display:flex; align-items:center;'>
                          <p style='position:relative'>
                              <i style='display:inline-block; width:2px; height: 12px; background:#FF9900; position:absolute; top:9px;'></i>
                              <span style='margin-left:16px'>手机客户满意度：</span>
                              <span style='font-size:24px;'>
                              ${params.data.target_value?params.data.target_value:'-'}
                              </span>
                          </p>
                      </div>
                      
                      <div style=" display:flex;align-items:center;width:120px;">
                          <span style="display:flex; align-items:center;">
                              环比：
                              <img width='${Number(params.data.link_ratio)?'14px':''}' 
                              src='${Number(params.data.link_ratio)?(Number(params.data.link_ratio)>0 ? upImg:downImg):''}' 
                              style='margin-right:6px;'/>
                              <span style="color:${Number(params.data.link_ratio)>0?'green':'red'}">
                                ${Number(params.data.link_ratio)?Number(params.data.link_ratio):'-'}
                              </span>
                          </span>
                      </div>
                  </div>

                  <div style='display:flex; align-items:center; justify-content:space-between; font-size:14px;'>

                      <div style=' display:flex; align-items:center;'>
                          <p style='position:relative'>
                              <i style='display:inline-block; width:2px; height: 12px; background:#FF9900; position:absolute; top:9px;'></i>
                              <span style='margin-left:16px'>家庭客户满意度：</span>
                              <span style='font-size:24px;'>
                              ${params.data.target_value?params.data.target_value:'-'}
                              </span>
                          </p>
                      </div>
                      
                      <div style=" display:flex;align-items:center;width:120px;">
                          <span style="display:flex; align-items:center;">
                              环比：
                              <img width='${Number(params.data.link_ratio)?'14px':''}' 
                              src='${Number(params.data.link_ratio)?(Number(params.data.link_ratio)>0 ? upImg:downImg):''}' 
                              style='margin-right:6px;'/>
                              <span style="color:${Number(params.data.link_ratio)>0?'green':'red'}">
                                ${Number(params.data.link_ratio)?Number(params.data.link_ratio):'-'}
                              </span>
                          </span>
                      </div>
                  </div>

                  <div style='display:flex; align-items:center; justify-content:space-between; font-size:14px;'>

                      <div style=' display:flex; align-items:center;'>
                        <p style='position:relative'>
                            <i style='display:inline-block; width:2px; height: 12px; background:#FF9900; position:absolute; top:9px;'></i>
                            <span style='margin-left:16px'>政企客户满意度：</span>
                            <span style='font-size:24px;'>
                            ${params.data.target_value?params.data.target_value:'-'}
                            </span>
                        </p>
                      </div>
                      
                      <div style=" display:flex;align-items:center;width:120px;">
                          <span style="display:flex; align-items:center;">
                              环比：
                              <img width='${Number(params.data.link_ratio)?'14px':''}' 
                              src='${Number(params.data.link_ratio)?(Number(params.data.link_ratio)>0 ? upImg:downImg):''}' 
                              style='margin-right:6px;'/>
                              <span style="color:${Number(params.data.link_ratio)>0?'green':'red'}">
                                ${Number(params.data.link_ratio)?Number(params.data.link_ratio):'-'}
                              </span>
                          </span>
                      </div>
                  </div>

              </div>
            `;

          return tipHtml;
        }
      }
    }

  };
</script>

<style lang="scss" scoped>
.service-part-01 {
  width:100%;
  height:auto;
  margin-top:20px;
  display:flex;
  flex-direction:column;

  .right-wrap {
    width:62%; 
    box-sizing:border-box;
    padding:20px; 
    padding-top:6px;
    padding-left:30px;
    position:relative;

    &::before {
      content:'';
      display:block;
      height: 94%;
      width: 1px;
      background: #f5f5f5;
      position:absolute;
      left: 0px;
      top:3%
    }
  }
}
</style>

