<!-- 全景视图 -->
<template>
  <div style="position:relative">
    <div class="custag-wrap">
      <a class="tag" v-for="(item,idx) in tags">
        <span class="tag-label">{{item.key}}：</span>
        <span class="tag-content">{{item.value}}</span>
      </a>
    </div>

    <el-popover
    v-if="ellipsis"
    style="position:absolute; right:10px; bottom:20px;color:#262626" 
    placement="left"
    title=""
    width="560"
    trigger="hover">
      <div class="custag-wrap" style="height:auto; max-height:500px;overflow:auto">
        <a class="tag" v-for="(item,idx) in tags">
          <span class="tag-label">{{item.key}}：</span>
          <span class="tag-content">{{item.value}}</span>
        </a>
      </div>
      <a slot="reference">...</a>
    </el-popover>
  </div>
</template>

<script>

export default {
  name: 'CusTag',
  props:['tags'],
  data(){
    return {
      ellipsis:false
    }
  },

  watch:{
    tags() {
      const custag = document.querySelector(".custag-wrap");
      if(custag.clientHeight<custag.scrollHeight-6) {
        // console.log('有超出部分',custag.clientHeight, custag.scrollHeight);
        this.ellipsis = true;
      }
    }
  },

  mounted() {
    const custag = document.querySelector(".custag-wrap");
    if(custag.clientHeight<custag.scrollHeight-6) {
      // console.log('有超出部分',custag.clientHeight, custag.scrollHeight);
      this.ellipsis = true;
    }

  }
};
</script>

<style lang="scss">
.custag-wrap {
    width:100%;
    height: 134px;
    overflow:hidden;
    padding: 20px 0px;
    box-sizing:border-box;
    display:flex;
    flex-wrap:wrap;
    align-items:flex-start;
    justify-content: start;
    font-family:syht;

    .tag {
      border: 1px solid #e6e6e6;
      padding: 0 16px;
      font-size: 14px;
      font-family: syht;
      text-align: left;
      line-height: 24px;
      margin-right: 16px;
      border-radius: 4px;
      position:relative;
      margin-bottom:14px;

      .tag-label {
        color: #666;
      }

      .tag-content {
        color: #262626;
      }
    }
  }
</style>

