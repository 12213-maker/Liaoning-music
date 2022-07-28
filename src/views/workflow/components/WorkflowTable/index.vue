<template>
  <div style="width:100%; padding:36px; box-sizing:border-box; padding-top:0px;" class="workflow">
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="6">
          <span class="span-gap" style="width:70px;min-width:70px;">工单编号：</span>
          <el-input
            style='flex-grow:2;min-width:100px;'
            v-model="searchVariables.identifier"
            placeholder="请输入工单编号"
            clearable
            size="small"
          ></el-input>
        </el-col>

        <el-col :span="6">
          <span class="span-gap" style="width:70px;min-width:70px;">工单标题：</span>
          <el-input
            style='flex-grow:2;min-width:100px;'
            v-model="searchVariables.title"
            placeholder="请输入工单标题"
            clearable
            size="small"
          ></el-input> 
        </el-col>

        <el-col :span="6" v-if="originId=='1'">
          <span class="span-gap" style="width:70px;min-width:70px;">工单类型：</span>
          <el-select
            style='flex-grow:2;min-width:100px;'
            v-model="searchVariables.identyType"
            placeholder="请选择工单类型"
            size="small"
            @change="onIdentyTypeChange"
            :clearable="true"
          >
            <el-option
              v-for="item in identyTypeData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>

        <el-col :span="6" v-else>
          <span class="span-gap" style="width:70px;min-width:70px;">工单类型：</span>
          <el-select
            style='flex-grow:2;min-width:100px;'
            v-model="searchVariables.identyType"
            placeholder="请选择工单类型"
            size="small"
            @change="onIdentyTypeChange"
            :clearable="true"
          >
            <el-option
              v-for="item in identyTypeInsertData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>

        <el-col :span="6">
          <span class="span-gap" style="width:84px">工单子类型：</span>
          <el-select
            style='flex-grow:2;min-width:100px;'
            v-model="searchVariables.identySubtype"
            placeholder="请选择工单子类型"
            size="small"
            :clearable="true"
          >
            <template v-for="item in identySubtypeData">
              <el-option
                v-show="item.value!=='240'"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </template>
          </el-select>
        </el-col>
      </el-row>


      <el-row :gutter="20" style="margin-bottom:10px;">
        <el-col :span="6">
          <span class="span-gap" style="width:70px;min-width:70px;">工单状态：</span>
          <el-select
            style='flex-grow:2;min-width:100px;'
            v-model="searchVariables.state"
            placeholder="请选择工单状态"
            size="small"
            :clearable="true"
          >
            <el-option
              v-for="item in identyState"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>

        <el-col :span="6" v-if="originId=='1'">
          <span class="span-gap" style="width:70px;min-width:70px;">工单来源：</span>
          <el-select 
          v-model="searchVariables.originUnit" 
          style='flex-grow:2;min-width:100px;'
          filterable 
          placeholder="请选择" 
          clearable size="small">
            <el-option
              v-for="item in originUnitTransOpt"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="6">
          <el-button size="small" type="primary" @click="inquiryFlag" >查询</el-button>
          <!-- <el-button size="small"  type="primary" @click="addInfo">新增</el-button> -->
        </el-col>

      </el-row>

      <div class="orderclass">
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中..."
          :header-cell-style="{
            background: '#f9f9f9',
            color: '#606266',
            fontWeight: '500',
          }"
          :data="tableData"
          style="width: 100%; height: 100%; flex-grow: 2; overflow: hidden"
        >
          <div slot="empty" style="width:100%; height:500px; display:flex; align-items:center; justify-content:center;">
            暂无数据
          </div>
          <el-table-column
            prop="identifier"
            label="工单编号"
            align="center"
            width="auto"
            min-width="120px" 
          >
          </el-table-column>
           <el-table-column
            prop="title"
            label="工单标题"
            align="center"
            show-overflow-tooltip
            width="auto"
            min-width="120px"
          ></el-table-column>
           <el-table-column
            prop="identyTypeTrans"
            label="工单类型"
            width="100"
            align="center"
            min-width="auto"
          >
          </el-table-column>
          <el-table-column
            prop="identySubtypeTrans"
            label="工单子类型"
            align="center"
            width="190"
            min-width="auto"
          >
            <!-- <template slot-scope="scope">
              {{ scope.row.identySubtype | identySubtypeCode }}
            </template> -->
          </el-table-column>


         
          <el-table-column
            prop="creatTime"
            label="创建时间"
            align="center"
            width="100"
          >
            <!-- <template slot-scope="scope">
              {{ scope.row.processVariables.creatTime | DataFormat }}
            </template> -->
          </el-table-column>
          <el-table-column
            prop="processTime"
            label="处理时限"
            align="center"
            width="160"
          >
            <template slot-scope="scope">
              <span 
              :style="{color:formatterTimeColor(scope.row)}">
                {{scope.row.processTime}}
              </span>
            </template>             
          </el-table-column>
          <el-table-column
            prop="originUnitTrans"
            label="工单来源"
            align="center"
            width="auto"
          >
          </el-table-column>

          <el-table-column label="工单接收方" width="90" align="center">
            <template slot-scope="scope">
              {{ scope.row.receiverUnitTrans?scope.row.receiverUnitTrans:'-' }}
            </template>
          </el-table-column>

          <el-table-column
            prop="identyStatus"
            label="工单状态"
            align="center"
            width="80"
            :formatter="formatStatus"
          >
           
          </el-table-column>

          <el-table-column prop="auditorName" label="接口人" align="center" width="80" v-if="originId=='1'">
            <template slot-scope="scope">
              {{ scope.row.auditorName?scope.row.auditorName:'-' }}
            </template>
          </el-table-column>

          <el-table-column prop="auditor" label="当前待办人" align="center" width="90" >
            <template slot-scope="scope">
              {{ scope.row.userDisplayName?scope.row.userDisplayName:'-' }}
            </template>
          </el-table-column>

          <el-table-column
            style="border-right: 1px"
            prop="date"
            label="操作"
            align="center"
            width="160"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                style="
                  font-size: 14px;
                  font-family: SourceHanSansSC-Regular;
                  color: #ff9900;
                "
                size="mini"
                @click="showDetail(scope.row)"
                >详情
              </el-button>

              <el-button
                v-if="scope.row.canFiled=='1'"
                type="text"
                size="mini"
                @click="handle(scope.row)"
                style="
                  margin-left: 16px;
                  font-size: 14px;
                  font-family: SourceHanSansSC-Regular;
                  color: #ff9900;
                "
                >归档
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="
            margin-top: 20px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
          "
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!-- 催单详情 -->
    <!-- <Urge :dialogVisible.sync="isOpenUrge" :UrgeID="this.urgeId"> </Urge> -->


    <!-- 受理弹出框-->
    <!-- <Acceptance
      :dialogVisible.sync="isVisible"
      :acceptData="replay"
      @refresh-data="refresh = $event"
    ></Acceptance> -->


    <!--详情弹出框 -->
    <el-dialog
      title="详情"
      center
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      width="1300px"
      top="10vh"
      :append-to-body='true'
    >
      <Detail
      :formatStatus="formatStatus"
        :data="tableDetail"
      ></Detail>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" class="subButton"
          >关 闭</el-button
        >
        <!-- <el-button @click="handlePut" class="subButton" v-if="isShow && taskvalue == 'backlog'"
          >受 理</el-button
        > -->
      </span>
    </el-dialog>

    <el-dialog
    title="归档"
    center
    :visible.sync="gdDialogVisible"
    width="400px"
    top="200px"
    :append-to-body='true'>
      <el-form ref="form" :model="gdForm" label-width="120px" size="mini">
        <el-form-item label="归档意见">
          <el-select v-model="gdForm.filingOpinion" placeholder="请选择">
            <el-option
              v-for="item in opnionOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="异常原因" v-if="gdForm.identySubtype=='0007'">
          <el-input type="textarea" v-model="gdForm.reason"></el-input>
        </el-form-item>

        <el-form-item label="问题是否解决" v-if="gdForm.identySubtype=='0302'">
          <el-select v-model="gdForm.isSolved" placeholder="请选择">
            <el-option label="是" value="0"></el-option>
            <el-option label="否" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="处理结果评价" v-if="gdForm.identySubtype=='0302'">
          <el-rate
          style="margin-top:4px;" 
          v-model="gdForm.resultEvaluation" 
          show-text 
          :texts="['不满意','不满意','不满意','满意','满意']"> </el-rate>
        </el-form-item>

        <el-form-item label="效果评估结果" v-if="gdForm.identySubtype=='0206'">
          <el-select v-model="gdForm.effectResults" placeholder="请选择">
            <el-option label="已完成" value="0"></el-option>
            <el-option label="未完成" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="效果评估内容" v-if="gdForm.identySubtype=='0206'">
          <el-input type="textarea" v-model="gdForm.effectContent"></el-input>
        </el-form-item>

        <el-form-item label="进展评估结果" v-if="gdForm.identySubtype=='0206'">
          <el-select v-model="gdForm.evolveResults" placeholder="请选择">
            <el-option label="已完成" value="0"></el-option>
            <el-option label="未完成" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="进展评估原因" v-if="gdForm.identySubtype=='0206'">
          <el-input type="textarea" v-model="gdForm.evolveReason"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancelGd" size="small">取 消</el-button>
        <el-button type="primary" @click="onGdSubmit"  size="small" :loading="submitLoading">确 定</el-button>
      </span>

    </el-dialog>
  </div>
</template>
<script>
/* eslint-disable camelcase */
// import {
//   getTaskFormInfo,
//   TaskList,
//   getProcessId
// } from '@/api/workflow/index';
// import filter from '@/utils/filter.js';
// import Acceptance from '@/components/acceptance/index';
// import BpmnDialog from '@/components/bpmn/bpmnDialog/index';
import Detail from '../detail/Detail.vue';
import {TaskList, allCode, identyStatement,getOriginLists} from '@/api/workflow/index.js'
// import Urge from '@/components/urge/Urge.vue';
// import {dateFormat} from '@/utils/index.js';
export default {
  name: 'WorkflowTable', 
  components: {
    // Acceptance,
    // BpmnDialog,
    Detail,
    // Urge
  },
  props: {
    taskvalue: {
      type:String,
      default:() => 'backlog',
    }
 
  },
  watch:{
    $route() {
      this.originId = this.$route.params.id;
    },

    originId(val) {
      for(let item in this.searchVariables) {
        this.searchVariables[item] = '';
      }
      // if(val === '2') { this.searchVariables.originUnit = '240' }
      this.inquiryFlag();
    }
  },
  filters: {
    identySubtypeCode(val){
      let data = [];
      let code = '';
      sessionStorage.getItem('code') && JSON.parse(sessionStorage.getItem('code')).identityTypeForAll.forEach((item) => {
       data.push(...item.child)
      });
      data.forEach(item=> {
        if(item.value == val) {
          code = item.label;
        }
      })
      return code;
    }
  },
  data() {
    return {
      originId:'',
      identyData: null,
      // inputWidth: '236px',
      inputHight:'80px',
      // 时间选择
      timeValue:null,
      urgeId: '',
      // 流程图配置窗口
      isOpenBpmn:false,
      // 催办窗口
      isOpenUrge: false,
      // 受理窗口
      isVisible: false,
      replay: {},
      // 详情中处理的判断信息(工单下一步处理人发生改变时)
      getconfirmdata: null,
      // 判断刷新
      refresh: false,
      uploading: false,
      // 查询条件绑定变量
      searchVariables: {
        identifier: null,
        identySubtype: null,
        identyType: null,
        title: null,
        state: null,
        originUnit: null
      },
      // 真正查询参数
      searchForm:{
        identifier: null,
        identySubtype: null,
        identyType: null,
        title: null,
        state: null,
        originUnit: null
      },
      originUnitTransOpt:[],
      downloadUrl: `${process.env.VUE_APP_REQUEST_URL}/workflow/attachment`,
      // 返回的文件信息
      userid: null,
      loading: false,
      // 处理人员数据
      handleEmps: [],
      // 展示数据
      tableData: [],
      // 详情数据
      tableDetail: {},
      dialogVisible: false,
      total: 0,
      pagesize: 10,
      currentPage: 1,

      gdDialogVisible:false,
      gdForm:{
        identySubtype:'',
        identifier:'',
        launchCompany:'',
        forwardCompany:'',
        filingOpinion:'',

        reason:'',
        isSolved:'',
        resultEvaluation:'',

        effectContent:'',
        effectResults:0,
        evolveReason:'',
        evolveResults:0,

      },

      opnionOpt: [
        {
          label:'满意',
          value:'00'
        },{
          label:'一般',
          value:'01'
        },{
          label:'不满意',
          value:'02'
        }
      ],

      submitLoading:false
    };
  },
  computed: {
    inputWidth() {
      return '195px';
    },
    // 获取工单类型数据
    identyTypeData() {
      const data = this.identyData && this.identyData.identityTypeForAll.map((item) => ({
        'value': item.value,'label': item.label
      })) ;
      return  data;
    },

    identyTypeInsertData() {
      const data = this.identyData && this.identyData.identityTypeForInsert.map((item) => ({
        'value': item.value,'label': item.label
      })) ;
      return  data;
    },
    
    // 获取工单子类型数据
    identySubtypeData() {
      let data = [];
      if(this.originId=='1') {
        this.identyData && this.identyData.identityTypeForAll.forEach((item) => {
          if(this.searchVariables.identyType === item.value) {
            data = item.child;
          }
        });
      } else {
        this.identyData && this.identyData.identityTypeForInsert.forEach((item) => {
          if(this.searchVariables.identyType === item.value) {
            data = item.child;
          }
        });
      }
      return  data;
    },
    // 获取工单状态数据
    identyState() {
      try {
        return  this.identyData && this.identyData.identityStateList;
      } catch(err) {}
      
    },

    identyStatus() {
      try {
        var map = new Map();
        this.identyData.identityStateList.forEach((item)=>{
          map.set(item.value,item.label);
        })
        return map;
      } catch(err) {}
      
    }

    // isShow() {
    //   return this.getconfirmdata;
    // },
  },
  mounted() {
    
    this.originId = this.$route.params.id;
    
    // document.getElementsByClassName(
    //   'el-pagination__jump'
    // )[0].childNodes[0].nodeValue = '跳转';

    // 测试听音跳转
    /*setTimeout(()=>{
      this.$router.push('/add/03/0302/20220629GZL24000000174');
    },5000)*/
    
  },
  methods: {
    onIdentyTypeChange() {
      this.searchVariables.identySubtype = "";
    },

    formatStatus(row,column, cellval) {
      return this.identyStatus && this.identyStatus.get(cellval);
    },

    formatterTimeColor(row) {
      if(row.timeoutDay == '1' && row.identyStatus != '03' && row.identyStatus != '' && row.identyStatus.toString() != 'null') {
        return 'red';
      }
      return '#595959';
    },
    // 获取工单类型字典
    getAllCode() {
      allCode().then((data)=>{
        sessionStorage.setItem('code',JSON.stringify(data.obj));
        this.identyData = data.obj || {};
        this.originUnitTransOpt = data.obj.provinceCompany;
        this.inquiry();
      });
    },
    // 处理选择的日期 
    changeDate(date) {
      const endTime = `${date.substring(0,4)}-${date.substring(4,6)}-${date.substring(6,8)}`;
      const dd = new Date(endTime);
      dd.setDate(dd.getDate() + 1);
      return (dateFormat(dd,'yyyyMMdd000000'));
    },
    // 顶部查询
    inquiryFlag(str) {
      this.currentPage = 1;
      this.searchForm = JSON.parse(JSON.stringify(this.searchVariables));
      this.inquiry();
    },
    // 打开流程图配置
    openBpmn() {
      this.isOpenBpmn = true;

    },
    // 催办回调
    openUrgeTime(id) {
      this.isOpenUrge = true;
      this.urgeId = id;
    },
    // 待办工单查询回调
    async inquiry() {
      this.loading = true;
      try {
        const data = {
          ...this.searchForm,
          currentPage:this.currentPage, 
          pagesize: this.pagesize, 
          isGroupPage:this.originId==1?'1':'0' 
        }

        if(this.originId==2) {
          const arr = JSON.parse(sessionStorage.getItem('userInfo')).roles;
          const roleIds = arr.map((item)=>{
            return item.roleId;
          })
          data.roleId = roleIds;
        }

        const {obj} = await TaskList(data);
        console.log('列表数据',obj);
        this.tableData = obj.identyList || [];
        this.total = obj.total;
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
      
    },
    // 新增工单页面
    addInfo() {
      // var num = Math.random()*10;
      this.$router.push('/add');
    },
    // 详情 回调
    showDetail(row) {
        this.tableDetail = row;
        this.dialogVisible = true;
    },
    // 打开归档
    handle(row) {
      console.log(row);
      this.gdForm.identySubtype = row.identySubtype;
      this.gdForm.identifier = row.identifier;
      this.gdForm.launchCompany = row.originUnit;
      this.gdForm.forwardCompany = row.receiverUnit;
      this.gdDialogVisible = true;

      console.log('this.gdForm:',this.gdForm);
    },

    onGdSubmit() {
      this.submitLoading = true;
      const { identifier, launchCompany, forwardCompany, filingOpinion, reason, isSolved, resultEvaluation } = { ...this.gdForm };
      const data = {
        identifier,
        launchCompany,
        forwardCompany,
        filingOpinion,
        reason,
        isSolved,
        resultEvaluation
      }
      identyStatement(data).then(res=>{
        if(res.status=='200') {
          this.$message.success('工单已归档！');
          this.inquiry();
        } else {
          this.$message.warn('工单已归档失败！');
        }
      }).catch(err=>{
        this.$message.warn('工单已归档失败！');
      }).finally(()=>{
        this.gdDialogVisible = false;
        this.submitLoading = false;
        for(var item in this.gdForm) {
          this.gdForm[item] = "";
        }
      })
    },

    // 详情中处理,只是拿到了处理的id,失去了很多信息
    handlePut() {
      getTaskFormInfo({taskId: this.getconfirmdata.id}).then((v) => {
        const {data} = v;
        this.$set(this.replay, 'formInfo', data);
        this.$set(this.replay, 'id', this.getconfirmdata.id);
        this.isVisible = true;
        // console.log(this.replay);
      });
    },
    // 页码 和 当前页改变时回调
    handleSizeChange(val) {
      this.pagesize = val;
      this.inquiry();
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      this.inquiry();
    },

    onCancelGd() {
      for(var item in this.gdForm) {
        this.gdForm[item] = "";  
      }

      this.gdDialogVisible = false;
    },

    getOriginLists() {
      getOriginLists().then(res=>{
        console.log(res);
      })
    }
  },
  created() { 
    this.getAllCode();

    // this.inquiry();
    // if (window.name === '') {
    //   window.name = 'refresh';
    //   this.oaInquery();
    //   // 在首次进入页面时我们给window.name设置一个固定值
    // } else {
     
    // }
  },
};
</script>

<style scoped lang="scss">

.workflow {
  .el-col {
    height:44px;
    display: flex;
    align-items: center;
  }

  .el-form-item__label {
    font-size: 14px;
    font-family: syht;
  }
  .popper_style {
    border: 1px solid transparent !important;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04) !important;
  }
  .item {
    margin-top: 8px;
    margin-right: 10px;
    padding-right: 2px !important;
    cursor: pointer;
  }
  .mark {
    margin-right: 6px;
    display: inline-block;
    width: 8px;
    height: 8px;
    /* border: 1px solid #8c8c8c; */
    border-radius: 16px;
    background-color: red;
    opacity: 0.6;
  }
  /* .el-table .warning-row {
    background: #f7f0c6;
  } */
  /* .el-table .warning-row:hover {
    background: #ff9900;
  } */

  .workflow-top{
    margin: 8px 0px;
    display: flex;
    justify-content: flex-start !important;
    align-items: center;
    align-content: space-between;

  }
  .query_warp{
    width: auto;
    padding: 8px 0px;
  }
  .span-gap {
    display: inline-block;
    margin: 0px 8px 0px 8px;
    font-family: SourceHanSansSC-Regular;
    font-size: 14px;
    color: #262626;
    letter-spacing: -0.27px;
    width: auto;
    min-width: auto;
  }
  .el-select-dropdown__item.hover {
    background-color: #f5f5f5;
  }
  .el-select-dropdown__item.selected {
    color: #ff9900;
    font-weight: normal;
    background: #ffc266;
  }
  /* .el-select-dropdown__item {
    font-size: 12px;
  } */
  .container {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
  }

  .content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: #f5f5f5;
    text-align: left;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .el-menu--horizontal > .el-menu-item {
    height: 50px;
    line-height: 55px;
    margin: 0 20px;
  }

  .el-menu-item {
    font-family: SourceHanSansSC-Regular;
    font-size: 12px;
    color: #8c8c8c;
    padding: 0;
  }

  .el-menu-item:hover {
    background-color: #ffffff;
  }

  .el-menu--horizontal > .el-menu-item.is-active {
    font-family: SourceHanSansSC-Medium;
    border-bottom: 2px solid #262626;
    color: #262626;
    background: #f5f5f5;
  }

  .orderclass {
    display: flex;
    flex-direction: column;
    padding: 24px;
    box-sizing: border-box;
    background: #fff;
    flex-grow: 2;
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

  .block {
    flex-shrink: 0;
    padding: 0px 45px;
    margin: 10px 0px;
    display: flex;
    justify-content: flex-end;
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

  .cancelButton {
    height: 32px;
    line-height: 32px;
    padding: 0px 16px;
    border-radius: 4px;
    color: #262626;
    box-sizing: border-box;
  }

  .subButton:hover {
    background-color: #ffad33;
    border-color: #ffad33;
  }

  .cancelButton:hover {
    border-color: #ff9900;
    font-size: 14px;
    color: #ff9900;
    background-color: #fff;
  }

  ::v-deep .el-dialog__header {
    font-family: syht;
    font-size: 16px;
    color: #262626;
    letter-spacing: -0.2px;
    height: 40px;
    padding: 8px 0px;
    background: #fafafa 100%;
  }

  ::v-deep .el-dialog__headerbtn {
    top: 13px;
  }

  ::v-deep .el-textarea__inner {
    width: 100%;
  }
}

</style>
