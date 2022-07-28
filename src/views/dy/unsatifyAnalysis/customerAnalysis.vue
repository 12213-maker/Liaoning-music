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
        <div class="bottom-wrap no-line-tab" v-if="showAnalysis">
        <!-- <div class="bottom-wrap no-line-tab"> -->
          <el-tabs v-model="activeName" @tab-click="handleClick" style="width:100%;">
            <el-tab-pane name="1">
              <span slot="label" style="padding:0 24px;"> 客群分析</span>
              <div class="tag-content">
                <div style="width:100%; display:flex; justify-content: flex-end; align-items:center; margin-bottom:20px;">
                  <span class="label">选择时间：</span>
                  <div style="position:relative; width:298px;">
                    <el-date-picker
                      size="small"
                      v-model="date"
                      type="month"
                      placeholder="请选择"
                      format="yyyy年M月"
                      value-format="yyyy-MM"
                      range-separator="-"
                      style="width:298px;">
                    </el-date-picker>
                    <img src='@/assets/images/riqi.png' style="position:absolute; right:10px; top:8px;">
                  </div>
                </div>
                <score-card-list :date="date" :id="groupId" @changeShow="changeShow"></score-card-list>
              </div>
            </el-tab-pane>
            <el-tab-pane name="2">
              <span slot="label" style="padding:0 24px;"> 修复结果分析</span>
              <div class="tag-content" style="background:none; padding:0px;">
                <fixed-result 
                v-if="activeName=='2'"
                style="margin-bottom:24px" 
                ref="fixed-result"></fixed-result>
                <fixed-trend v-if="activeName=='2'"></fixed-trend>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <Blank 
        v-else
        text="数据正在加工中，请第二天再进行查看" 
        background="none"/>
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
import {getCustomerGroupInfo} from '@/api/dy/unsatifyAnalysis.js';

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
      date:'2022-05',
      topLoading:false,
      showAnalysis: true
    };
  },
  created() {
    this.groupId = this.$route.params.id;
    this.getCustomerGroupInfo();
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
        this.trend = res.data.trend.map(item=>{
          return {
            label: parseInt(item.mon.split('-')[1])+'月',
            value: item.group_score
          }
        });
      }
    })
    .finally(()=>{
      this.topLoading = false;
    })
   },

   changeShow(flag) {
    this.showAnalysis = flag;
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

    .tag-content {
      width:100%; 
      background:#fff; 
      padding:24px; 
      box-sizing:border-box;
    }
  }

}
</style>

