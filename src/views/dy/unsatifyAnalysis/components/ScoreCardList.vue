<!-- 全景视图 -->
<template>
  <div class="card-list-wrap" v-loading="loading">
    <div
    class="card"
    v-for="(item,index) in cardList"
    :key="index">
      <LineCard
      :style="{height:index>3?'300px':'260px'}"
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
        if(res.data) {
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
        } else {
          this.$emit('changeShow',false);
        }

      })
      .catch(err=>{
        this.$emit('changeShow',false);
      })
      .finally(()=>{
        this.loading = false;
      })
    }
  },
  mounted() {
    this.getCustomerAll();
  }
};
</script>

<style lang="scss">
.card-list-wrap {
  width:100%; 
  height:auto; 
  display:flex; 
  column-gap:24px; 
  row-gap:24px; 
  flex-wrap:wrap;

  .card {
    width:20%; 
    flex-grow:2; 
    height:auto;
  }
}

</style>

