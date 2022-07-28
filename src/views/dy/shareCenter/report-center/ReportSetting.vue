<template>
  <div class="dy-page-wrap reprot-setting">
    <img src="@/assets/images/banner-mini.png" style="width:100%;" />
    <div class="dy-container">
      <NumberTitle num="01" text="DTS用户菜单授权" />
      <div style="width:100%; display:flex; margin-top:20px;">
        <div style="width:300px;padding:0 20px 20px 20px; background: #fff;">
          <h3 class="title-h3" style=" margin:14px 0px;">用户分组列表</h3> 
          <el-tree
            :data="nodes"
            node-key='label' 
            show-checkbox
            ref="groupTree"
            @node-click="onGroupClick">
          </el-tree>
        </div>

        <div style="width: 200px; flex-grow:2; margin-left:20px; background: #fff;padding:0 20px 20px 20px;">
          <h3 class="title-h3" style=" margin:14px 0px;">报表列表</h3> 
          <el-tree 
          :data="tableData" 
          show-checkbox
          ref="typeTree"
          node-key='id' 
          :props="{label:'name',children:'statement'}" 
          :default-expand-all="true"></el-tree>
        </div>
      </div>

      <div style="width:100%; margin-top:20px; display:flex; justify-content:flex-end;">
        <el-button class="btn" type="primary" @click="onSave">保存</el-button>
        <el-button  class="btn" type="info" @click="onclear">清空</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Blank from '@/components/common/Blank';
  import NumberTitle from "@/components/common/numberTitle";
  import { getGroupList,getReportTypeList,getGroupReportType,batchInsertReport } from "@/api/dy/report.js";

  export default {
    name: "ReportSetting",
    components:{
      NumberTitle,
      Blank
    },
    data() {
      return {
        nodes:[
          /*{
            label:'全选',
          },{
            label:'用户分组1',
          },{
            label:'用户分组2',
          },{
            label:'用户分组3',
          },{
            label:'用户分组4',
          },{
            label:'用户分组5',
          }*/
        ],

        tableData:[
          /*{
              "id": "1",
              "name": "测试报表一",
              "parentId": 0,
              "remark": null,
              "statement": [
                  {
                      "id": "1",
                      "statementMenuId": "1",
                      "name": "测试数据1"
                  },
                  {
                      "id": "2",
                      "statementMenuId": "1",
                      "name": "测试数据2"
                  }
              ]
          }*/
        ],


      };
    },
    methods: {
      handleCheckChange(val) {
      },

      onRowSelected(selection, row) {
        row.selected = !row.selected;
        if(row.children) {
          row.children.forEach(item=>{
            this.$refs.table.toggleRowSelection(item,row.selected);    
          })
        }
      },

      // 获取用户分组
      getGroupList() {
        getGroupList().then(res=>{
          this.nodes = res.data.map(data=>{
            return {
              label: data
            }
          });
        });
      },

      // 获取列表类型
      getReportTypeList() {
        getReportTypeList().then(res=>{
          res.data.forEach(item=>{
            item.name = item.menuName;
            item.statement.forEach(statement=>{
              statement.name = statement.statementName
            })
          });

          this.tableData = res.data;
        });;
      },

      // 根据用户名称获取报表配置
      getGroupReportType(dtsUserGroupName) {
        getGroupReportType({dtsUserGroupName}).then(res=>{
          if(res.success && res.data) {
            const ids = res.data.map(data=>{
              return data.statementId;
            })
            this.$refs.typeTree.setCheckedKeys(ids);
          } else {
            this.$refs.typeTree.setCheckedKeys([]);
          }
        });
      },

      onSave() {
        const checkedGroup = this.$refs.groupTree.getCheckedNodes();
        const checkedType = this.$refs.typeTree.getCheckedNodes().filter(node=>{
          return node.statementName;
        });
        if(checkedGroup.length==0) {
          this.$message.warning('请选择用户分组');
          return;
        }

        if(checkedType.length==0) {
          this.$message.warning('请选择报表');
          return;
        }

        this.$confirm('此操作将覆盖所选DTS用户菜单授权?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.batchInsertReport(checkedGroup,checkedType);
        }).catch(() => {});
      },


      // 保存配置
      batchInsertReport(checkedGroup,checkedType) {

        const userStatement = checkedGroup.map(group=>{
          return {
            "dtsUserGroupName": group.label,
            "statement": checkedType
          }
        });

        batchInsertReport({userStatement}).then(res=>{
          this.$message({
            type:res.success?'success':'error',
            message:res.msg
          })

          this.$refs.typeTree.setCheckedKeys([]);
        }).catch(err=>{
          this.$message({
            type:'error',
            message:'修改失败'
          })
        });
      },

      onGroupClick(data) {
        this.getGroupReportType(data.label);
      },

      onclear(){
        this.$refs.typeTree.setCheckedKeys([]);
        this.$refs.groupTree.setCheckedKeys([]);
      }

      /*objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          return {
            rowspan:row.rowspan,
            colspan: 1
          };
        }
      }*/
    },

    mounted() {
      this.getGroupList();
      this.getReportTypeList();
    }
  };
</script>

<style lang="scss">
  .reprot-setting {

    .el-table th > .cell {
      padding-left: 14px;
      padding-right: 14px;
    }

    .el-table--border th:first-child .cell, .el-table--border td:first-child .cell {
      padding-left: 14px;
    }

    .el-tree-node__content {
      height:40px;
    }
  }
  
</style>

