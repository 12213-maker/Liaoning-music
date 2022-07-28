<!--头部导航样式-->
<template>
   <div class="header-right-wrap">
    <a class="groupDayin" 
    style="margin-right:14px;"
    v-if="Boolean(groupUser=='true')" 
    @click="clickToGroupDayin">{{jtMenu.meta.title}}</a>

    <div class="noteSeting" style="margin-right:14px;">
      <div class="getNotify">
        <div
        class="bell-wrap" 
        @mouseover="showBell"  
        @mouseout="isBell = false" >
          <i class="el-icon-bell" > </i>
        </div>
        <Notify :isOpen="isBell" ref='notify'></Notify>
      </div>
    </div>

    <!-- 消息通知 -->
    <div class="personal">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="el-icon-s-custom head-img"></i> {{ userData || '用户名'}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item command="1">权限申请</el-dropdown-item> -->
          <el-dropdown-item command="2">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  
  </div>
</template>
<script>

import Notify from "./Notify.vue";
import {gotoJTDY} from "@/api/dy/menu.js"

export default {
  name: "HeaderRight",
  props:['jtMenu'],
  components:{Notify},
  data() {
    return {
      token: "",
      isBell: true,
      userData: null,
      groupUser:sessionStorage.getItem('groupUser')
    };
  },

  created() {
    this.userData = sessionStorage.getItem('userInfo')?JSON.parse(sessionStorage.getItem('userInfo')).nickName:'';
    console.log(sessionStorage.getItem('groupUser'));
  },

  methods: {
    showBell(){
      if(this.isBell){
        return
      }
      this.isBell = true;
    },

    // 跳转到集团大音
    clickToGroupDayin() {
      gotoJTDY().then(res=>{
        if(res.success) {
          window.open(res.data);  
        }
      })
    },

    handleCommand(command) {
      if(command=='1') {
        this.$router.push('/permission');
      } else {
        this.$store.dispatch('LogOut')
        .then(()=>{
          sessionStorage.removeItem("userInfo");
          sessionStorage.removeItem("areaName");
          sessionStorage.removeItem("areaId");
          sessionStorage.removeItem("activeIndex");
          sessionStorage.removeItem("cityId");
          sessionStorage.removeItem("dept");
          sessionStorage.removeItem("menus");
          sessionStorage.removeItem("code");
          sessionStorage.removeItem("menuDefaultLink");
          sessionStorage.removeItem("department");
          this.$router.push('/401');
        }).catch(()=>{
          sessionStorage.removeItem("userInfo");
          sessionStorage.removeItem("areaName");
          sessionStorage.removeItem("areaId");
          sessionStorage.removeItem("activeIndex");
          sessionStorage.removeItem("cityId");
          sessionStorage.removeItem("dept");
          sessionStorage.removeItem("menus");
          sessionStorage.removeItem("code");
          sessionStorage.removeItem("menuDefaultLink");
          sessionStorage.removeItem("department");
          this.$router.push('/401');
        })
        
      }
    }
   
  },
};
</script>
<style  lang='scss' scoped>

@import "~@/assets/styles/variables.scss";

.header-right-wrap {
  width:auto; 
  display:flex; 
  height:60px; 
  align-items:center; 
  padding-right:20px;

  ::v-deep.el-select > .el-input {
    width: 150px !important;
    height: 32px !important;
  }
  .fix {
    height: 60px;
    display: flex;
    align-items: center;
    position: relative;
    &:hover .select {
      display: block;
    }
    
  }

  .groupDayin {
    color:#262626;
    font-size:14px;
  }

  .groupDayin:hover {
      color: $themeColorHover;
    }
    .select {
      position: absolute;
      display: none;
      left: -15px;
      bottom: -80px;
      height: 80px;
      width: 100px;
      background: #fff;
      text-align: center;
      line-height: 40px;
      border-radius: 3px;
      li:hover {
        color: $themeColorHover;
      }
    }

  .el-button {
    margin-left: 10px;
  }
  .getNote {
    padding: 0 10px;
    height: 60px;
    display: flex;
    align-items: center;
  }
  & > div {
    cursor: pointer;
  }

  .noteSeting {
    // line-height: 60px;
    margin-right: 15px;
    position: relative;
    display: flex;
    align-items: center;
    .bell-wrap {
      height:100%; 
      display:flex; 
      flex-direction:column; 
      justify-content: center;
      padding:0px 15px
    }
    .getNotify {
      padding: 0px;
      height: 60px;
      text-align: center;
      display: flex;
      align-items: center;
      // margin-right: 15px;
      &:hover {
        .notify-warp {
          display: block;
        }
      }
    }
  }

  .personal {
    width: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right:20px;
    box-sizing: border-box;

    .head-img {
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 50%;
      background-color: #a9b2bb;
      margin-right:8px;
    }
  }

}


</style>
