<!-- 全景视图 -->
<template>
  <div>
    <div class="score-width-ratio-wrap">
      <span style="font-size:24px;">{{data.group_score?data.group_score:'-'}}</span>
      <span style="font-size:14px;color:#8c8c8c; margin:0 20px 0 8px;">分</span> 
      <span style="font-size:14px;color:#595959; ">环比：</span>
      <Arrow :num="Number(data.mom_rate)" unit="pp" style="display:inline-block;"/>
    </div>

    <p class="desc-txt" v-if="showDesc">
      <slot name="desc"></slot>
    </p>
  </div>
</template>

<script>
import Arrow from '@/components/common/arrow';

export default {
  name: 'CusTag',
  props:{
    data: Object,
    showDesc: {
      default: true,
      type: Boolean
    }
  },
  components: {Arrow}
};
</script>

<style lang="scss">
.score-width-ratio-wrap {
    width:100%;
    align-items:flex-end;
    margin-top:10px;
    vertical-align:bottom;
    display: inline-block;
}
</style>

