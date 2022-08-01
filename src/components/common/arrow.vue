<template>
	<span class="arrow">
    <span 
    v-if='Number(num)' 
    :style="{color:!isUpset? (num>0?'#339933':'#ff3333'):(num<0?'#339933':'#ff3333'), fontFamily: fontFamily}" 
    style="display:flex; align-items:center;">
      <!-- <i :class="num>0?'el-icon-caret-top':'el-icon-caret-bottom'" style="font-size:16px;margin-right:6px;"></i> -->
      <img :src="num>0?upImg:downImg" width="14" :style="{marginRight:marginRight}"/>
      <a :style="{width:textWidth}">{{Math.abs(num)}}{{unit}}</a>
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
          default:'syhtMedium'
        },
        unit:{
          type:String,
          default:'%'
        },
        marginRight: {
          type: String,
          default:'6px'
        },
        textWidth: {
          type: String,
          default:'auto'
        },
        isUpset:{
          type: Boolean,
          default: false
        }
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
    .arrow {
        font-size: 14px;
    }
</style>