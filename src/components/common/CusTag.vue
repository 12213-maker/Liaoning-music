<!-- 全景视图 -->
<template>
  <div style="position:relative">
    <div class="custag-wrap">
      <a class="tag" v-for="(item,idx) in tags">
        <span class="tag-label">{{item.label}}：</span>
        <span class="tag-content">{{item.content}}</span>
      </a>
    </div>

    <el-popover
    v-if="ellipsis"
    style="position:absolute; right:10px; bottom:20px;color:#262626" 
    placement="left"
    title=""
    width="500"
    trigger="hover">
      <div class="custag-wrap" style="height:auto;overflow:visible">
        <a class="tag" v-for="(item,idx) in tags">
          <span class="tag-label">{{item.label}}：</span>
          <span class="tag-content">{{item.content}}</span>
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
    row-gap:14px;
    font-family:syht;


    .tag {
      border: 1px solid #e6e6e6;
      height: 24px;
      padding: 0 40px 0 16px;
      font-size: 14px;
      font-family: syht;
      text-align: left;
      line-height: 20px;
      margin: 0 8px;
      border-radius: 4px;
      position:relative;

      .tag-label {
        color: #666;
      }

      .tag-content {
        color: #262626;
      }
    }
  }
</style>

