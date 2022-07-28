<template>
  <div class="errPage-container">
    <div class="left">
      <img :src="left" class="imglet">
    </div>
    <div class="right">
      <div class="center">
        <img class="img1" :src="right" />
        <div class="contain">
          <div class="first">登录超时，请重新登录大音平台！</div>
          <div class="second">
            若用户30分钟以上未操作系统，系统为保护用户将登出。
          </div>
        </div>
      </div>
      <img :src="headlogo" width="200px" class="left-footer-img" />
    </div>
  </div>
</template>

<script>
import headlogo from "@/assets/images/head-logo.png";
import left from "@/assets/401_images/left.jpg";
import right from "@/assets/401_images/right.jpg";

export default {
  name: "Page401",
  data() {
    return {
      headlogo,
      left,
      right,
    };
  },
};
</script>

<style lang="scss" scoped>
.errPage-container {
  height: 100vh;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  .left {
    height:100vh;
    width:790px;
    background-color: rgb(245, 245, 245);
    position: relative;
    z-index: 10;
    .imglet{
      height: 100%;
      width: 100%;
    }
  }
  .right {
    background-color: rgb(245, 245, 245);
    flex: 1;
    position: relative;
    .center {
      position: absolute;
        top: 20vh;
        left: 50%;
        transform: translate(-50%);
      .img1 {
      }
      .contain {
        padding-top: 10px;
        .first {
          text-align: center;
          font-size: 21px;
          color: rgb(38, 38, 38);
          padding-bottom: 10px;
        }
        .second {
          text-align: center;
          font-size: 15px;
          color: rgb(140, 140, 140);
        }
      }
    }

    .left-footer-img {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translate(-50%);
    }
  }
}
</style>
