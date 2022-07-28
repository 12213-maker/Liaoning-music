<template>
  <div class="dy-layout">
  	<Header />
    <el-scrollbar class="scrollbar" wrap-style="overflow-x:hidden;">
      <MainBanner v-if="showBannerPath.includes($route.name)"/>
      <router-view />
    </el-scrollbar>
  </div>
</template>

<script>
import Header from '@/components/common/header/main';
import MainBanner from '@/components/common/MainBanner';
import dyRouter from '@/router/dyRouter';
export default {
  name: "Dylayout",
  components: {
    Header,
    MainBanner
  },
  data() {
    return {
      showBannerPath:[]
    }
  },

  created() {
    dyRouter[1].children.forEach((r)=>{
      if(r.meta.showMainBanner) {
        this.showBannerPath.push(r.name);
      }
    })
  },

  methods:{
  }
};

</script>

<style lang="scss">
	.dy-layout {
		width:100%;
		height:100%;
		display:flex;
		flex-direction:column;

    .scrollbar {
      min-height:200px;
      flex-grow:2;
      background: #f5f5f5;
      overflow-x: hidden;
    }
	}
</style>
