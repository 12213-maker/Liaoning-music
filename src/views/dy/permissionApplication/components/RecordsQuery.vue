<template>
  <div @click="hiddenall" class="all records-query">
    <div class="top">
      <span class="spaninfo">申请时间： </span>
      <el-date-picker
        v-model="timepick"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        @change="onDateChange"
      >
      </el-date-picker>

      <span class="spaninfo spaninforight">申请状态： </span>
      <el-select
        v-model="selectValue"
        placeholder="请选择"
        @change="selectChange"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="table" v-loading="tableLoading">
      <el-table
        :data="tableData"
        border
        style="width: 100%; min-height:100%;"
        @cell-click='onCellClick' 
      >
        <el-table-column
          type="index"
          :index="(this.currentPage - 1) * this.pageSize + 1"
          align="center"
          label="序号"
          width="91"
        >
        </el-table-column>
        <el-table-column
          prop="applyDate"
          align="center"
          label="申请时间"
          width="350"
        >
        </el-table-column>
        <el-table-column  label="申请权限" align="center">
          <template slot-scope="scope">

             <el-select
              :value="scope.row.menuNames"  
              multiple
              placeholder="请选择"
              readonly
              popper-class="per-popper-select"
              class="per-select">
                <el-option :value="optVal">  
                    <el-tree
                    :data="scope.row.menuDTO.children"
                    show-checkbox
                    node-key="menuId"
                    :props="{
                      label:'menuName'
                    }"
                    :default-expanded-keys="[2, 3]"
                    :default-checked-keys="scope.row.menuKeys"
                    :default-expand-all="true">
                    </el-tree>
                </el-option>
            </el-select>
            <!-- <div class="allrow">
              <div class="tags">
                <el-tag class="eltag" type="info" v-for="(menuName,idx) in scope.row.menuNames" :key="idx">{{menuName}}</el-tag>
              </div>
              <div
                @click="clickShowTree(scope.row)"
                class="triggleShowMore"
              >
                <i class="el-icon-caret-bottom"></i>
              </div>
              <div v-if="scope.row.showTree" class="boxhidden">
                <el-tree
                  :data="scope.row.menuDTO.children"
                  show-checkbox
                  node-key="menuId"
                  :props="{
                    label:'menuName'
                  }"
                  :default-expanded-keys="[2, 3]"
                  :default-checked-keys="scope.row.menuKeys"
                  :default-expand-all="true"
                >
                </el-tree>
              </div>
            </div> -->
          </template>
        </el-table-column>
        <el-table-column prop="approveStatus" align="center" width="120" label="申请状态" :formatter="formatStatus">
        </el-table-column>
      </el-table>
    </div>

    <el-pagination
      class="pagination"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      background
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getAuthorityList } from "@/api/dy/permission.js";
export default {
  name: "RecordsQuery",
  data() {
    return {
      timepick: "",
      selectValue: "",
      data: [],
      options: [
        { value: 1, label: "申请中" },
        { value: 2, label: "已通过" },
        { value: 3, label: "未通过" },
      ],
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 100,
      offsetNum: 50,
      total:0,
      tableLoading:false,
      optVal:''
    };
  },
  methods: {
    onDateChange() {
      this.currentPage = 1;
      this.getAuthorityList();
    },

    //第二次选择有bug
    selectChange() {
      // console.log(copydata,'我是copydata');
      this.currentPage = 1;
      this.getAuthorityList();
    },
    //点击展示树
    clickShowTree(row) {
      console.log(row.showTree)
      row.showTree = !row.showTree;
      this.tableData.forEach(data=>{
        if(data.id !== row.id) data.showTree = false;
      })
      
    },
    //点击空白区域隐藏
    hiddenall() {
      this.tableData.map((item) => {
        item.showTree = false;
      });
    },
    getAuthorityList() {
      this.tableLoading = true;
      getAuthorityList({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        approveStatus: this.selectValue,
        endTime: this.timepick && this.timepick.length ? this.timepick[1] : "",
        startTime: this.timepick && this.timepick.length ? this.timepick[0] : "",
      }).then((res) => {
        if(res.data && res.data.data) {
          res.data.data.map((item) => {
            item.showTree = false;
          });

          //处理树形控件
          const getMenuName = (data,child) => {
            child.disabled = true;
            data.menuKeys.push(child.menuId);
            if(child.menuType=='C') {
              data.menuNames.push(child.menuName);
            }

            if(child.children) {
              child.children.forEach(c=>{
                getMenuName(data,c);
              })
            }
          };

          res.data.data.forEach(data=>{
            data.menuNames = [];
            data.menuKeys = [];
            data.menuDTO.children.forEach(child=>getMenuName(data,child))
          })

          this.tableData = res.data.data;
          this.total = Number(res.data.total);
        } else {
          this.tableData= [];
        }
        
      }).catch(()=>{
        this.tableData= [];
      }).finally(()=>{
        this.tableLoading = false;
      })
    },

    formatStatus(row,column,value) {
      if(value==1) {
        return '申请中';
      } else if(value==2) {
        return '已通过';
      } else {
        return '未通过';
      }
    },

    onCellClick(row, column, cell, event) {
      console.log(column.label)
      if(column.label=='申请权限') {
        this.clickShowTree(row);
      }
    },

    handleSizeChange() {
      this.currentPage = 1;
      this.getAuthorityList();
    },

    handleCurrentChange() {
      this.getAuthorityList();
    }
  },
  mounted() {
    this.getAuthorityList();
  },
};
</script>

<style lang="scss">

.records-query .el-table_1_column_3 {
  position: relative;
}

.records-query .per-select {
  width:100%;
  height:100%;
  border:0px;
  .el-input__inner {
    border:0px;
    background:none;
  }
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


.records-query .el-table {
  tbody tr td {
    padding:0px;
    height:60px;

    .cell {
      width:100%;
      height:100%;
      line-height:60px;
      padding:0px;
    }
  }
}

.records-query  {
  display: flex;
  flex-direction: column;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 10px;
  width: 100%;
  min-height: 530px;

  .top {
    padding: 20px 0;
    .spaninfo {
      color: rgb(56, 56, 56);
      font-size: 14px;
    }
    .spaninforight {
      padding-left: 20px;
    }
  }
  .table {
    padding-top: 10px;
    flex-grow:2;  
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    padding: 20px 0;
    transform: translate(0.5%);
  }
  ::v-deep .el-button,
  .buttonshowmore,
  .el-button--text,
  .el-button--medium,
  .el-popover__reference {
    border: none;
    position: relative;
    height: 0;
    left: 290px;
  }
  ::v-deep.el-popover,
  .el-popper,
  .area_popper {
    left: 625px !important;
  }
}
</style>