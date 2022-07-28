<template>
<!-- 报表列表 -->
  <div class="dy-page-wrap" style="display:flex; flex-direction:column">
    <div class="dy-container" style="flex-grow:2;padding-top:0px;">
      <div class="report-title">报表列表</div>
      <div class="report-content">
        <div class="report-menu">
          <el-input
            placeholder="请输入你想要搜索的报表"
            suffix-icon="el-icon-search"
            v-model="searchInfo"
            @change="inputSearch"
            clearable
          >
          </el-input>
          <el-tree
            :data="sideBarList"
            :props="defaultProps"
            @current-change="treeSelect"
            highlight-current
            node-key="id"
            ref="tree"
          ></el-tree>
        </div>
        <div class="report-container">
          <div class="container-title">{{ tableTitle?tableTitle:'' }}</div>
          <Blank v-if="stateDataList.length === 0"></Blank>
          <div class="container-content" v-else>
            <div
              class="content-content"
              v-for="(item, index) in stateDataList"
              :key="index"
            >
              <img :src="imgData.icon" />
              <span @click="goPath(item)">
                {{ item.statementName }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getReportList, postReportList } from "@/api/dy/report.js";
import { getToken } from "@/api/login";
import Blank from "@/components/common/Blank";
export default {
  components: {
    Blank
  },
  created() {
    this.getMenu();
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "menuName",
      },
      tempData: {
        name: "客户投诉量",
        icon: "el-icon-platform-eleme",
      },
      imgData: {
        icon: require("@/assets/images/icon.png")
      },
      stateDataList: [],
      searchInfo: "",
      sideBarList: [],
      tableTitle: "",
    };
  },
  methods: {
    // 点击菜单查询数据
    treeSelect(data) {
      this.tableTitle = data.menuName;
      this.searchInfo = '';
      postReportList(
        { menuId: data.id },
        "statementDetailList/statementListByUser"
      ).then((res) => {
        if (!res.success) {
          return this.$message.error(res.msg);
        } else {
          this.stateDataList = res.data;
        }
      });
    },
    //输入框查询数据
    inputSearch() {
      this.tableTitle = "报表搜索结果如下";
      postReportList(
        { statementName: this.searchInfo },
        "statementDetailList/searchStatementList"
      ).then((res) => {
        if (!res.success) {
          return this.$message.error(res.msg);
        } else {
          this.stateDataList = res.data;
        }
      });
    },
    //点击菜单跳转路由
    goPath(item) {
      //点击发送报表日志接口
      postReportList({ statementId: item.id }, "statementLogUser/statementLog");
      // 查询列表接口
      if (item.statementUrl) {
        getToken().then((res) => {
          if (res.status === 200) {
            window.open(`${item.statementUrl}&token=${res.data}`);
          } else {
            this.$message.error(res.message);
          }
        });
      } else {
        this.$message.error("url为空");
      }
    },
    getMenu() {
      getReportList("statement/menu").then((res) => {
        if (!res.success) {
          return this.$message.error(res.msg);
        } else {
          this.sideBarList = res.data;
          if (this.sideBarList.length) {
            this.getTreeData(this.sideBarList[0]);
          }
        }
      });
    },
    //递归去找第一层id
    getTreeData(item) {
      if (item.children) {
        if (item.children[0].children) {
          return this.getTreeData(item.children[0].children[0]);
        }
      }
      this.treeSelect(item);
      // this.$nextTick(() => {
      //   this.$refs.tree.setCurrentKey(item.id);
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.report-title {
    font-size: 30px;
    font-weight: 400;
    color: #262626;
    line-height: 38px;
    margin: 19px 0 12px;
  }
  .report-content {
    display: flex;
    justify-content: space-between;
    .report-menu {
      width: 327px;
      box-sizing: border-box;
      padding: 25px 25px 220px 25px;
      background: #fff;
      box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.01);
      .el-tree {
        color: #4d4d4d;
        margin-top: 10px;
        ::v-deep.el-tree-node__label {
          line-height: 36px;
        }
        ::v-deep .el-tree-node:focus > .el-tree-node__content {
          background-color: #ffebcc !important;
        }
        ::v-deep.el-tree-node__content:hover {
          background-color: #f5f5f5;
        }

        ::v-deep.el-tree-node__expand-icon.expanded {
          -webkit-transform: rotate(0deg) !important;
          transform: rotate(0deg) !important;
        }
        ::v-deep.el-icon-caret-right:before {
          // 加号图片
          content: url("~@/assets/images/plus.png") !important;
          font-size: 16px !important;
        }
        ::v-deep.expanded:before {
          // 减号图片
          content: url("~@/assets/images/sub.png") !important;
          font-size: 16px !important;
        }
        ::v-deep.is-leaf.el-tree-node__expand-icon.el-icon-caret-right:before {
          content: "" !important;
          font-size: 16px !important;
        }
        // 将左边文字对齐
        ::v-deep.is-leaf.el-tree-node__expand-icon.el-icon-caret-right {
          width: 28px !important;
        }
      }
    }
    .report-container {
      box-sizing: border-box;
      margin-left:20px;
      padding: 10px;
      width: 1130px;
      box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.01);
      flex-grow:2;
      background: #fff;
      .container-title {
        font-size: 20px;
        font-weight: 500;
        color: #262626;
        line-height: 32px;
        padding-left: 23px;
        margin-bottom: 2px;
      }
      .container-content {
        display: flex;
        flex-wrap: wrap;
        font-size: 14px;
        .content-content {
          text-align: center;
          line-height: 42px;
          display: flex;
          align-items: center;
          cursor:pointer;
          &:hover {
            background-color: #f5f5f5;
          }
          img {
            width: 18px;
            height: 21px;
            margin: 0 11px 0 21px;
          }
        }
      }
    }
  }
</style>
<style lang='scss' scope>
/* 更改默认选中树节点样式 */
v-deep .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #ffebcc !important;
}
</style>