<template>
<div style="position:relative;">
    <!-- <el-input v-model="value" @click.native="showTree" placeholder="请选择主责单位" style="width: 80%;"></el-input>
     <div style="width: 80%;height: 200px;overflow-y: auto" v-show="treeVisible">
        <el-tree ref="tree" 
        :data="depData" 
        :props="defaultProps" 
        :lazy="true"
        :load="loadData"
        @node-click="handleNodeClick"  
        :expand-on-click-node="false"></el-tree>
    </div> -->

    <el-select
    ref='select' 
    v-model="value" 
    filterable
    remote
    clearable
    @clear="onclear"
    placeholder="请选择主责单位" 
    :remote-method="remoteMethod"
    popper-class="dept-popper"
    style="width: 80%;">
        <el-option :value="value2" style="min-height: 260px;height:auto;">
          <el-tree
          ref="audtree"
          style="height:100%"
          :data="depData"  
          :props="defaultProps" 
          :default-expand-all='remote'
          :lazy="true"
          :load="loadData"
          @node-click="handleNodeClick"  
          :expand-on-click-node="false"
          v-loading="loading"
          element-loading-text="数据查找中"
          element-loading-spinner="el-icon-loading"></el-tree>
        </el-option>
    </el-select>
</div>
</template>

<script>
import {getOaDeptList,searchOaDeptList} from '@/api/workflow/index.js';
import {Select} from 'element-ui';
// 省内新增 --- 主责部门
export default {
  components: {Select},
  name: 'formItem-lordDepartment',
  props: {
    fieldInfo: Object,
    data: String,
    subtype: String,
    oaDeptList: Array
  },
  created() {
    // this.change();
  },
  data() {
    return {
      value: '',
      value2:'',
      optVal:'',
      depData: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf:(data)=>{
          if(data.isLeaf!=null) {
            return data.leaf;
          } else {
            return data.children && !data.children.length>0;
          };
        }
      },
      treeVisible: false,
      parentMenuList:[],
      parentMenuListIds:[],
      loading:false,
      remote:false,
      allData:[]
    };
  },
  watch: {
    oaDeptList(val) {
      this.depData = val
    },
    
    data(val){
      if(!val){
        this.value = '';
        this.depData = this.allData;
      }
    }
  },
  methods: {
    change() {
      this.$emit('change', this.value);
    },
    // 获取tree任意节点父级列表
    nodeClick (node) {
      if (node.label) {
        this.parentMenuList.push(node.label)
      }
      //迭代
      if(node.parent) {
        this.nodeClick(node.parent)
      }
    },

    onclear() {
      this.depData = this.allData;
      this.value = '';
      this.value2 = '';
      this.loading = false;
      this.$emit('change','');
    },

    remoteMethod(keyword) {
      this.value = '';
      this.value2 = '';
      if(keyword == '') {
        this.remote = false;
        this.loading = false;
        this.depData = this.allData;
        return;
      }
      this.loading = true;

      searchOaDeptList({keyword}).then(res=>{
        if(!res.data) {
          this.depData = [];
          return;
        }
        this.remote = true;
        if(res.data && res.data.length) this.depData = res.data;
      }).finally(()=>{
        this.loading = false;
      })
    },

    handleNodeClick(data, node ,el) {

      // 若node未知，可根据以下方式获取相关节点的node值
      this.parentMenuList = [];
      this.nodeClick(node)
      let parentMenuList = this.parentMenuList.reverse()
      // 将获取到的父级目录列表进行组合输出，若点击三级1-1-1得到的结果为  一级 1/二级 1-1/三级 1-1-1
      let parentMenu = ''
      let ids = [];
      this.parentMenuList.forEach((item,index)=>{
        if(index !== this.parentMenuList.length-1) {
              parentMenu += item + '/'
        } else {
            parentMenu += item
          }
      })
      this.value = parentMenu;
      this.$emit('change',parentMenu);
      this.$refs.select.blur();

    },

    showTree() {
      this.treeVisible = !this.treeVisible;
    },

    tranListToTreeData(list) {
        // name: "中国移动通信集团辽宁有限公司", deptId: "00000000", deptParentId: "31000000"}
        const treeList = [],  // 最终要产出的树状数据的数组
          map = {}        // 存储映射关系
        list.forEach(item => {
          if (!item.children) {
            item.children = []
          }
          map[item.id] = item
        })
        list.forEach(item => {
          // 对于每一个元素来说，先找它的上级  如果能找到，说明它有上级，则要把它添加到上级的children中去
          //   如果找不到，说明它没有上级，直接添加到 treeList
          const parent = map[item.parentId]
          // 如果存在则表示item不是最顶层的数据
          if (parent) {
            parent.children.push(item)
          } else {
            // 如果不存在 则是顶层数据
            treeList.push(item)
          }
        })
        // 返回出去
        return treeList
      },

      onInputFocus() {
        this.$nextTick( ()=> { 
          this.$refs.selector.focus(); 
          this.$refs.selector.toggleMenu();
        })
      },

      loadData(node,resolve) {
        if(node.data && node.data.children && node.data.children.length) {
          resolve(node.data.children);
        } else {
          const code = node.data.id||31000000
          getOaDeptList({deptCode:code}).then(res => {
            if(code==31000000) {
              this.allData = res.data;
            }
            resolve(res.data);
          })
        }
      }
    // queryIdenty(type) {
    //   const identySubtype = type;
    //   queryIdentyDetail({
    //     // 申请单判断处理
    //     identyType: identySubtype.substring(0, 2),
    //   }).then((res) => {
    //     if (res) {
    //       this.options = res.data[identySubtype];
    //     }
    //   });
    // },
  },
};
</script>

<style lang="scss">
  .dept-popper .el-select-dropdown__item {
    padding: 10px 20px;
    background: #fff;
  }
</style>

<style lang="scss">
.per-select {
  width:400px;
  height:100%;
  border:0px;
  position:absolute; top:0; left:0

  input {
    height:100%;
  }

  .el-tag.el-tag--info .el-tag__close {
    display:none;
  }

  .el-select__caret { 
      appearance:none;
      -moz-appearance:none;
      -webkit-appearance:none;
      padding-right: 14px;
      background: url("../../../../assets/images/arrow-up.png") no-repeat center transparent;
      background-size: 12px 12px;
  }
  .el-icon-arrow-up:before {
      content: '';
  }

}


.per-popper-select {
  margin-top:0px !important;

  .el-select-dropdown__item {
    height:auto;
    display:flex;
    padding:0px;
  }

  .popper__arrow {
    display:none;
  }
  .el-tree {
    padding:20px;
    width:100%;
  }
  .el-tree-node__content {
    height:34px;
  }
}
</style>
