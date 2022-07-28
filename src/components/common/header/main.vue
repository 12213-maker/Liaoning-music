<!--头部导航样式-->
<template>
  <div class="el-header-wrap">
    <el-row class="main-menu">
      <!-- logo -->
      <el-col :span="4">
        <div class="logo-box">
          <img src="@/assets/images/head-logo.png" class="logo" alt />
        </div>
      </el-col>

      <!-- menu -->
      <el-col :span="20" class="el-col-logout">
        <div class="el-menu-wrap-box">
          <el-menu class="el-menu-wrap" mode="horizontal" :default-active="activeIndex"  ref="menu">
            <template v-for="(item, index) in menuItems">
              <el-menu-item
              class="el-menu-item"
              :key="index"
              :index="item.id"
              @click="onFirstNavClick(item, index)"
              @mouseover.native="item.children && item.children.length > 0 && showSubNav(item)"
              :disabled="item.hidden">
                <span>{{ item?item.meta.title:'' }}</span>
                <i v-if="item.children && item.children.length > 0" class="el-icon-arrow-down"></i>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
        <HeaderRight :jtMenu="jtMenu"/>
      </el-col>
    </el-row>

    <Submenu 
    :isOpen="isOpen" 
    :leftData="leftData"
    ref="submenu"
    @changeActiveIndex="changeActiveIndex"/>

  </div>
</template>
<script>
import Submenu from './component/Submenu'
import HeaderRight from './component/HeaderRight'
import {jtMenu} from './mock.js'

export default {
  components: { Submenu,HeaderRight },
  name: "HeadNav",
  data() {
    return {
      activeIndex:'',
      token: "",
      appAcctId: "",
      isOpen: false,
      leftData: [],
      menuItems:JSON.parse(sessionStorage.getItem('menus')),
      jtMenu
    };
  },

  methods: {
    async getTabMenu() {
      this.activeIndex = sessionStorage.getItem('activeIndex') || this.menuItems[0].id; 
    },
    
    // 点击菜单
    onFirstNavClick(item, index) {
      if(!item.children || !item.children.length) {
        if(item.path.indexOf('http') != 0 ) {
          sessionStorage.setItem('activeIndex',item.id);
          this.$router.push({ name: item.name });
        } else {
          window.open(item.path);
        }
      }
    },

    //一级菜单鼠标移入
    showSubNav(item) {
      if(item.children && item.children.length) {
        this.leftData = item.children;
        this.$refs.submenu.isOpen = true;
      }
    },

    /*closeMenu() {
      this.isOpen = false;
    },*/

    changeActiveIndex(val) {
      console.log('active',val)
      this.$refs.menu.updateActiveIndex(val)
      this.activeIndex = val;
      
      sessionStorage.setItem('activeIndex',val);
    },

    logout() {
      //登出
      this.$confirm("确认退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.sessionStorage.clear();
          this.$router.push("/Login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出登录",
          });
        });
    },

    findDefaultIdx(menu,menuDefaultLink) {
      if(menu.path == menuDefaultLink) {
        this.activeIndex = menu.parentIds[0];
        return;
      } else {
        if(menu.children && menu.children.length) {
          menu.children.forEach(item=>{
            this.findDefaultIdx(item,menuDefaultLink);
          })
        }
      }
    }
  },

  created() {
    this.leftData = this.menuItems[0].children;
    let menuDefaultLink = sessionStorage.getItem('menuDefaultLink');
    if(menuDefaultLink && menuDefaultLink != 'null') {
      this.menuItems.forEach((item,idx)=>{
        this.findDefaultIdx(item,menuDefaultLink);
      })
    } else {
      this.activeIndex = sessionStorage.getItem('activeIndex')?sessionStorage.getItem('activeIndex'):this.menuItems[0].id;
    }
  }
};
</script>
<style  lang='scss' scoped>
@import "~@/assets/styles/variables.scss";

.v-modal {
  top:61px;
  background:red;
}

.el-row {
  width: 100vw;
  height: 100%;
}

.el-header-wrap {
  width:100%;
  height:60px;
  min-height:60px;
  background-color: #fff;
  .el-drawer__wrapper {
    top:61px;
  }

  .main-menu {
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.05);
  }

  .logo-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;

    .logo {
      display: block;
      width: 80%;
      max-width: 216px;
      background-size: 100%;
    }

    .title {
      margin-left: 16px;
      font-weight: bold;
      font-size: 18px;
      color: $firstColor;
    }
  }

  .logout {
    text-align: center;
    line-height: 32px;
  }

  .el-menu-wrap-box {
    display: flex;
    align-items: center;

    .el-menu--horizontal>.el-menu-item {
      color: #262626;
    }

    .el-menu-wrap {
      border: none;
      .el-menu-item {
        margin: 0 16px;
        height: 60px;
        padding: 0;
        text-align: center;

        i {
          margin-right: 0;
        }

        &.router-link-exact-active {
          color: $themeColor;
          border-bottom:2px solid $themeColorHover !important;
        }

        &.router-link-exact-active,
        &:hover {
          color: $themeColor;
          -border-bottom-color: $themeColorHover !important;

          i {
            color: $themeColor;
          }
        }
      }
    }
  }
}

.el-col-logout {
  height: 60px;
  align-items: center;
  display:flex; 
  justify-content:space-between;
}

.el-menu--horizontal > .el-menu-item.is-active {
    color: $themeColor !important;
}
</style>
