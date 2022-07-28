<template>
  <div class="all">
    <span class="title">功能权限列表</span>
    <div class="tree" v-loading='treeLoading'>
      <el-tree
      :data="data"
      show-checkbox
      node-key="menuId"
      :default-expanded-keys="[2,3]"
      :default-checked-keys="[5,7]"
      :default-expand-all = 'true'
      :check-strictly="false"
      :props="{ label:'menuName' }"
      ref="tree">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ data.menuName }}</span>
          <span v-if="data.approveStatus=='1'" style="margin-left:16px;">
            <i class="el-icon-warning-outline" style="margin-right:4px;"></i>申请中
          </span>
        </span>
      </el-tree>
      
      <div class="buts">
        <el-button size="mini"  @click="onReset">重置选择</el-button>
        <el-button size="mini" type="primary" @click="onSubmit">提交申请</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getMenus, applyAuthority } from '@/api/dy/permission.js';

export default {
  name: "PermissionApplication",
  data() {
    return {
      data: [],
      defaultProps: {
        children: "children",
        label: "label",
      },

      dyMenue:null,
      checkedKeys:[],
      treeLoading:false
    };
  },

  methods:{
    onReset() {
      this.$confirm('确认重置勾选内容?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.getMenus();
      })
    },
    getMenus() {
      this.treeLoading = true;
      getMenus().then( res => {
        console.log('菜单',res);
        this.data = res.data.children.map(item=>{
          // 审批状态(1：审批中 2：审批通过 3：审批不通过)
          return this.dealMenuData(item);
        });
        this.dyMenue = res.data;

        setTimeout(()=>{
          if(this.$refs.tree) this.$refs.tree.setCheckedKeys(this.checkedKeys);
        },500);
      })
      .catch(()=>{
        this.treeLoading = false;
      })
      .finally(()=>{
        this.treeLoading = false;
      })
    },

    dealMenuData(menu,menuIds) {
      var newMenuIds = menuIds?JSON.parse(JSON.stringify(menuIds)) : [];
      if(newMenuIds.length>2)  newMenuIds = newMenuIds.splice(0,2);
      newMenuIds.push(menu.menuId);
      menu.menuIds = newMenuIds;

      console.log(menu.menuName,menu.menuIds);

      if(menu.menuType=='M') {
        menu.disabled = true;
      }

      if(menu.approveStatus!='3' && menu.menuType=='C') {
        this.checkedKeys.push(menu.menuId);
        menu.disabled = true;
      }

      if(menu.children && menu.children.length) {
        menu.children.forEach(child=>{
          this.dealMenuData(child,newMenuIds);
        })
      }

      return menu;
    },

    onSubmit() {
      const checkedNodes = this.$refs.tree.getCheckedNodes();
      let keys = [];

      checkedNodes.forEach(node=>{
        if(node.approveStatus=='3' && node.menuType !== 'M') {
          keys.push(node.menuIds);
        }
      })

      console.log('keys0',keys);

      keys = Array.from(new Set(keys.flat()));
      keys.push(this.dyMenue.menuId);

      console.log('keys1',keys);

      if(keys.length !== 0) {
        this.$confirm('确认申请勾选菜单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.applyAuthority(keys);
        })
      } else {
        this.$message.warning('请勾选需要申请的菜单！');
      }
      
    },

    applyAuthority(menuIds) {
      applyAuthority({
        menuIds
      }).then(res=>{
        if(res.success) {
          this.$message.success(res.msg);
          this.getMenus();
        }
      })
    }
  },

  mounted() {
    this.getMenus();
  }
};
</script>

<style scoped lang="scss">
.all {
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 20px;
  width: 100%;
  min-height:530px;
  display: flex;
  flex-direction: column;
  .title {
    font-size: 20px;
    font-weight: 800px;
  }
  .tree {
    padding-top: 10px;
    height: 93%;
    width: 100%;
    position: relative;
    .buts{
      display: flex;
      justify-content: center;
      padding:20px 0;
    }
  }
}
::v-deep .el-tree-node__content{
  height:50px !important;
}
</style>