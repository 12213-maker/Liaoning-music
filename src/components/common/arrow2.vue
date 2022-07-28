<template>
	<span>
      <!-- :style="{color:num>0?'#339933':'#ff3333', fontFamily: fontFamily}"  -->
      <span v-if='Number(num)' 
      :style="{fontFamily: fontFamily}"
      style="display:flex; align-items:center;font-size:12px; color:#595959;">
	  <!-- <i :class="num>0?'el-icon-caret-top':'el-icon-caret-bottom'" style="font-size:16px;margin-right:6px;"></i> -->
        <img :src="num>0?upImg:downImg" width="12" style="margin-right:2px;" :style="{marginTop:num<0?'2px':'0px'}" />
        {{Math.abs(num)}}%
      </span>
      <i v-else>-</i>
    </span>
</template>
<script>
  export default {
    name:"Arrow",
    props: {
      num: Number,
      fontFamily:{
        type:String,
        default:'syhtNoraml'
      },
      isUpset:false
    },
    data(){
      return {
        upImg: require('@/assets/images/up-icon.png'),
        downImg: require('@/assets/images/down-icon.png'),
      }
    },

    created() {
      if(this.isUpset){
        this.upImg = require('@/assets/images/up-icon-1.png')
        this.downImg = require('@/assets/images/down-icon-1.png')
      } else {
        this.upImg = require('@/assets/images/up-icon.png')
        this.downImg = require('@/assets/images/down-icon.png')
      }
    }
  };
</script>
<style lang='scss'>

</style>