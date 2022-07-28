<template>
  <div class="dy-page-wrap">
    <WhiteBanner
      title="大音平台权限申请"
      desc="发起大音平台各模块功能使用权限申请流程"
    />
    <div class="dy-container main">
      <NumberTitle text="大音平台权限申请" num="01" />
      <div class="contain">
        <div class="left">
          <div class="spancontain">
            <span
            class="index"
            :class="showFlag ? '' : 'active'"
            @click="changeshow(1)"
          >
            我的权限
          </span>
          </div>
          <span
            class="index"
            :class="showFlag ? 'active' : ''"
            @click="changeshow(2)"
          >
            申请记录查询
          </span>
        </div>

        <div class="right">
          <PermissionApplication v-if="!showFlag"></PermissionApplication>
          <RecordsQuery v-if="showFlag"></RecordsQuery>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NumberTitle from "@/components/common/numberTitle";
import PermissionApplication from "./components/PermissionApplication";
import RecordsQuery from "./components/RecordsQuery";
import WhiteBanner from "@/components/common/WhiteBanner";
export default {
  components: {
    NumberTitle,
    RecordsQuery,
    PermissionApplication,
    WhiteBanner,
  },
  data() {
    return {
      showFlag: 0,
    };
  },
  methods: {
    changeshow(flag) {
      if (flag === 1) {
        this.showFlag = 0;
      } else {
        this.showFlag = 1;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  position: relative;
  .title {
    position: absolute;
    top: 50px;
    left: 20px;
  }
  .contain {
    // height: 85vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 20px;
  }

  .left {
    padding:0 40px;
    width: 200px;
    min-width: 200px;
    margin-right: 20px;
    background-color: rgb(255, 255, 255);
    .spancontain{
      padding: 30px 0px;
    }
    .index {
      padding-bottom: 10px;
      width: 100%;
      height: 50px;
      line-height: 50px;
      cursor: pointer;
      color: rgb(56,56,56);
    }
    .active{
      border-bottom: 3px solid rgb(255, 153, 0);
      color: rgb(26,26,26);
    }
  }
  .right {
    background-color: rgb(255, 255, 255);
    flex-grow:2;
    height:auto;
  }
}

</style>