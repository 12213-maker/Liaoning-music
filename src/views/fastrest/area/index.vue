<template>
  <div class="app-container">

    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="区域名称" prop="areaName">
        <el-input
          v-model="queryParams.areaName"
          placeholder="请输入区域名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

      <el-table
        v-loading="loading"
        :data="areaTopData"
        style="width: 100%"
        row-key="areaCode"
        lazy
        :load="load"
        :tree-props="{children: 'children', hasChildren: 'hasChild'}">
        <el-table-column prop="areaName" label="区域名称" width="180"></el-table-column>
        <el-table-column prop="areaCode" label="区域编码" width="180"></el-table-column>
        <el-table-column prop="level" label="行政区划等级"></el-table-column>
      </el-table>
  </div>
</template>
<script>
  import { listArea, getArea, delArea, addArea, updateArea, exportArea } from '@/api/fastrest/area'

  export default {
    data() {
      return {
        // 遮罩层
        loading: true,
        showSearch: true,
        restArea: {
          areaCode: '',
          areaName: '',
          level: '',
          hasChild: true
        },
        /*第一级省级信息*/
        areaTopData: [],
        /*请求参数对象*/
        queryParams: {
          areaCode: null,
          areaName: null
        }
      }
    },
    created() {
      this.getAreaList()
    },
    methods: {
      /** 搜索按钮操作 */
      handleQuery() {
        this.areaTopData.length=0;
        this.getAreaList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      },
      /*获取地区列表信息（第一级省份）*/
      getAreaList() {
        this.loading = true
        listArea(this.queryParams)
          .then(response => {
            for (let i = 0 ;i<response.data.length;i++){
              this.restArea = response.data[i];
              this.areaTopData.push(this.restArea);
            }
            this.loading = false
          })
      },
      load(tree, treeNode, resolve) {
        this.queryParams.areaCode = tree.areaCode
        listArea(this.queryParams)
          .then(response => {
            if (response.data.hasChild){
              resolve(response.data.children);
            }
            this.queryParams={
              areaCode: null,
              areaName: null
            }
          })
      }
    }
  }
</script>
