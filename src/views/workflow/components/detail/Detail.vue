<template>
  <div v-loading="detailLoading" class="workflow-detail">
    <div class="descriptions_wrap">
      <!-- <div class="descriptions_item">
        <span>工单编号：</span>
        {{tableShow.identifier}}
      </div>
      <div class="descriptions_item">
        <span>工单标题：</span>
        {{tableShow.title}}
      </div>
      <div class="descriptions_item">
        <span>工单类型：</span>
        {{tableShow.identyTypeTrans}}
      </div>
      <div class="descriptions_item">
        <span>工单子类型：</span>
        {{tableShow.identySubtypeTrans}}
      </div>
      <div class="descriptions_item">
        <span>工单状态：</span>
        {{formatStatus('','',tableShow.identyStatus)}}
      </div>
      <div class="descriptions_item">
        <span>工单创建时间：</span>
        {{tableShow.creatTime}}
      </div> -->

      <template v-for="(item,idx) in detailInfoList">
        <div :key="idx"
        class="descriptions_item" 
        v-if="item.name.indexOf('附件')==-1 && item.name.indexOf('内容')==-1 && item.name.indexOf('描述')==-1 " >
          <span :style="{minWidth:(item.name.length+1)*15+'px'}" 
          style="display:inline-block; text-align:left">{{item.name}}：</span>
          {{(item.value&&item.value!='null')||item.value==0 ? item.value : '-'}}
        </div>

        <div :key="idx"
        class="descriptions_item" 
        style="width:100%; display:flex; " 
        v-else-if="item.name.indexOf('附件')>=0">
          <span :style="{minWidth:(item.name.length+1)*15+'px'}"
           style="display:inline-block; text-align:left">{{item.name}}：</span>

          <div style="display:flex; flex-direction:column;">
            <a target="_blank"  
            class="file-download" 
            v-for="(it,idx) in item.value" 
            :href="downloadUrlFile +`?fileName=${encodeURIComponent(it.systemFileName)}&code=${data.originUnit=='240'?2:1}`"
            style="margin-right:20px;">{{ it.originFileName?it.originFileName:'-' }}；</a>
          </div>
        </div>

        <div :key="idx"
        class="descriptions_item" 
        style="width:100%;" 
        v-else-if="item.name.indexOf('内容')>=0 || item.name.indexOf('描述')>=0 ">
          <span :style="{minWidth:(item.name.length+1)*15+'px'}"
           style="display:inline-block; text-align:left">{{item.name}}：</span>
          {{(item.value&&item.value!='null')||item.value==0 ? item.value : '-'}}
        </div>
      </template>
        <!-- <div class="descriptions_item">
        <span>集团推送信息：</span>
         <el-tag
            size="small"
            style="cursor: pointer"
            @click="openDialog"
            type="warning"
            >打开
          </el-tag>
      </div> -->
      <!-- <el-descriptions  -->
      
      
          <!-- > -->
         <!-- <el-descriptions-item label="工单编号"
          >
          {{ tableShow.identifier }}
        </el-descriptions-item>
         <el-descriptions-item label="工单标题"
          >
          {{ tableShow.title }}
        </el-descriptions-item>
        <el-descriptions-item label="工单类型"
          >
          {{ tableShow.identyTypeTrans }}
        </el-descriptions-item>
        <el-descriptions-item label="工单子类型"
          >
          {{ tableShow.identySubtypeTrans }}
        </el-descriptions-item>
         <el-descriptions-item label="工单扩建时间"
          >
          {{ tableShow.identySubtypeTrans }}
        </el-descriptions-item> -->
        <!-- <el-descriptions-item
          v-for="item of detailForm"
          :key="item.id"
          :label="item.name"
        >
          <component
            :is="`detailItem_${item.type}`"
            :info="tableShow.processVariables[item.id]"
            :form="item"
          ></component>
        </el-descriptions-item> -->
        <!-- <el-descriptions-item label="是否展示流程图">
          <el-tag
            style="cursor: zoom-in"
            size="small"
            @click.native="getImgUrl(tableShow.processInstanceId)"
            v-if="!imgflag"
            type="warning"
            >展示
          </el-tag>
          <el-tag
            size="small"
            @click.native="imgflag = false"
            v-if="imgflag"
            style="cursor: zoom-out"
            >隐藏
          </el-tag>
        </el-descriptions-item> -->
        <!-- <el-descriptions-item
          label="集团推送信息"
          v-if="
            $route.name !== 'abeyance' && tableShow.processVariables.type == '1'
          "
        >
          <el-tag
            size="small"
            style="cursor: pointer"
            @click="openDialog"
            type="warning"
            >打开
          </el-tag>
        </el-descriptions-item> -->
      <!-- </el-descriptions> -->
       
       <!-- <div style="display:flex; justify-content:center;">
          <img v-if="imgflag" :src="imgdata"/>
       </div> -->
     
    </div>
    <el-table
      :header-cell-style="{
        background: '#f9f9f9',
        color: '#606266',
        fontWeight: '500',
      }"
      :data="tableShow.taskHistory"
      height="370"
      style="width: 100%; overflow-x: hidden; overflow-y: auto"
      row-key="id"
    >
       <!-- @expand-change="loadTaskDetail" -->
      <!-- <el-table-column type="expand">
        <template slot-scope="scope" v-if="scope.row.detail">
          <el-card v-for="(item, index) of scope.row.detail" :key="index">
            <div v-for="(it, index) of item.childs" :key="index">
              <span v-if="it.type === 'comment'"
                >处理意见： {{ it.message }}
              </span>
              <span v-if="it.type === 'file'"
                >附件：
                <a
                  target="_blank"
                  :href="
                    downloadUrlWork +
                    `?attachmentId=${it.id}&fileName=${encodeURIComponent(
                      it.name
                    )}`
                  "
                  >{{ it.name }}</a
                >
              </span>
              <span v-if="it.type === 'system'"
                >日志:{{ it.fullMessage }}
              </span>
            </div>
            <p style="text-align: right">
              {{ item.userId | assignee }} 提交于 {{ item.time }}
            </p>
          </el-card>

          <div v-if="scope.row.detail.length === 0">
            <p style="text-align: center">暂无处理数据</p>
          </div>
        </template>
      </el-table-column> -->

      <el-table-column
        prop="no"
        label="处理编号"
        width="200"
      ></el-table-column>
      <el-table-column prop="handler" label="处理人" width="auto">
        <template slot-scope="scope">
          {{ scope.row.handler }}
        </template>
      </el-table-column>
       <el-table-column prop="handler" label="部门" width="auto">
        <template slot-scope="scope">
          {{ scope.row.handingDepartment }}
        </template>
      </el-table-column>

      <el-table-column label="处理时间" width="160">
        <template slot-scope="scope">
          {{ scope.row.handingTime }}
        </template>
      </el-table-column>

      <el-table-column label="处理意见" width="auto">
        <template slot-scope="scope">
          {{ scope.row.handingOpinions }}
        </template>
      </el-table-column>
       <el-table-column label="处理人联系方式" width="auto">
        <template slot-scope="scope">
          {{ scope.row.handlerContactInfor }}
        </template>
      </el-table-column>
      

      <el-table-column label="附件" width="180">
        <template slot-scope="scope"  >
          <div 
          style="width:100%; display:flex; flex-direction:column;" 
          v-if="scope.row.uploadFileInfoList && scope.row.uploadFileInfoList.length && scope.row.uploadFileInfoList.toString()!='null'">
            <span>
              <a target="_blank"  
              class="file-download" 
              v-for="(it,idx) in scope.row.uploadFileInfoList" 
              :href="downloadUrlFile +`?fileName=${encodeURIComponent(it.systemFileName)}&code=3`"
              style="width:100%; display:block;">{{ it.originFileName?it.originFileName:'-' }}；</a>
            </span>
            
          </div>
          <div v-else>无</div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 再处理信息 -->
    <!-- <el-divider></el-divider> -->
    <!-- <template>
      <div class="el-descriptions__header">
        <div
          class="el-descriptions__title"
          style="color: #303133; margin: 16px 0 0 0px"
        >
          集团通知
        </div>
      </div>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        :header-cell-style="{
          background: '#f9f9f9',
          color: '#606266',
          fontWeight: '500',
        }"
        :data="handleInfos"
        height="200"
        style="
          width: 100%;
          overflow-x: hidden;
          overflow-y: auto;
          margin-top: 16px;
        "
        row-key="id"
      >
        <el-table-column
          prop="stateCode"
          label="操作节点"
          width="200"
        ></el-table-column>
        <el-table-column label="处理意见" width="auto">
          <template slot-scope="scope">
            {{ scope.row.handlingOpinion }}
          </template>
        </el-table-column>
        <el-table-column label="处理时间" width="auto">
          <template slot-scope="scope">
            {{
              scope.row.handingTime
                ? new Date(scope.row.handingTime)
                : null | dateFormat("yyyy/MM/dd HH:mm:ss")
            }}
          </template>
        </el-table-column>
      </el-table>
    </template> -->

    <!-- 集团推送信息 -->
    <el-dialog
    title="推送信息"
    :visible.sync="dialogVisible"
    :append-to-body="true"
    center
    v-if="replyInfo!=null"
    width="80%">
      <div class="descriptions_wrap" v-for="(item,idx) in replyInfo" style="border-bottom: 1px solid #eee;">
        <div class="descriptions_item">
          <span>处理时间：</span>
          {{item.handingTime}}
        </div>
        <div class="descriptions_item">
          <span>处理人：</span>
          {{item.handler}}
        </div>
        <div class="descriptions_item">
          <span>手机号：</span>
          {{item.handlerInfor}}
        </div>
        <div class="descriptions_item">
          <span>职级：</span>
          {{item.handlerRank}}
        </div>
        <div class="descriptions_item">
          <span>部门：</span>
          {{item.handingDepartment}}
        </div>
        <div class="descriptions_item">
          <span>意见：</span>
          {{item.handlingOpinion}}
        </div>
        <div class="descriptions_item" style="flex-wrap:wrap;" v-if="item.attachList && item.attachList.toString()!='null'">
          <span style="min-width:44px;">附件：</span>
          <a target="_blank"  
          class="file-download" 
          v-for="(it,idx) in item.attachList.split('|')" 
          :href="downloadUrlFile +`?fileName=${encodeURIComponent(it)}`"
          style="margin-right:20px;">{{ it }}；</a>
        </div>
        <div class="descriptions_item" style="flex-wrap:wrap;" v-else>
          <span style="min-width:44px;">附件：无</span>
        </div>
        <!-- <div class="descriptions_item">
          <span>回复信息：</span>
          {{item.ReplyMsg}}
        </div> -->
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false" class="subButton">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable camelcase */
// import modules from '@/components/dynamic/detail.js';
import {TaskListDetail,downloadFile} from '@/api/workflow/index.js'
export default {
  name: 'Detail',
  props: {
    f5: Boolean,
    data: Object,
    formatStatus:Function
  },
  // components: modules,
  data() {
    return {
      // 再处理数据
      handleInfos: [],
      loading: false,
      downloadUrlWork: `${process.env.VUE_APP_BASE_API}/workflow/attachment`,
      downloadUrlCommon: `${process.env.VUE_APP_BASE_API}/identyCommon/downAttachList`,
      downloadUrlReply: `${process.env.VUE_APP_BASE_API}/identyCommon/downReplyAttachList`,
      downloadUrlFile: `${process.env.VUE_APP_BASE_API}/Sound/download`,
      // 是否展示流程图
      imgflag: false,
      // 详情数据
      tableShow: this.data,
      imgdata: '',
      dialogVisible: false,
      // 集团信息
      replyInfo: null,
      detailfields: null,
      detailInfoList:[],
      detailLoading:false
    };
  },
  watch: {
    f5(val) {
      if (val) {
        this.showData();
      }
    },
  },
  computed: {
    detailForm() {
      const orderData =
        this.detailfields === null
          ? []
          : this.detailfields.filter(
            (item) =>
              item.params.showType === '2' || item.params.showType === '0'
          );
      orderData.sort((a, b) => a.params.order - b.params.order);
      return orderData;
    },
  },
  created() {
    
  },
  mounted() {
    this.showData();
    // this.getIdentyReply();
  },
  methods: {
    downloadFile(fileName) {
      downloadFile({
        fileName
      })
    },


    openDialog() {
      if ( !this.replyInfo || this.replyInfo.length === 0 ) {
        this.$message.info('没有数据');
      } else {
        this.dialogVisible = true;
      }
    },
    getIdentyReply() {
      queryIdentyReply({
        identifier: this.tableShow.processVariables.identifier,
        identyState: this.tableShow.processVariables.identyState,
      }).then((res) => res && (this.replyInfo = res.data));
    },
    loadTaskDetail(rowData) {
      console.log(this.tableShow);
      if (rowData.detail) {
        return;
      }

      getTaskDetail({taskId: rowData.id}).then((v) => {
        console.log('-----详细', v.data);
        const arr = [
          ...v.data.attachments,
          ...v.data.comments,
          ...v.data.systemComments,
        ];
        // console.log('扁平化', arr);
        // if(arr.length !== 0) {
        //   arr.sort((a,b) => new Date(a.time).getTime() - new Date(b.time).getTime());
        //   console.log('排序后',arr);
        // }
        // 按照时间分类数据
        const arrs = [];
        arr.forEach((item) => {
          const parent = arrs.find(
            (cur) =>
              dateFormat(new Date(cur.time), 'yyyy/MM/dd HH:mm') ===
              dateFormat(new Date(item.time), 'yyyy/MM/dd HH:mm')
          );
          if (parent) {
            parent.childs.push(item);
          } else {
            const obj = {
              time: dateFormat(new Date(item.time), 'yyyy/MM/dd HH:mm'),
              userId: item.userId,
              childs: [item],
            };
            arrs.push(obj);
          }
        });
        console.log('分类后', arrs);
        // this.$set(rowData, 'detail', v.data);
        this.$set(rowData, 'detail', arrs);
      });
    },
    getImgUrl(processInstanceId) {
      this.imgflag = true;
      getImg({processInstanceId}).then((res) => {
        this.imgdata = window.URL.createObjectURL(res);
      });
    },
    showData() {
      // this.loading = true;
      this.detailLoading = true;
      TaskListDetail(
        // {
        //   currentPage: 0,
        //   pageSize: 100,
        // },
        {
          identifier: this.tableShow.identifier,
  
          // identyType:this.tableShow.identyType,
          // identySubtype:this.tableShow.identySubtype,
          // processDefinitionKey: null,
          // processVariables: {},
          // /**
          //  * 如果是管理员这个参数才生效，表示显示所有人的
          //  */
          // showAll: true,
          // taskStatus: 'NONE',
          // taskVariables: {},
          // variableNames: null,
        }
      )
        .then((v) => {
          this.$set(this.tableShow, 'taskHistory', v.obj.oaApplyInfoList);
          const groupNoticeList = v.obj.groupNoticeList; 
          for(var i=0; i<groupNoticeList.length; i++) {
            if(groupNoticeList[i].toString()=='null') {
              groupNoticeList.splice(0,i);
            }
          }
          this.replyInfo = v.obj.groupNoticeList;
          this.detailInfoList = v.obj.detailInfoList;
          // const [confirmdata] = v.data.list.filter(
          //   (item) =>
          //     item.assignee === sessionStorage.getItem('userName') &&
          //     item.endTime === null
          // );
          // console.log('返回的确认值',confirmdata);
          // this.$emit('putconfirm', confirmdata);
        })
        .catch(() => {
        })
        .finally(()=>{
          this.detailLoading = false;
        })
    },
  },
};
</script>

<style></style>
<style lang="scss">
.workflow-detail {
  .file-download {
    width: auto;
  }
  .file-download:hover {
    color:#ff9900;
    margin-right: 20px;
  }

  /* 展开文字左对齐 */
  .el-table td.el-table__cell div {
    text-align: left;
  }
  ::v-deep.el-table {
    overflow: scroll;
    flex: auto;
    height: 400px;
    border: 1px solid #e1e1e1;
  }

  ::v-deep.el-table td,
  .el-table th.is-leaf,
  .el-table--border,
  .el-table--group {
    background-color: #ffffff 100%;
  }

  ::v-deep.el-table tbody tr:hover > td {
    background-color: #f6e3c6 !important;
  }

  ::v-deep.el-table td.el-table__cell,
  .el-table th.el-table__cell.is-leaf {
    border-bottom: 1px solid #e1e1e1;
    line-height: 40px;
    padding: 0px;
    box-sizing: border-box;
  }

  .subButton {
    height: 32px;
    line-height: 32px;
    background-color: rgba(247, 138, 28, 1);
    padding: 0px 16px;
    border-radius: 4px;
    color: #262626;
    border: 1px solid rgba(247, 138, 28, 1);
    box-sizing: border-box;
  }

  .descriptions-content {
    width: 100%;
    /* min-width: 550px; */
    max-height: 400px;
    overflow: auto;
  }

  .margin-top {
    margin-top: 10px;
  }
  .handle_style {
    padding: 0px;
    width: 100%;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between !important;
  }


  .descriptions_wrap {
     width: 100%;
     display: flex;
     justify-content: flex-start;
     flex-wrap: wrap;
     align-content: center;
     .descriptions_item {
         display: flex;
         min-width: 30%;
         margin: 8px; 
         text-align: left;
     }

  }
   .v-modal {
      top: 0px ;
  }
}

</style>
