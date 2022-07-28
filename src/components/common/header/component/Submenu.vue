<!--头部导航样式-->
<template>
      <!-- 子菜单浮动框 -->
    <el-drawer
    :visible="isOpen"
    :withHeader="false"
    direction="ttb"
    :append-to-body="false"
    size="50%"
    :wrapperClosable='true'
    custom-class='menue-drawer'>
      <div class="menuSection" @mouseleave="closeMenu">
        <div class="menuLeft">
          <div
          class="childItem"
          v-for="(ite, idx) in leftData"
          :key="idx"
          @mouseover="showThirdNav(ite, idx)"
          @click="onSecondNavClick(ite,idx)"
          :class="{ active: childActive === idx }">
            <span>{{ ite?ite.meta.title:'' }}</span>
          </div>
        </div>
        <div class="menuRight" style="z-index:9999">
          <img class="icon-close" @click="closeMenu" src="@/assets/images/close.png" />
          <div class="title">{{ rightTitle }}</div>
          <div class="rightContent">
            <div
            class="rightItem"
            v-for="(ite, idx) in rightData"
            :key="idx"
            @click="onThirdNavClick(ite)">
              <div class="name" :class="ite.path==$route.path?'active':''">{{ ite?ite.meta.title:'' }}</div>
              <div class="desc">{{ ite?ite.meta.remark:'' }}</div>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
</template>
<script>
import {downloadRportList} from '@/api/dy/report.js'
import {addSysOperLog} from '@/api/menu.js'

export default {
  name: "Submenu",
  props:['leftData'],
  data() {
    return {
      token: "",
      appAcctId: "",
      childActive: 0,
      isOpen:false
    };
  },

  watch: {
    leftData() {
      this.childActive = 0;
    }
  },

  computed: {
    rightData() {
      return this.leftData[this.childActive].children
    },

    rightTitle() {
      return this.leftData[this.childActive].meta.title
    }
  },

  methods: {

    //三级菜单点击
    onThirdNavClick(item) {
      this.isOpen = false;
      console.log(item.component);
      if(item.component=="Workflow" || item.component=="Add") {
        console.log(item.component,item.meta.title);
        addSysOperLog({
          name:item.meta.title,
          type:666
        })
      }
      // 判断是否为外部链接
      if (item.path.indexOf('request:') !== -1) {
        let url =  item.path.split('request:')[1];
        downloadRportList(url).then(res=>{
          if(res.success) {
            window.open(res.msg);  
          } else {
            this.$message.error(res.msg);
          }
        })
        return;
      } else if(item.path.indexOf('http') != 0) {
        this.$emit('changeActiveIndex',item.parentIds[0]);
        if(this.$route.path !== item.path) {
          this.$router.push({path:item.path});
        }
        return;
      }
      
      window.open(item.path);
    },

    closeMenu() {
      this.isOpen = false;
      // this.$emit('closeMenu')
    },

    //二级菜mouseover
    showThirdNav(item, index) {
      this.childActive = index;
    },

    // 点击二级菜单跳转第一个三级菜单
    onSecondNavClick(item, index) {
      if(item.children) {
        this.onThirdNavClick(item.children[0]);  
      }
    }
  },
};
</script>
<style  lang='scss' scoped>

@import "~@/assets/styles/variables.scss";

.menuSection {
  height: 100%;
  background: $whiteColor;
  display: flex;
  .menuLeft {
    width: 318px;
    background: $allBackground;
    padding: 24px 0 24px 48px;
    .childItem {
      height: 60px;
      display: flex;
      align-items: center;
      &.active > span {
        color: $firstColor !important;
        border-bottom-color: $themeColor !important;
      }
      span {
        color: $secondColor;
        border-bottom: 2px solid $allBackground;
        cursor: pointer;
        padding-bottom: 8px;
        &:hover {
          color: $firstColor;
          border-bottom-color: $themeColor;
        }
      }
    }
  }
  .menuRight {
    padding: 40px 106px 40px 82px;
    width: 100%;
    position: relative;
    .icon-close {
      position: absolute;
      cursor: pointer;
      top: 45px;
      right: 48px;
      width: 16px;
    }
    .title {
      font-size: 24px;
      padding-bottom: 15px;
      margin-bottom: 40px;
      border-bottom: 1px solid $borderColor;
      text-align:left;
      color: #262626;
    }
    .rightContent {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      .rightItem {
        cursor: pointer;
        width: 25%;
        padding-right: 40px;
        padding-bottom: 60px;
        .name {
          color: #595959;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .active.name {
          color: $themeColor;
        }
        .desc {
          color: $secondColor;
          font-size: 12px;
        }
        &:hover {
          .name {
            color: $themeColorHover;
          }
          .desc {
            color: $threeColor;
          }
        }
      }
    }
  }
}
</style>
