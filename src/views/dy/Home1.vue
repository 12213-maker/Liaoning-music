<template>
  <div class="dy-page-wrap" style=" display:flex;">
    <el-button type="primary" @click="linkToZd">主要按钮</el-button>
    <el-button type="primary" @click="linkToZd1">主要按钮1</el-button>

  </div>
</template>

<script>
  import Blank from '@/components/common/Blank';
  export default {
    name: "Home1",
    components:{
      Blank
    },
    data() {
      return {

      };
    },
    methods: {
      linkToZd:function () {
        this.$router.push('stationstore')
      },
      linkToZd1:function () {
        this.$router.push('stationStoreQuestion')
      }
    }
  };
</script>

<style scoped lang="scss">

</style>

