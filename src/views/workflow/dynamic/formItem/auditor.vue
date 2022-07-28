<template>
<div class="audior-box">
    <el-select
    ref='select' 
    v-model="value" 
    filterable
    remote
    clearable
    @clear="onclear"
    placeholder="请选择接口人" 
    :remote-method="remoteMethod"
    popper-class="auditor-popper"
    @change="selectChange" 
    @visible-change ="onVisibleChange"
    style="width: 80%;">
      <el-option :value="value2" style="min-height: 260px;height:auto;">
        <el-tree
        ref="audtree"
        style="height:100%"
        :data="searchData"  
        :props="defaultProps" 
        :default-expand-all='false'
        @node-click="handleNodeClick"  
        :expand-on-click-node="false"
        v-loading="loading"
        :lazy="true"
        :load="loadData"
        element-loading-text="数据查找中"
        element-loading-spinner="el-icon-loading"></el-tree>
      </el-option>

      <!-- <el-option :value="value2" style="min-height: 260px;height:auto;" v-else>
        <el-tree
        ref="audtree" 
        :data="depData"  
        :props="defaultProps" 
        :lazy="true"
        :load="loadData"
        @node-click="handleNodeClick"  
        :expand-on-click-node="false"></el-tree>
      </el-option> -->
    </el-select>
</div>
</template>

<script>
import {getOaUserDeptList,searchOaUserDeptList} from '@/api/workflow/index.js';
import {Select} from 'element-ui';
// 省内新增 --- 接口人
export default {
  components: {Select},
  name: 'formItem-auditor',
  props: {
    fieldInfo: Object,
    data: String,
    subtype: String,
    oaUserDeptList: Array
  },
  created() {
    // this.change();

  },
  data() {
    return {
      value: '',
      value2:'',
      depData: [],
      searchData:[],
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
      loading:false,
      remoteTree:false,
      allData:[]
    };
  },
  watch: {
     data(val){
      if(!val){
        this.value = '';
        this.searchData = this.allData;
      }
    },

    oaUserDeptList(val) {
      this.depData = val;
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

    onVisibleChange(val) {
      /*if(val) {
        this.searchData = [];
        this.remoteTree = false;
        this.depData = this.allData;
      }*/
    },

    onclear() {
      this.searchData = this.allData;
      this.value = '';
      this.value2 = '';
      this.loading = false;
      this.$emit('change','');
      this.$emit('addAuditorCNName','');
    },

    remoteMethod(keyword) {
      console.log('keyword',keyword);
      this.value = '';
      this.value2 = '';
      if(keyword == '') {
        // this.remoteTree = false;
        this.loading = false;
        this.searchData = this.allData;
        return;
      }
      // this.remoteTree = true;
      this.loading = true;
      searchOaUserDeptList({keyword}).then(res=>{
        if(!res.data) {
          this.searchData = [];
          return;
        }
        if(res.data && res.data.length) this.searchData = res.data;
      }).finally(()=>{
        this.loading = false;
      })
    },

    selectChange(val) {
      console.log('selectChange',val)
    },

    handleNodeClick(data, node ,el) {
      if (data.type!=2 ) {
        this.$message.warning('请选择具体用户！');
        return;
      }
      this.value = node.data.name;
      this.value2 = node.data.id;
      this.$emit('change',node.data.id);
      this.$emit('addAuditorCNName',node.data.name);

      this.$refs.select.blur();
      // this.remoteTree = false;

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

    loadData(node,resolve) {
      if(node.data && node.data.children && node.data.children.length) {
        resolve(node.data.children);
      } else {
        const code = node.data.id||31000000
        getOaUserDeptList({code}).then(res => {
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
  .auditor-popper .el-select-dropdown__item {
    padding: 10px 20px;
    background: #fff;
  }
</style>
