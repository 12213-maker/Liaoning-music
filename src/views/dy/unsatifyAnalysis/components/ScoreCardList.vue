<!-- 全景视图 -->
<template>
  <div class="card-list-wrap" v-loading="loading">
    <div
    class="card"
    v-for="(item,index) in cardList"
    :key="index">
      <LineCard
      :style="{height:'100%'}"
      :data="item" 
      :order="index"/>
    </div>
  </div>
</template>

<script>
import LineCard from "./LineCard";
import {cardListData} from "./mock.js";
import {getCustomerAll} from '@/api/dy/unsatifyAnalysis.js'

export default {
  name: "ScoreCardList",
  components:{LineCard},
  props:['date','id'],
  data(){
    return {
      cardList:[],
      loading:false
    }
  },
  watch:{
    date(val) {
      if(val) {
        this.getCustomerAll();
      }
    }
  },
  
  methods: {
    getCustomerAll() {
      this.loading = true;
      getCustomerAll({
        "date": this.date,
        "id": this.id
      })
      .then(res=>{
        if( res.hasDataNow > 0 ) {
          this.cardList = res.data.mainList.map(item=>{
            const {label_name,group_score,label_id,mom_rate,satisfied_label} = {...item};
            return {
              id: label_id,
              targetName: label_name,
              courseScore: group_score,
              courseOpp: mom_rate,
              trendLists: res.data.trendList.filter(trend => {
                return trend.label_id == label_id;
              }),
              indexList: res.data.subList.filter(subIdx => {
                return subIdx.parent_id == label_id;
              })
            }
          })
          this.$emit('changeShow',true);
        }

        if( res.hasDataNow == 0 ) {
          this.cardList = [];
          this.$emit('changeShow',false,'本月无数据！');
        }

        if( res.hasData == 0 ) {
          this.cardList = [];
          this.$emit('changeShow',false,'数据正在加工中，请第二天再进行查看！');
        }
      })
      .catch(err=>{
        this.cardList = [];
        this.$emit('changeShow',false,'请求失败，稍后再试！');
      })
      .finally(()=>{
        this.loading = false;
      })
    }
  },
  mounted() {
    this.loading = true;
    if(this.date) this.getCustomerAll();
  }
};
</script>

<style lang="scss">
.card-list-wrap {
  width:100%; 
  min-height:500px; 
  display:flex; 
  flex-wrap:wrap;

  .card {
    width:20%; 
    flex-grow:2; 
    height:auto;
    margin-right:24px;
    margin-bottom:24px;
  }
}

</style>

