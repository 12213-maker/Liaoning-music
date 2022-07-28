<!-- 全景视图 -->
<template>
  <div class="analysis-left">
    <div class="title-wrap" v-if="data">
      <span class="title-h3" style="margin:0px;">{{data.group_name}}</span>
      <span class="subtitle">创建时间: {{data.create_time.split(' ')[0].split('-').join('/')}}</span>
    </div>
    <cus-tag :tags="data.tags" v-if="data"></cus-tag>
    <score-with-ratio :data="data" v-if="data">
      <p slot="desc">
        本客群覆盖客户数{{data.user_num}}人，本月客群指数为{{data.group_score}}，环比提高{{data.mom_rate}}pp，近12个月平均客户满意指数为{{data.group_avg_score}}分
      </p>
    </score-with-ratio>
  </div>
</template>

<script>
// import Arrow from '@/components/common/arrow';
import CusTag from '@/components/common/CusTag';
import ScoreWithRatio from '@/components/common/ScoreWithRatio'


export default {
  name: "AnalysisLeft",
  components:{
    CusTag,
    // Arrow,
    ScoreWithRatio
  },
  props:['info'],
  data() {
    return {
      /*data:{
        coverNum:9999,
        index: 99.8,
        monthly:0.68,
        score:88.9,
        tags: [
          {
            label:'地区',
            content:'辽宁/沈阳/浑南区'
          },{
            label:'品牌',
            content:'全球通'
          },{
            label:'ARPU',
            content:'20-40，40-60'
          },{
            label:'性别',
            content:'男'
          },{
            label:'地区',
            content:'辽宁/沈阳/浑南区'
          },{
            label:'品牌',
            content:'全球通'
          },{
            label:'ARPU',
            content:'20-40，40-60'
          },{
            label:'性别',
            content:'男'
          },{
            label:'地区',
            content:'辽宁/沈阳/浑南区'
          },{
            label:'ARPU',
            content:'20-40，40-60'
          },{
            label:'性别',
            content:'男'
          },{
            label:'地区',
            content:'辽宁/沈阳/浑南区'
          }
        ],
      }*/
    };
  },

  computed: {
    data() {
      console.log('info',this.info);
      return this.info;
    }
  },
  created() {
  },

  methods: {
   
  }
};
</script>

<style lang="scss">
.analysis-left {
  width: 100%;
  padding-right:20px;
  box-sizing:border-box;

  .subtitle {
    font-size: 14px;
    font-weight: 400;
    text-align: justify;
    color: #8c8c8c;
    line-height: 25px;
  }

  .desc-txt {
    font-size: 14px;
    text-align: justify;
    color: #8c8c8c;
    line-height: 26px;
  }

  .title-wrap {
    width:100%; 
    display:flex; 
    justify-content:space-between; 
    align-items: flex-end;
    margin-top:10px;
  }
}
</style>

