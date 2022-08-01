<!-- 全景视图 -->
<template>
  <!-- /unsatisfyAnalysis/customerAnalysis -->
  <div class="dy-page-wrap customer-analysis" style=" display:flex; flex-direction:column;">
    <div class="dy-container">
      <div class="content">
        <div class="top-wrap" v-loading="topLoading">
          <AnalysisLeft :info="info" style="width:52%;height:100%"/>
          <div class="line"></div>
          <AnalysisRight :datas="trend" style="width:48%;height:100%"/>
        </div>
        <div class="bottom-wrap no-line-tab">
        <!-- <div class="bottom-wrap no-line-tab"> -->
          <div class="select-wrap"  v-show="activeName=='2'">
            <span class="label">选择地市：</span>
            <el-select 
            v-model="areaId" 
            :disabled="cityId!=999"
            placeholder="请选择地市" 
            size="small" 
            style="width:298px;">
              <el-option
                v-for="item in areaOptions"
                :key="item.id"
                :label="item.cityname"
                :value="item.id">
              </el-option>
            </el-select>
          </div>

          <div 
          class="select-wrap"  
          v-show="activeName=='1'">
            <span class="label">选择时间：</span>
            <div style="position:relative; width:298px;">

              <!-- <el-select 
              v-model="date" 
              placeholder="请选择时间" 
              size="small" 
              >
                <el-option
                  v-for="item in dateOptions"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select> -->

              <el-date-picker
                v-model="date"
                type="month"
                style="width:298px;"
                size="small"
                value-format="yyyy-MM"
                format="yyyy年MM月"
                :picker-options="pickerOptions"
                placeholder="选择月">
              </el-date-picker>
              <img src='@/assets/images/riqi.png' style="position:absolute; right:10px; top:8px;">
            </div>
          </div>

          <el-tabs v-model="activeName" @tab-click="handleClick" style="width:100%;" v-show="showAnalysis">
            <el-tab-pane name="1">
              <span slot="label" style="padding:0 24px;"> 客群分析</span>
              <div class="tag-content" style="padding-right:0px; padding-bottom: 0px;">
                <score-card-list 
                :date="date" 
                :id="groupId" 
                v-if="activeName=='1'"
                @changeShow="changeShow">
                </score-card-list>
              </div>
            </el-tab-pane>
            <el-tab-pane name="2">
              <span slot="label" style="padding:0 24px;"> 
                修复结果分析
              </span>
              <div class="tag-content" style="background:none; padding:0px;">
                <fixed-result 
                v-if="activeName=='2'"
                style="margin-bottom:24px" 
                ref="fixed-result"
                :groupId="groupId"
                :areaId="areaId">
                </fixed-result>

                <fixed-trend
                :areaId="areaId"
                :groupId="groupId"
                v-if="activeName=='2'">
                </fixed-trend>
              </div>
            </el-tab-pane>
          </el-tabs>

          <Blank 
          v-show="!showAnalysis"
          :text="blankText" 
          background="none"/>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import Blank from '@/components/common/Blank';
import AnalysisLeft from './components/AnalysisLeft';
import AnalysisRight from './components/AnalysisRight';
import ScoreCardList from './components/ScoreCardList';
import FixedResult from './components/FixedResult';
import FixedTrend from './components/FixedTrend';
import {getCustomerGroupInfo,getCityList,getCustomerGroupCurdate} from '@/api/dy/unsatifyAnalysis.js';
import {parseTime} from "@/utils/tools.js"

export default {
  name: "CustomerAnalysis",
  components:{
    Blank,
    AnalysisLeft,
    AnalysisRight,
    ScoreCardList,
    FixedResult,
    FixedTrend
  },
  data() {
    return {
      groupId:'',
      activeName:'1',
      info:null,
      trend:[],
      date:'',
      dateOptions:[],
      topLoading:false,
      showAnalysis: true,
      areaId:'',
      areaOptions:[],
      cityId: sessionStorage.getItem('cityId'),
      pickerOptions:{
        disabledDate:(date)=>{
          const d = parseTime(date.getTime(),'{yyyy}-{mm}');
          return !this.dateOptions.includes(d)
        }
      },
      blankText:'数据正在加工中，请第二天再进行查看'
    };
  },
  created() {
    this.groupId = this.$route.params.id;
    this.getCustomerGroupInfo();
    this.getCityList();
    this.getCustomerGroupCurdate();
  },

  mounted() {
    
  },

  methods: {
   handleClick(val) {
    if(val=='2') {
      setTimeout(()=>{
        this.$refs['fixed-result'].showPie = true;  
      },2000)
      
    }
   },

   getCustomerGroupInfo() {
    this.topLoading = true;
    getCustomerGroupInfo({
      id:this.groupId
    })
    .then(res=>{
      if(res.data) {
        this.info = res.data.info[0];
        this.info.tags = res.data.label; 
        if(res.data.trend) {
          this.trend = res.data.trend.map(item=>{
            return {
              label: item.mon,
              value: item.group_score
            }
          });
          console.warn(12,this.trend)
        }
      }
    })
    .finally(()=>{
      this.topLoading = false;
    })
   },

   changeShow(flag,text) {
    this.showAnalysis = flag;
    this.blankText = text;
   },

   getCityList() {
    getCityList({
      cityId: this.cityId
    })
    .then(res=>{
      // console.log('citylist',res);
      if(this.cityId=='999') {
        this.areaOptions = [{
          citylevel: "1",
          cityname: "全部",
          id: "999",
          pid: "1"
        }].concat(res.data);
      } else {
        this.areaOptions = res.data;
      }
      this.areaId = this.areaOptions[0].id;
    })
   },

   getCustomerGroupCurdate() {
    getCustomerGroupCurdate({
      id: this.groupId
    }).then(res=>{
      // console.log('最新日期',res);
      if(res.curDate) {
        this.date = res.curDate;  
        this.dateOptions = res.dateList?res.dateList:[];
      } else {
        this.date = parseTime(new Date().getTime(),'{yyyy}-{mm}');
        this.dateOptions = [];
      }
      
    }).catch(err=>{
      this.date = parseTime(new Date().getTime(),'{yyyy}-{mm}');
      this.dateOptions = [];
    })
   }
  }
};
</script>

<style lang="scss">
.customer-analysis {
  .content {
    width: 100%; 
    height: auto;
    margin-top: 14px;
    padding-bottom:10px;
    box-sizing:border-box;
  }

  .top-wrap {
    width:100%;
    padding: 14px;
    box-sizing:border-box;
    background:#fff;
    height:312px;
    display:flex;
    position:relative;
    align-items:center;

    .line {
      width: 1px;
      height: 270px;
      background: #E6E6E6;
      left: 52%;
    }
  }

  .bottom-wrap {
    width:100%;
    margin-top:24px;
    position:relative;

    .tag-content {
      width:100%; 
      background:#fff; 
      padding:24px; 
      box-sizing:border-box;
    }
  } 

  .select-wrap {
    margin-top:2px;
    display:flex; 
    justify-content: flex-end; 
    align-items:center;
    position:absolute; 
    right:0px;
    z-index:999;
  }

}
</style>

