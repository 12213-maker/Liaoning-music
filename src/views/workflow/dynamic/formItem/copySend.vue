<template>
<div>
    <el-select
    ref='select' 
    v-model="value" 
    multiple
    filterable
    remote
    clearable
    placeholder="请输入抄送人名称" 
    :remote-method="remoteMethod"
    popper-class="copy-popper"
    @change="selectChange" 
    @visible-change ="onVisibleChange"
    @remove-tag="onTagRemove"
    style="width: 80%;">
      <el-option :value="value2" style="min-height: 260px;height:auto;">

        <el-tree
        ref="audtree" 
        :data="searchData"  
        :props="defaultProps" 
        show-checkbox
        node-key="id"
        @check-change='getCheckedNodes' 
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
        show-checkbox
        node-key="id"
        :lazy="true"
        :load="loadData"
        @check-change='getCheckedNodes' 
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
  name: 'formItem-copySend',
  props: {
    fieldInfo: Object,
    data: String,
    subtype: String,
    oaUserDeptList: Array
  },
  created() {
    this.change('');

    document.body.addEventListener('click',()=>{
      this.treeVisible = false 
    })
  },
  data() {
    return {
      value: [],
      value2: [],
      depData: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        value:'name',
        isLeaf:(data)=>{
          if(data.isLeaf!=null) {
            return data.leaf;
          } else {
            return data.children && !data.children.length>0;
          };
        },
        disabled:(data)=>{
          return data.type != 2;
        }
      },
      treeVisible: false,
      parentMenuList:[],
      searchData:[],
      allData:[],
      remoteTree:true,
      loading:false,
      selectedDatas:[]
    };
  },
  watch: {
    data(val) {
      console.log('copysend',val)
      if(!val){
        this.value = [];
        this.$refs.audtree.setCheckedKeys([]);
        this.searchData = this.allData;
      }
    },

    oaUserDeptList(val) {
      this.depData = val;
    }
  },
  methods: {
    onTagRemove(val) {
      const idx = 0;
      this.selectedDatas.forEach((item)=>{
        if(item.name==val) {
          const idx = this.value2.indexOf(item.id);
        }
      })

      this.value2.splice(idx,1);
      this.selectedDatas.splice(idx,1);
      this.$refs.audtree.setCheckedKeys(this.value2);
      this.$emit('addCodeSendId',this.value2.join(','));

      if(this.selectedDatas.length==0) {
        this.searchData = this.allData;
      }
    },
    selectChange(val) {
      console.log(val)
    },

    onVisibleChange(val) {
      /*if(val) {
        this.searchData = [];
        this.remoteTree = true;
        this.depData = this.allData;
      }*/
    },

    remoteMethod(keyword) {
      console.log('keyword',keyword);

      if(keyword == '') return;


      this.loading = true;
      searchOaUserDeptList({keyword}).then(res=>{
        if(!res.data) {
          this.searchData = [];
          return;
        }
        if(res.data && res.data.length) this.searchData = res.data;
        this.$refs.audtree.setCheckedKeys(this.value2);
      }).finally(()=>{
        this.loading = false;
      })
    },

    getCheckedNodes(d,checked,checkedNodes) {
      if(checked) {
        let data = this.$refs.audtree.getCheckedNodes(true,true);
        let nameMap = [];
        let idMap = [];
        
        data.forEach(item=> {
           nameMap.push(item.name);
           idMap.push(item.id);
           if(!this.value2.includes(item.id)) {
            this.selectedDatas.push(item);
           }
        })

        const set1 = new Set(this.value.concat(nameMap));
        const set2 = new Set(this.value2.concat(idMap));
        this.value = Array.from(set1);
        this.value2 = Array.from(set2);
        
        this.change(this.value.join(';'));
        this.$emit('addCodeSendId',this.value2.join(','));
      }
    },
    change(value) {
      this.$emit('change', value);
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
  .copy-popper .el-select-dropdown__item {
    padding: 10px 20px;
    background: #fff;
  }
</style>
