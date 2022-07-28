<template>
  <div class="app-container">
    <!-- 接口树列表 -->
    <el-col :span="4" :xs="24" style="padding-right: 20px">
      <div class="head-container">
        <el-input
          v-model="intName"
          placeholder="请输入接口名称"
          clearable
          size="small"
          prefix-icon="el-icon-search"
          style="margin-bottom: 20px"
        />
      </div>
      <div class="head-container">
        <el-tree
          :data="apiOptions"
          :props="defaultProps"
          :expand-on-click-node="false"
          :filter-node-method="filterApiNode"
          ref="tree"
          default-expand-all
          @node-click="handleApiNodeClick"
        />
      </div>
    </el-col>
    <!-- 接口数据 -->
    <el-col :span="20" :xs="24">
      <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
        <el-form-item label="接口名称" prop="restName">
          <el-input
            v-model="queryParams.restName"
            placeholder="请输入接口名称"
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

      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
            v-hasPermi="['fastrest:api:add']"
          >新增</el-button>
          <!-- <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
          >新增</el-button> -->
        </el-col>

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>

      <el-table
        v-loading="loading"
        :data="apiList"
        @selection-change="handleSelectionChange"
        max-height="450"
        ref="interfaceList">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column label="接口名称"  width="250"  align="left" prop="restName" />
        <el-table-column label="接口编码" align="center" prop="restSerialNo"
        />
        <el-table-column label="启用状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enable"
              active-value="1"
              inactive-value="0"
              @change="handleEnable(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>

        <el-table-column label="归档状态" align="center" prop="statusName" />

        <el-table-column label="更新时间" align="center" prop="updateTime" width="180" />
  <!--      <el-table-column label="备注" align="center" prop="remark" />-->
        <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width" >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              class="iconfont iconbugx"
              @click="handleDebug(scope.row)"
              v-hasPermi="['fastrest:api:debug']"
              style="font-size:12px">调试</el-button>

            <!-- <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="jumpEdit(scope.row)"
              v-hasPermi="['fastrest:api:edit']"
            >修改</el-button> -->

            <el-button
              size="mini"
              type="text"
              icon="el-icon-folder-opened"
              @click="handleFile(scope.row)"
              v-hasPermi="['fastrest:api:file']"
            >归档</el-button>

            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['fastrest:api:remove']"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </el-col>
  </div>
</template>

<script>
import {
  listApi,
  delApi,
  addApi,
  treeApiSelect,
  updateApiEnable,
  changeStatus
} from "@/api/fastrest/api";

export default {
  name: "Api",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 接口管理表格数据
      apiList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        restName: null,
        dirCode: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      // 接口树选项
      apiOptions: undefined,
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 接口名称
      intName: undefined,
    };
  },
  created() {
    this.getList();
    this.getTreeApiSelect();
  },
  watch: {
    // 根据名称筛选接口树
    intName(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    /** 查询接口管理列表 */
    getList() {
      this.loading = true;
      let queryParams = {
        "restName": this.queryParams.restName,
        "dirCode": this.queryParams.dirCode
      }
      let pageNum = this.queryParams.pageNum;
      let pageSize = this.queryParams.pageSize
      listApi(queryParams,pageSize,pageNum).then(response => {
        this.apiList = response.rows;
        this.apiList.filter((val)=>{
          if(val.status === "0") {
            val.statusName = "草稿";
          } else if(val.status === "1") {
            val.statusName = "变更中";
          } else if(val.status === "2") {
            val.statusName = "归档";
          }
        });
        this.total = response.total;
        this.loading = false;
      });

    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        restCode: null,
        restName: null,
        restSerialNo: null,
        method: null,
        restDesc: null,
        status: 0,
        request: null,
        requestMeta: null,
        response: null,
        responseMeta: null,
        system: null,
        dirCode: null,
        createBy: null,
        createAt: null,
        updateBy: null,
        updateAt: null,
        delFlag: null,
        remark: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.$router.push("/api/add");
    },
    /** 调试按钮操作 */
    handleDebug(row) {
      this.reset();
      const tableId = row.id || this.ids;
      this.$router.push({
        path: "/api/debug/" + tableId,
      });
    },
    /** 归档按钮操作 */
    handleFile(row) {
      if(row.status !== "2") {
        changeStatus(row.id).then((res)=>{
          if(res.code === 200) {
            row.statusName = "归档";
            this.getList();
            this.$message({
              type: 'success',
              message: '归档成功'
            });
          }else {
            this.$message.error('归档失败');
          }
        });

      }
    },

    /** 修改按钮操作(跳转页面) */
    /* jumpEdit(row) {
      console.log('row==>',row);
      this.reset();
      const tableId = row.id || this.ids;
      this.$router.push("/api/edit/" + tableId);
    }, */

    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateApi(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addApi(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      if(row.status === "2") {
        this.$confirm('该数据项为归档状态，禁止删除！', "禁止", {
          confirmButtonText: "确定",
          closeOnClickModal: false,
          type: "error"
        });
      } else {
        const ids = row.id || this.ids;
        this.$confirm('是否确认删除接口管理编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          closeOnClickModal: false,
          type: "warning"
        }).then(function() {
          return delApi(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
      }
    },
    /** 查询接口下拉树结构 */
    getTreeApiSelect() {
      treeApiSelect().then(response => {
        this.apiOptions = [response.data[0]];
      });
    },
    // 筛选节点
    filterApiNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleApiNodeClick(data) {
      this.queryParams.dirCode = data.id;
      this.getList();
    },
    // 启用禁用状态更改点击事件
    handleEnable(row) {
      let statusInfo = {
        id: row.id,
        enable: row.enable
      }
      updateApiEnable(statusInfo);
    }
  }
};
</script>

<style>
  .el-tree .el-tree-node__label {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
