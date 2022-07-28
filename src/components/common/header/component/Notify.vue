<template>
  <div class="notify-warp">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="`通知 (${infoList.length})`" name="notify">
        <div class="notify-content">
          <ul class="notifys" v-for="(item, index) in infoList" :key="index">
            <li class="item">
              <div class="header-img">音</div>
              <div class="info">
                <div class="title info-item" @click="openUrl(item.order_type,item.order_id,item.task_id)">{{ item.order_name }}</div>
                <div class="text info-item">{{ item.order_detail }}</div>
                <div class="text info-item">{{ item.op_time }}</div>
              </div>
            </li>
          </ul>
        </div>
      </el-tab-pane>

      <!-- <el-tab-pane label="待办 (0)" name="needDeal">
        待办
        <div class="notify-content">
          <ul class="notifys" v-for="item in 4" :key="item">
                <li class="item">
                    <div class="header-img">音</div>
                    <div class="info">
                        <div class="title info-item">对接OA平台</div>
                        <div class="text info-item">与OA平台对接完成</div>
                        <div class="text info-item">2021-12-31</div>
                    </div>
                </li>
            </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="消息 (0)" name="info">
        消息
        <div class="notify-content">
          <ul class="notifys" v-for="(item,index) in infoList" :key="index">
                <li class="item">
                    <div class="header-img">音</div>
                    <div class="info">
                        <div class="title info-item">{{item.title}}</div>
                        <div class="text info-item">{{item.content}}</div>
                        <div class="text info-item">{{item.time}}</div>
                    </div>
                </li>
            </ul>
        </div>
      </el-tab-pane> -->
      
    </el-tabs>
  </div>
</template>
<script>

export default {
  props:{
      isOpen:{
        type: Boolean
      }
  },
  data() {
    return {
      activeName: "notify",
      infoList: [],
    };
  },
  mounted() {
    console.log("process.env.NODE_ENV",process.env.NODE_ENV)
    this.getSmallBellData()
  },
  watch:{
    isOpen(val){
      if(val){
         this.getSmallBellData()
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 跳转
    async openUrl(order_type,order_id,task_id) {

    },
    async getSmallBellData() {
      
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/styles/variables.scss";

.notify-warp {
  position: relative;
  display: none;
  width: 320px;
  height: 500px;
  padding: 0px 25px 0 25px;
  box-sizing: border-box;
  background-color: $whiteColor;
  position: absolute;
  bottom: -500px;
  left: 50%;
  z-index: 1000;
  transform: translateX(-50%);
  box-shadow: 0px 0px 30px 4px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  ::v-deep .el-tabs__nav-scroll{
    display: flex;
    justify-content: center;
  }
  .notify-content {
    .notifys {
      width: 100%;
      border-bottom: 1px solid $borderColor;
      padding: 10px 5px;
      .item {
        display: flex;
        .header-img {
          width: 35px;
          height: 35px;
          line-height: 35px;
          background-color: $themeColor;
          border-radius: 50%;
          text-align: center;
          color: $whiteColor;
          margin-right: 10px;
        }
        .info {
          width: 200px;
          .info-item {
            margin-bottom: 5px;
            text-align: left;
            &.title {
              font-weight: bold;
              font-size: 14px;
            }
            &.text {
              color: #909399;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
      &:last-child {
        border: 0px;
      }
    }
  }
}
</style>